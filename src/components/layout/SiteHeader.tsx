import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const links = [
  { to: '/', label: 'Home' },
  { to: '/app', label: 'Intelligence Hub' },
] as const

export function SiteHeader() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="group flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-nestle-600 text-sm font-bold text-white shadow-md ring-2 ring-nestle-100">
            N
          </span>
          <div className="text-left leading-tight">
            <p className="text-sm font-semibold tracking-tight text-slate-900">
              Nestlé at a Glance
            </p>
            <p className="hidden text-xs text-slate-500 sm:block">
              Nestlé Waters · Process intelligence
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active =
              l.to === '/'
                ? pathname === '/'
                : l.to === '/app' && pathname.startsWith('/app')
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-nestle-50 text-nestle-900'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {l.label}
              </Link>
            )
          })}
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-slate-100 bg-white md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-3">
              {links.map((l) => {
                const active =
                  l.to === '/'
                    ? pathname === '/'
                    : l.to === '/app' && pathname.startsWith('/app')
                return (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={`rounded-xl px-3 py-3 text-sm font-medium ${
                      active
                        ? 'bg-nestle-50 text-nestle-800'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {l.label}
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
