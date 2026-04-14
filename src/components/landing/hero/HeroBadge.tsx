import { motion, type Variants } from 'framer-motion'
import { Network } from 'lucide-react'

type Props = {
  variants?: Variants
}

export function HeroBadge({ variants }: Props) {
  return (
    <motion.div
      variants={variants}
      className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/55 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-600 shadow-sm backdrop-blur-md"
    >
      <Network className="h-3.5 w-3.5 shrink-0 text-nestle-600" aria-hidden />
      <span className="text-slate-700">Nestlé Waters · Industrial Intelligence</span>
    </motion.div>
  )
}
