import { Link } from 'react-router-dom'
import { ChevronRight, Clock } from 'lucide-react'
import type { LearningModule } from '../../types'
import { CATEGORY_LABELS } from '../../types'
import { GlassCard } from '../ui/GlassCard'

type Props = {
  module: LearningModule
  featured?: boolean
}

export function ModuleNavCard({ module, featured }: Props) {
  return (
    <Link to={`/app/module/${module.id}`} className="block h-full">
      <GlassCard
        interactive
        className={`flex h-full flex-col p-5 ${featured ? 'ring-2 ring-nestle-200/90' : ''}`}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-nestle-600">
              {CATEGORY_LABELS[module.category]}
            </p>
            <h3 className="mt-1 text-lg font-semibold tracking-tight text-slate-900">
              {module.title}
            </h3>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-slate-200/80 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-600">
            <Clock className="h-3.5 w-3.5" aria-hidden />
            {module.estimatedMinutes} min
          </span>
        </div>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
          {module.subtitle}
        </p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-nestle-700">
          Open module
          <ChevronRight className="h-4 w-4" aria-hidden />
        </span>
      </GlassCard>
    </Link>
  )
}
