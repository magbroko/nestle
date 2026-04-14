import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { SiteHeader } from '../components/layout/SiteHeader'
import { PageContainer } from '../components/layout/PageContainer'
import { getModuleById } from '../data/processCatalog'
import { CATEGORY_LABELS } from '../types'
import { ProcessTimeline } from '../components/Process/ProcessTimeline'
import { SafetyInsightsPanel } from '../components/Process/SafetyInsightsPanel'
import { AssessmentPanel } from '../components/ui/AssessmentPanel'
import { ModuleHeroStrip } from '../components/ui/ModuleHeroStrip'

export function ModulePage() {
  const { moduleId } = useParams()
  const mod = moduleId ? getModuleById(moduleId) : undefined

  if (!mod) {
    return <Navigate to="/app" replace />
  }

  return (
    <div className="min-h-svh bg-slate-50">
      <SiteHeader />
      <PageContainer>
        <Link
          to="/app"
          className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-nestle-700"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Dashboard
        </Link>

        <h1 className="sr-only">{mod.title}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
          {mod.subtitle}
        </p>

        <div className="mt-8 space-y-10">
          <ModuleHeroStrip
            title={mod.title}
            categoryLabel={CATEGORY_LABELS[mod.category]}
            minutes={mod.estimatedMinutes}
          />
          <ProcessTimeline stages={mod.timeline} />
          <div className="grid gap-8 lg:grid-cols-1">
            <SafetyInsightsPanel items={mod.safetyInsights} />
          </div>
          <AssessmentPanel questions={mod.quiz} />
        </div>
      </PageContainer>
    </div>
  )
}
