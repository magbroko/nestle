import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { TimelineStage } from '../../types'
import { useRole } from '../../context/RoleContext'
import { ChevronDown, GitBranch, Layers } from 'lucide-react'
import { GlassCard } from '../ui/GlassCard'

type Props = {
  stages: TimelineStage[]
}

/**
 * Interactive factory map: vertical timeline on small screens, horizontal
 * scroll-snap cards on large screens. Expands for explanations + micro-flow.
 */
export function ProcessTimeline({ stages }: Props) {
  const { role } = useRole()
  const showTechnical = role === 'technician' || role === 'engineer'
  const [openId, setOpenId] = useState<string | null>(stages[0]?.id ?? null)

  return (
    <section aria-labelledby="process-map-heading" className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-nestle-600">
            Interactive map
          </p>
          <h2
            id="process-map-heading"
            className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl"
          >
            Factory stages
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-slate-600">
            {role === 'beginner' && (
              <>
                <span className="font-medium text-slate-800">Beginner path:</span>{' '}
                what each stage is for, in plain language.
              </>
            )}
            {showTechnical && (
              <>
                <span className="font-medium text-slate-800">
                  Technician / Engineer path:
                </span>{' '}
                adds mechanical context and operational risk prompts.
              </>
            )}
          </p>
        </div>
      </div>

      {/* Mobile / tablet: vertical timeline */}
      <div className="lg:hidden">
        <ol className="relative space-y-3 border-l-2 border-nestle-100 pl-6">
          {stages.map((stage, index) => {
            const open = openId === stage.id
            return (
              <li key={stage.id} className="relative">
                <span
                  className="absolute -left-[1.36rem] top-4 flex h-3.5 w-3.5 -translate-x-px rounded-full border-2 border-white bg-nestle-600 shadow ring-2 ring-nestle-100"
                  aria-hidden
                />
                <GlassCard className="overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenId(open ? null : stage.id)}
                    aria-expanded={open}
                    className="flex w-full touch-manipulation items-start justify-between gap-3 p-4 text-left"
                  >
                    <span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Stage {index + 1} · {stage.shortLabel}
                      </span>
                      <span className="mt-1 block font-semibold tracking-tight text-slate-900">
                        {stage.title}
                      </span>
                    </span>
                    <ChevronDown
                      className={`mt-1 h-5 w-5 shrink-0 text-slate-400 transition-transform ${
                        open ? 'rotate-180' : ''
                      }`}
                      aria-hidden
                    />
                  </button>
                  <StageBody
                    stage={stage}
                    open={open}
                    showTechnical={showTechnical}
                  />
                </GlassCard>
              </li>
            )
          })}
        </ol>
      </div>

      {/* Desktop: horizontal scannable cards */}
      <div className="hidden lg:block">
        <div className="flex gap-4 overflow-x-auto pb-3 pt-1 [scrollbar-width:thin]">
          {stages.map((stage, index) => {
            const open = openId === stage.id
            return (
              <motion.div
                key={stage.id}
                layout
                className="w-[min(100%,280px)] shrink-0 snap-start"
              >
                <GlassCard
                  interactive={!open}
                  className={`flex h-full flex-col overflow-hidden ${open ? 'ring-2 ring-nestle-200' : ''}`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenId(open ? null : stage.id)}
                    aria-expanded={open}
                    className="flex w-full flex-1 touch-manipulation flex-col p-4 text-left"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {index + 1} · {stage.shortLabel}
                    </span>
                    <span className="mt-2 font-semibold leading-snug tracking-tight text-slate-900">
                      {stage.title}
                    </span>
                    <span className="mt-3 text-xs text-nestle-700">
                      {open ? 'Click to collapse' : 'Click to expand details'}
                    </span>
                  </button>
                  <StageBody stage={stage} open={open} showTechnical={showTechnical} />
                </GlassCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function StageBody({
  stage,
  open,
  showTechnical,
}: {
  stage: TimelineStage
  open: boolean
  showTechnical: boolean
}) {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden border-t border-slate-200/60 bg-slate-50/40"
        >
          <div className="space-y-4 p-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {showTechnical ? 'Operational summary' : 'What is this?'}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-slate-700">
                {stage.whatIsThis}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200/80 bg-white/80 p-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-nestle-700">
                <GitBranch className="h-3.5 w-3.5" aria-hidden />
                Process flow (simplified)
              </div>
              <ol className="mt-2 list-decimal space-y-1.5 pl-4 text-sm text-slate-700">
                {stage.diagramSteps.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ol>
            </div>

            {showTechnical && stage.mechanicalSpecs && (
              <div className="rounded-xl border border-slate-200/80 bg-white/90 p-3">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-600">
                  <Layers className="h-3.5 w-3.5" aria-hidden />
                  Mechanical &amp; control context
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  {stage.mechanicalSpecs}
                </p>
              </div>
            )}

            {showTechnical &&
              stage.operationalRisks &&
              stage.operationalRisks.length > 0 && (
                <div className="rounded-xl border border-emerald-200/80 bg-emerald-50/50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-emerald-900">
                    What can go wrong (this stage)
                  </p>
                  <ul className="mt-2 space-y-1.5 text-sm text-emerald-950/90">
                    {stage.operationalRisks.map((r) => (
                      <li key={r} className="flex gap-2">
                        <span
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-emerald-500"
                          aria-hidden
                        />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
