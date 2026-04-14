import { forwardRef } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'

type Variant = 'primary' | 'secondary' | 'ghost'

const variants: Record<Variant, string> = {
  primary:
    'bg-nestle-600 text-white shadow-sm hover:bg-nestle-700 focus-visible:ring-nestle-500',
  secondary:
    'border border-slate-200/90 bg-white/90 text-slate-800 shadow-sm hover:bg-white focus-visible:ring-slate-300',
  ghost:
    'text-slate-700 hover:bg-slate-100/90 focus-visible:ring-slate-300',
}

type Props = HTMLMotionProps<'button'> & {
  variant?: Variant
}

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { className = '', variant = 'primary', type = 'button', ...props },
  ref,
) {
  return (
    <motion.button
      ref={ref}
      type={type}
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 520, damping: 28 }}
      className={`inline-flex min-h-11 touch-manipulation items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    />
  )
})
