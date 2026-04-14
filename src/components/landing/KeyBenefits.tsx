import { motion } from 'framer-motion'
import { Gauge, Layers, ShieldCheck } from 'lucide-react'

const benefits = [
  {
    title: 'Visual process literacy',
    body: 'Clickable flow diagrams connect upstream and downstream effects in seconds.',
    icon: Layers,
  },
  {
    title: 'Safety-first insights',
    body: 'Each module surfaces “what can go wrong” so risks are discussed, not discovered late.',
    icon: ShieldCheck,
  },
  {
    title: 'Performance that feels instant',
    body: 'Lightweight UI with smooth motion — optimized for phones on the go.',
    icon: Gauge,
  },
]

export function KeyBenefits() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-nestle-600">
            Key benefits
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Clarity without clutter
          </h2>
        </motion.div>

        <ul className="mt-10 grid gap-6 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <motion.li
              key={b.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50/60 p-5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-nestle-600 shadow-sm ring-1 ring-slate-100">
                <b.icon className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <h3 className="text-base font-semibold tracking-tight text-slate-900">
                  {b.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  {b.body}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
