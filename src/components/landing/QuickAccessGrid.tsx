import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Factory, Settings2, ShieldAlert, ChevronRight } from 'lucide-react'
import { GlassCard } from '../ui/GlassCard'
import type { ModuleCategory } from '../../types'
import { CATEGORY_LABELS } from '../../types'
import { modules } from '../../data/processCatalog'

const pillarOrder: ModuleCategory[] = [
  'production',
  'industrial-services',
  'safety',
]

const icons: Record<ModuleCategory, typeof Factory> = {
  production: Factory,
  'industrial-services': Settings2,
  safety: ShieldAlert,
}

export function QuickAccessGrid() {
  return (
    <section
      id="quick-access"
      className="border-t border-slate-200/80 bg-white py-14 sm:py-16"
      aria-labelledby="quick-access-title"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.35 }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-nestle-600">
            Quick access
          </p>
          <h2
            id="quick-access-title"
            className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
          >
            Three operational pillars
          </h2>
          <p className="mt-2 max-w-2xl text-slate-600">
            Jump straight into production, industrial services, or safety systems
            modules — aligned to the Abaji factory narrative.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {pillarOrder.map((cat, i) => {
            const mod = modules.find((m) => m.category === cat)
            if (!mod) return null
            const Icon = icons[cat]
            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
              >
                <Link to={`/app/module/${mod.id}`} className="block h-full">
                  <GlassCard
                    interactive
                    className="group flex h-full flex-col p-6 sm:p-7"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-nestle-600 text-white shadow-md ring-2 ring-nestle-100">
                      <Icon className="h-6 w-6" aria-hidden />
                    </span>
                    <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-nestle-700">
                      {CATEGORY_LABELS[cat]}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold tracking-tight text-slate-900">
                      {mod.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                      {mod.subtitle}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-nestle-700">
                      Open pillar
                      <ChevronRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </span>
                  </GlassCard>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
