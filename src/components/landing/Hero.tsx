import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion, type Variants } from 'framer-motion'
import { Check, UserCircle2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useRole } from '../../context/RoleContext'
import type { RolePath } from '../../types'
import { searchNavHits } from '../../data/searchNav'
import { HeroBackground } from './hero/HeroBackground'
import { HeroBadge } from './hero/HeroBadge'
import { MagneticHubButton } from './hero/MagneticHubButton'
import { ProfileCard } from './hero/ProfileCard'
import { SearchBar } from './hero/SearchBar'

const profiles: {
  id: RolePath
  label: string
  hint: string
}[] = [
  {
    id: 'beginner',
    label: 'New Hire',
    hint: 'Definitions-first, lighter technical density',
  },
  {
    id: 'engineer',
    label: 'Engineer',
    hint: 'Systems, controls, and failure-mode depth',
  },
  {
    id: 'technician',
    label: 'Manager',
    hint: 'Operational overview with stage risks & specs',
  },
]

const PROFILE_FEEDBACK: Record<RolePath, string> = {
  beginner:
    'Optimizing for definitions-first learning — lighter technical density.',
  engineer: 'Optimizing for failure-mode depth and control systems…',
  technician: 'Optimizing for operational overview, stage risks, and specs…',
}

const revealContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05,
    },
  },
}

const revealItem: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 380,
      damping: 28,
    },
  },
}

export function Hero() {
  const navigate = useNavigate()
  const { role, setRole } = useRole()
  const [query, setQuery] = useState('')
  const [openHits, setOpenHits] = useState(false)
  const [profileToast, setProfileToast] = useState(false)
  const searchWrapRef = useRef<HTMLDivElement>(null)
  const profileToastTimer = useRef<number>(0)
  const listId = useId()

  const hits = query.trim() ? searchNavHits(query, 10) : []

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!searchWrapRef.current?.contains(e.target as Node)) setOpenHits(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  useEffect(() => {
    return () => window.clearTimeout(profileToastTimer.current)
  }, [])

  const handleProfileSelect = useCallback(
    (id: RolePath) => {
      setRole(id)
      setProfileToast(true)
      window.clearTimeout(profileToastTimer.current)
      profileToastTimer.current = window.setTimeout(() => {
        setProfileToast(false)
      }, 2600)
    },
    [setRole],
  )

  const goHit = useCallback(
    (href: string) => {
      setOpenHits(false)
      setQuery('')
      navigate(href)
    },
    [navigate],
  )

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const first = searchNavHits(query, 1)[0]
    if (first) goHit(first.href)
  }

  return (
    <section className="relative overflow-hidden">
      <HeroBackground />

      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 sm:pb-24 sm:pt-20 lg:px-8">
        <motion.div
          variants={revealContainer}
          initial="hidden"
          animate="show"
          className="relative"
        >
          <HeroBadge variants={revealItem} />

          <motion.h1
            variants={revealItem}
            className="mt-6 max-w-3xl text-4xl leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.35rem]"
          >
            <span className="font-extrabold">Understand</span>{' '}
            <span className="font-semibold">the Factory Before You Step Inside</span>
          </motion.h1>

          <motion.p
            variants={revealItem}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl"
          >
            Bridge induction and the physical plant with Abaji-aligned production,
            industrial services, and safety systems — personalized by your profile.
          </motion.p>

          <motion.div variants={revealItem} className="mt-10">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-nestle-700">
              <UserCircle2 className="h-4 w-4" aria-hidden />
              Select your profile
            </div>
            <p className="mt-1 text-sm text-slate-600">
              We tune module density immediately — you can change this anytime in the
              hub.
            </p>

            <LayoutGroup id="hero-profiles">
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {profiles.map((p) => (
                  <ProfileCard
                    key={p.id}
                    id={p.id}
                    label={p.label}
                    hint={p.hint}
                    active={role === p.id}
                    onSelect={handleProfileSelect}
                  />
                ))}
              </div>
            </LayoutGroup>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
              <AnimatePresence mode="wait">
                <motion.p
                  key={role}
                  role="status"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="text-sm font-medium text-nestle-700"
                >
                  {PROFILE_FEEDBACK[role]}
                </motion.p>
              </AnimatePresence>

              <AnimatePresence>
                {profileToast && (
                  <motion.div
                    role="status"
                    aria-live="polite"
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 420, damping: 28 }}
                    className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-white/80 bg-white/85 py-2 pl-3 pr-4 text-xs font-semibold text-slate-700 shadow-lg shadow-slate-900/10 backdrop-blur-md"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-nestle-600 text-white">
                      <Check className="h-4 w-4" strokeWidth={2.5} aria-hidden />
                    </span>
                    Profile configured
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div
            ref={searchWrapRef}
            variants={revealItem}
            className="relative mt-10 max-w-2xl"
          >
            <SearchBar
              query={query}
              onQueryChange={setQuery}
              hits={hits}
              openHits={openHits}
              onOpenHitsChange={setOpenHits}
              listId={listId}
              onSubmit={onSearchSubmit}
              onSelectHit={goHit}
            />
          </motion.div>

          <motion.div
            variants={revealItem}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
          >
            <MagneticHubButton />
            <a
              href="#quick-access"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-white/80 bg-white/55 px-8 text-base font-semibold text-slate-800 shadow-md shadow-slate-900/5 backdrop-blur-md transition hover:border-nestle-200 hover:bg-white/75 hover:text-nestle-800 sm:w-auto"
            >
              Explore process modules
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
