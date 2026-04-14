import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '../../ui/Button'

export function MagneticHubButton() {
  const bounds = useRef<HTMLDivElement>(null)
  const [pull, setPull] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const el = bounds.current
    if (!el) return
    const strength = 0.24
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      setPull({
        x: (e.clientX - cx) * strength,
        y: (e.clientY - cy) * strength,
      })
    }
    const reset = () => setPull({ x: 0, y: 0 })
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', reset)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', reset)
    }
  }, [])

  return (
    <motion.div ref={bounds} className="w-full sm:w-auto">
      <motion.div
        animate={{ x: pull.x, y: pull.y }}
        transition={{ type: 'spring', stiffness: 220, damping: 24, mass: 0.4 }}
      >
        <Link to="/app" className="block w-full sm:w-auto">
          <Button className="min-h-12 w-full px-8 text-base sm:w-auto">
            Enter Factory Intelligence Hub
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  )
}
