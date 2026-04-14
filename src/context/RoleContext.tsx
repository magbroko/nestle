import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { LearningModule, RolePath } from '../types'
import { modules } from '../data/processCatalog'

const STORAGE_KEY = 'nai-learning-role'

type RoleContextValue = {
  role: RolePath
  setRole: (r: RolePath) => void
  orderedForRole: LearningModule[]
}

const RoleContext = createContext<RoleContextValue | null>(null)

function loadInitialRole(): RolePath {
  try {
    const v = localStorage.getItem(STORAGE_KEY) as RolePath | null
    if (v === 'beginner' || v === 'technician' || v === 'engineer') return v
  } catch {
    /* ignore */
  }
  return 'beginner'
}

function orderModulesForRole(role: RolePath): LearningModule[] {
  const copy = [...modules]
  const score = (m: LearningModule) => {
    const emphasis = m.emphasisRoles.includes(role) ? 2 : 0
    const minutes = m.estimatedMinutes
    if (role === 'beginner') return emphasis * 100 - minutes
    if (role === 'technician') return emphasis * 80 + minutes * 0.5
    return emphasis * 60 + minutes
  }
  copy.sort((a, b) => score(b) - score(a))
  return copy
}

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<RolePath>(loadInitialRole)

  const setRole = useCallback((r: RolePath) => {
    setRoleState(r)
    try {
      localStorage.setItem(STORAGE_KEY, r)
    } catch {
      /* ignore */
    }
  }, [])

  const orderedForRole = useMemo(() => orderModulesForRole(role), [role])

  const value = useMemo(
    () => ({ role, setRole, orderedForRole }),
    [role, setRole, orderedForRole],
  )

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>
}

export function useRole() {
  const ctx = useContext(RoleContext)
  if (!ctx) throw new Error('useRole must be used within RoleProvider')
  return ctx
}
