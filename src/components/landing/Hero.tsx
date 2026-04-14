import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, QrCode, Sparkles } from 'lucide-react'
import { Button } from '../ui/Button'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-50">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_100%_-10%,rgba(0,86,163,0.14),transparent),radial-gradient(ellipse_70%_50%_at_0%_100%,rgba(15,23,42,0.06),transparent)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-12 sm:px-6 sm:pb-28 sm:pt-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white/80 px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm backdrop-blur-sm"
        >
          <Sparkles className="h-3.5 w-3.5 text-nestle-600" aria-hidden />
          Nestlé Waters · Industrial Intelligence
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.35rem]"
        >
          Understand the Factory Before You Step Inside
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl"
        >
          Bridge induction and the physical plant with Abaji-aligned production,
          industrial services, and safety systems — optimized for QR-led entry on
          mobile.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.18 }}
          className="mt-12 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
        >
          <Link to="/app" className="w-full sm:w-auto">
            <Button className="min-h-12 w-full px-8 text-base sm:w-auto">
              Start learning
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          </Link>
          <Link to="/scan" className="w-full sm:w-auto">
            <Button
              variant="secondary"
              className="min-h-12 w-full gap-2 px-8 text-base sm:w-auto"
            >
              <QrCode className="h-4 w-4" aria-hidden />
              Scan QR (simulated)
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
