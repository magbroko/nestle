import { motion } from 'framer-motion'
import type { RolePath } from '../../../types'

type Props = {
  id: RolePath
  label: string
  hint: string
  active: boolean
  onSelect: (id: RolePath) => void
}

export function ProfileCard({ id, label, hint, active, onSelect }: Props) {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(id)}
      whileTap={{ scale: 0.99 }}
      aria-pressed={active}
      className="group relative overflow-hidden rounded-2xl border-[0.5px] border-white/80 bg-white/40 px-4 py-4 text-left shadow-md shadow-slate-900/5 backdrop-blur-xl transition-shadow duration-300 hover:shadow-xl hover:shadow-slate-900/10"
    >
      {active && (
        <motion.div
          layoutId="profileActiveGlow"
          className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-nestle-400/65 bg-nestle-50/35 shadow-[0_0_0_1px_rgb(0_120_200/0.12),0_12px_40px_-12px_rgb(0_86_163/0.35)]"
          transition={{ type: 'spring', stiffness: 380, damping: 34 }}
        />
      )}
      <span className="relative z-10 block font-semibold text-slate-900">{label}</span>
      <span className="relative z-10 mt-1 block text-xs leading-snug text-slate-600">
        {hint}
      </span>
    </motion.button>
  )
}
