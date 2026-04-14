import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { QrCode, ScanLine } from 'lucide-react'
import { SiteHeader } from '../components/layout/SiteHeader'
import { PageContainer } from '../components/layout/PageContainer'
import { modules } from '../data/processCatalog'
import { Button } from '../components/ui/Button'
import { GlassCard } from '../components/ui/GlassCard'

/**
 * Simulates scanning a QR that deep-links to `/scan?m=<moduleId>`.
 * Production would use camera API + validated tokens.
 */
export function QRScanPage() {
  const [params] = useSearchParams()
  const preset = params.get('m') ?? ''
  const navigate = useNavigate()
  const [selected, setSelected] = useState(preset)
  const [scanning, setScanning] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (preset) setSelected(preset)
  }, [preset])

  const runScan = useCallback(() => {
    if (!selected) return
    setScanning(true)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setScanning(false)
      navigate(`/app/module/${selected}`)
    }, 1600)
  }, [navigate, selected])

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [])

  return (
    <div className="min-h-svh bg-slate-50">
      <SiteHeader />
      <PageContainer>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          QR entry simulation
        </h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Select a destination module, then simulate a scan. Physical QR codes can
          encode the same deep link (for example{' '}
          <code className="rounded-md border border-slate-200 bg-white px-1.5 py-0.5 font-mono text-xs text-nestle-800">
            /scan?m=abaji-production
          </code>
          ).
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_280px]">
          <GlassCard className="relative overflow-hidden p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-nestle-600 text-white shadow-md ring-2 ring-nestle-200/80">
                <QrCode className="h-6 w-6" aria-hidden />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Decode payload (simulated)
                </p>
                <p className="text-xs text-slate-500">
                  Mobile-first — no camera permission required in this demo.
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <label
                htmlFor="qr-target"
                className="text-xs font-semibold uppercase tracking-wide text-slate-500"
              >
                Deep link target
              </label>
              <select
                id="qr-target"
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white/90 px-3 py-3 text-sm text-slate-900 shadow-sm outline-none focus:border-nestle-400 focus:ring-2 focus:ring-nestle-500/25"
              >
                <option value="">Choose module…</option>
                {modules.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.title}
                  </option>
                ))}
              </select>
            </div>

            <Button
              className="mt-6 min-h-12 w-full sm:w-auto"
              disabled={!selected || scanning}
              onClick={runScan}
            >
              {scanning ? 'Decoding…' : 'Simulate scan'}
            </Button>

            <AnimatePresence>
              {scanning && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center bg-white/75 backdrop-blur-md"
                >
                  <motion.div
                    animate={{ y: [0, 120, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.6,
                      ease: 'easeInOut',
                    }}
                  >
                    <ScanLine className="h-10 w-10 text-nestle-600" aria-hidden />
                  </motion.div>
                  <p className="mt-4 text-sm font-medium text-slate-700">
                    Reading QR payload…
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassCard>

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Example URLs
            </p>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <button
                  type="button"
                  className="text-left font-mono text-xs text-nestle-700 underline decoration-nestle-200 underline-offset-2 hover:decoration-nestle-600"
                  onClick={() => {
                    setSelected('abaji-production')
                    void navigate('/scan?m=abaji-production', { replace: true })
                  }}
                >
                  /scan?m=abaji-production
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="text-left font-mono text-xs text-nestle-700 underline decoration-nestle-200 underline-offset-2 hover:decoration-nestle-600"
                  onClick={() => {
                    setSelected('abaji-industrial-services')
                    void navigate('/scan?m=abaji-industrial-services', {
                      replace: true,
                    })
                  }}
                >
                  /scan?m=abaji-industrial-services
                </button>
              </li>
            </ul>
          </div>
        </div>
      </PageContainer>
    </div>
  )
}
