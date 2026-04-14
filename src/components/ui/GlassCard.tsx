import { motion, type HTMLMotionProps } from 'framer-motion'

type Props = HTMLMotionProps<'div'> & {
  interactive?: boolean
}

/**
 * Luxury industrial minimalism — frosted surface, soft border, depth shadow.
 */
export function GlassCard({
  className = '',
  interactive,
  children,
  ...rest
}: Props) {
  return (
    <motion.div
      layout
      initial={false}
      whileHover={interactive ? { y: -2, transition: { duration: 0.2 } } : undefined}
      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
      className={`rounded-2xl border border-white/70 bg-white/60 shadow-[0_4px_24px_-6px_rgba(15,23,42,0.12),inset_0_1px_0_rgba(255,255,255,0.85)] backdrop-blur-xl backdrop-saturate-150 ${interactive ? 'cursor-pointer' : ''} ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
