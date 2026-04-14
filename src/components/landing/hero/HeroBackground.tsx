import { motion } from 'framer-motion'

export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Base wash */}
      <div className="absolute inset-0 bg-slate-50" />

      {/* Animated mesh blobs — slate + blue */}
      <motion.div
        className="absolute -left-[20%] -top-[30%] h-[85%] w-[70%] rounded-full bg-blue-50/90 blur-3xl"
        animate={{
          x: [0, 24, 0],
          y: [0, 18, 0],
          scale: [1, 1.06, 1],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-[15%] top-[10%] h-[70%] w-[65%] rounded-full bg-slate-100/80 blur-3xl"
        animate={{
          x: [0, -20, 0],
          y: [0, 28, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div
        className="absolute bottom-[-25%] left-[15%] h-[55%] w-[55%] rounded-full bg-blue-100/50 blur-3xl"
        animate={{
          opacity: [0.45, 0.7, 0.45],
          scale: [1, 1.08, 1],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />

      {/* Tech grid */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(15 23 42 / 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(15 23 42 / 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/40 via-transparent to-slate-50/80" />
    </div>
  )
}
