import { AnimatePresence, motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

function isAppleUserAgent() {
  if (typeof navigator === 'undefined') return false
  return /Mac|iPhone|iPad|iPod/.test(navigator.userAgent)
}

type Hit = {
  id: string
  title: string
  subtitle: string
  categoryLabel: string
  href: string
}

type Props = {
  query: string
  onQueryChange: (value: string) => void
  hits: Hit[]
  openHits: boolean
  onOpenHitsChange: (open: boolean) => void
  listId: string
  onSubmit: (e: React.FormEvent) => void
  onSelectHit: (href: string) => void
}

export function SearchBar({
  query,
  onQueryChange,
  hits,
  openHits,
  onOpenHitsChange,
  listId,
  onSubmit,
  onSelectHit,
}: Props) {
  const inputId = 'hero-search'
  const inputRef = useRef<HTMLInputElement>(null)
  const isMac = isAppleUserAgent()
  const [focused, setFocused] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const shortcutLabel = isMac ? '⌘K' : 'Ctrl+K'

  return (
    <motion.div
      animate={{
        scale: focused ? 1.02 : 1,
      }}
      transition={{ type: 'spring', stiffness: 420, damping: 28 }}
      className="origin-top"
    >
      <form onSubmit={onSubmit} className="relative">
        <label htmlFor={inputId} className="sr-only">
          Search processes and stages
        </label>
        <Search
          className="pointer-events-none absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-slate-400"
          aria-hidden
        />
        <input
          ref={inputRef}
          id={inputId}
          type="search"
          value={query}
          onChange={(e) => {
            onQueryChange(e.target.value)
            onOpenHitsChange(true)
          }}
          onFocus={() => {
            setFocused(true)
            onOpenHitsChange(true)
          }}
          onBlur={() => setFocused(false)}
          placeholder='Try "Chiller", "Palletizing", or "Deep Well"'
          autoComplete="off"
          className="h-14 w-full rounded-2xl border border-white/80 bg-white/70 py-3 pl-12 pr-24 text-base text-slate-900 shadow-lg shadow-slate-900/5 outline-none ring-0 backdrop-blur-xl transition placeholder:text-slate-400 focus:border-nestle-300 focus:ring-2 focus:ring-nestle-500/20"
        />
        <kbd
          className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 select-none items-center gap-0.5 rounded-md border border-slate-200/90 bg-white/90 px-2 py-1 font-mono text-[0.65rem] font-medium text-slate-500 shadow-sm sm:inline-flex"
          aria-hidden
        >
          {shortcutLabel}
        </kbd>
        <AnimatePresence>
          {openHits && hits.length > 0 && (
            <motion.ul
              id={listId}
              role="listbox"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-20 overflow-hidden rounded-2xl border border-white/80 bg-white/90 py-2 shadow-xl shadow-slate-900/10 backdrop-blur-xl"
            >
              {hits.map((h) => (
                <li key={h.id} role="presentation">
                  <button
                    type="button"
                    role="option"
                    className="flex w-full flex-col gap-0.5 px-4 py-3 text-left text-sm hover:bg-nestle-50/80"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => onSelectHit(h.href)}
                  >
                    <span className="font-medium text-slate-900">{h.title}</span>
                    <span className="text-xs text-slate-500">
                      {h.subtitle} · {h.categoryLabel}
                    </span>
                  </button>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </form>
    </motion.div>
  )
}
