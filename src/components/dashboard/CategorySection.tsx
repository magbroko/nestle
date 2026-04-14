import { Factory, Settings2, ShieldAlert } from 'lucide-react'
import type { LearningModule, ModuleCategory } from '../../types'
import { CATEGORY_LABELS } from '../../types'
import { ModuleNavCard } from './ModuleNavCard'

const icons: Record<ModuleCategory, typeof Factory> = {
  production: Factory,
  'industrial-services': Settings2,
  safety: ShieldAlert,
}

type Props = {
  category: ModuleCategory
  modules: LearningModule[]
}

export function CategorySection({ category, modules }: Props) {
  const Icon = icons[category]
  if (modules.length === 0) return null

  return (
    <section className="mt-12">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">
            {CATEGORY_LABELS[category]}
          </h2>
          <p className="text-sm text-slate-500">
            {category === 'production' && 'Line sequences from intake to dispatch.'}
            {category === 'industrial-services' &&
              'Services that keep production stable and efficient.'}
            {category === 'safety' && 'Guarding, stops, and permissive fundamentals.'}
          </p>
        </div>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((m) => (
          <ModuleNavCard key={m.id} module={m} />
        ))}
      </div>
    </section>
  )
}
