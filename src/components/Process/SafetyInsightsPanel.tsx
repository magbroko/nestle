import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'

type Props = {
  items: string[]
}

/** Safety awareness block — emerald accent = validation / readiness to proceed. */
export function SafetyInsightsPanel({ items }: Props) {
  return (
    <aside
      className="rounded-2xl border border-emerald-200/90 bg-emerald-50/40 p-4 shadow-sm backdrop-blur-sm sm:p-5"
      aria-labelledby="safety-insights-title"
    >
      <div className="flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-sm ring-2 ring-emerald-200/80">
          <ShieldCheck className="h-6 w-6" aria-hidden />
        </span>
        <div>
          <h2
            id="safety-insights-title"
            className="text-base font-semibold tracking-tight text-emerald-950"
          >
            Safety insights
          </h2>
          <p className="mt-1 text-sm text-emerald-900/85">
            Reinforce hazard awareness before physical exposure. Align with your
            site&apos;s permits, LOTO, and emergency plans — this is orientation,
            not a replacement for local SOPs.
          </p>
        </div>
      </div>
      <ul className="mt-4 space-y-2.5 border-t border-emerald-200/60 pt-4">
        {items.map((h, i) => (
          <motion.li
            key={h}
            initial={{ opacity: 0, x: -4 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className="flex gap-3 text-sm leading-relaxed text-emerald-950"
          >
            <span
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500"
              aria-hidden
            />
            <span>{h}</span>
          </motion.li>
        ))}
      </ul>
    </aside>
  )
}
