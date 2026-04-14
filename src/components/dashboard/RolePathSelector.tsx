import { motion } from 'framer-motion'
import type { RolePath } from '../../types'
import { useRole } from '../../context/RoleContext'

const roles: { id: RolePath; label: string; hint: string }[] = [
  {
    id: 'beginner',
    label: 'Beginner',
    hint: '“What is this?” — definitions first',
  },
  {
    id: 'technician',
    label: 'Technician',
    hint: 'Mechanical context & stage risks',
  },
  {
    id: 'engineer',
    label: 'Engineer',
    hint: 'Systems, controls, failure modes',
  },
]

export function RolePathSelector() {
  const { role, setRole } = useRole()

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white/90 p-4 shadow-sm backdrop-blur-sm sm:p-5">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900">
            Learning path
          </p>
          <p className="text-xs text-slate-500">
            Sequences modules to match your current responsibility.
          </p>
        </div>
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {roles.map((r) => {
          const active = role === r.id
          return (
            <motion.button
              key={r.id}
              type="button"
              onClick={() => setRole(r.id)}
              whileTap={{ scale: 0.99 }}
              className={`rounded-xl border px-3 py-3 text-left text-sm transition-colors ${
                active
                  ? 'border-nestle-200 bg-nestle-50 text-nestle-900'
                  : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
              }`}
            >
              <span className="font-semibold">{r.label}</span>
              <span className="mt-0.5 block text-xs opacity-80">{r.hint}</span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
