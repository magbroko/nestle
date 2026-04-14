import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Sparkles } from 'lucide-react'
import { SiteHeader } from '../components/layout/SiteHeader'
import { PageContainer } from '../components/layout/PageContainer'
import { RolePathSelector } from '../components/dashboard/RolePathSelector'
import { ModuleSearch } from '../components/dashboard/ModuleSearch'
import { CategorySection } from '../components/dashboard/CategorySection'
import { ModuleNavCard } from '../components/dashboard/ModuleNavCard'
import { searchModules } from '../data/processCatalog'
import { useRole } from '../context/RoleContext'
import type { ModuleCategory } from '../types'

export function DashboardPage() {
  const [q, setQ] = useState('')
  const { orderedForRole } = useRole()

  const filtered = useMemo(() => searchModules(q), [q])

  const byCategory = useMemo(() => {
    const map: Record<ModuleCategory, typeof filtered> = {
      production: [],
      'industrial-services': [],
      safety: [],
    }
    for (const m of filtered) {
      map[m.category].push(m)
    }
    return map
  }, [filtered])

  const topPath = orderedForRole.filter((m) => filtered.includes(m)).slice(0, 2)

  return (
    <div className="min-h-svh bg-slate-50">
      <SiteHeader />
      <PageContainer>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-nestle-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to overview
            </Link>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
              Learning dashboard
            </h1>
            <p className="mt-2 max-w-2xl text-slate-600">
              Browse by system area or follow your role-based sequence. Search
              works across titles and keywords.
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-6">
          <RolePathSelector />
          <ModuleSearch value={q} onChange={setQ} />
        </div>

        {topPath.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 rounded-2xl border border-nestle-100 bg-gradient-to-br from-nestle-50/90 to-white p-5 shadow-sm"
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-nestle-800">
              <Sparkles className="h-4 w-4" />
              Suggested for your path
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {topPath.map((m) => (
                <ModuleNavCard key={m.id} module={m} featured />
              ))}
            </div>
          </motion.section>
        )}

        <CategorySection category="production" modules={byCategory.production} />
        <CategorySection
          category="industrial-services"
          modules={byCategory['industrial-services']}
        />
        <CategorySection category="safety" modules={byCategory.safety} />

        {filtered.length === 0 && (
          <p className="mt-12 text-center text-sm text-slate-500">
            No modules match that search. Try &quot;abaji&quot;, &quot;chiller&quot;,
            &quot;ahu&quot;, or &quot;safety&quot;.
          </p>
        )}
      </PageContainer>
    </div>
  )
}
