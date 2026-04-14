import { motion } from 'framer-motion'
import { BookOpenCheck, Brain, UserCircle2 } from 'lucide-react'

const steps = [
  {
    title: 'Select profile',
    body: 'Choose New Hire, Engineer, or Manager to set information density before you enter the hub.',
    icon: UserCircle2,
  },
  {
    title: 'Learn',
    body: 'Follow expandable factory stages, simplified flows, and safety context tailored to your path.',
    icon: BookOpenCheck,
  },
  {
    title: 'Understand',
    body: 'Validate retention with assessments and structured navigation across production pillars.',
    icon: Brain,
  },
]

export function HowItWorks() {
  return (
    <section className="border-t border-slate-200 bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4 }}
          className="max-w-2xl"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-nestle-600">
            How it works
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Profile → Learn → Understand
          </h2>
          <p className="mt-3 text-slate-600">
            A disciplined flow for high-retention learning — from the perimeter
            office to the line briefing room.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="relative"
            >
              {i < steps.length - 1 && (
                <div className="absolute left-1/2 top-10 hidden h-px w-[calc(100%+2rem)] -translate-y-1/2 bg-gradient-to-r from-nestle-200 via-nestle-200 to-transparent md:block" />
              )}
              <div className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-nestle-600 text-sm font-bold text-white shadow-md ring-2 ring-nestle-100">
                    {i + 1}
                  </span>
                  <s.icon className="h-6 w-6 text-nestle-600" aria-hidden />
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-slate-900">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {s.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
