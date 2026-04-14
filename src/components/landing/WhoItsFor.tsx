import { motion } from 'framer-motion'
import { GraduationCap, HardHat, Wrench } from 'lucide-react'
import { GlassCard } from '../ui/GlassCard'

const items = [
  {
    title: 'Trainees & new hires',
    body: 'Build mental models of line sequences, hazards, and terminology before first shift.',
    icon: GraduationCap,
  },
  {
    title: 'Technicians & operators',
    body: 'Refresh on interdependencies between utilities, fillers, and packaging cells.',
    icon: Wrench,
  },
  {
    title: 'Engineers & specialists',
    body: 'Align on failure modes, permissive logic, and system-level KPI impacts.',
    icon: HardHat,
  },
]

export function WhoItsFor() {
  return (
    <section className="border-t border-slate-200/80 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-nestle-600">
            Who it&apos;s for
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            One platform, multiple learning intents
          </h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            Whether you are onboarding or deepening expertise, modules adapt to
            your role path with prioritized sequencing.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <GlassCard className="h-full p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-nestle-50 text-nestle-700 ring-1 ring-nestle-100">
                  <item.icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mt-4 text-lg font-semibold tracking-tight text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.body}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
