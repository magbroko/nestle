type Props = {
  title: string
  categoryLabel: string
  minutes: number
}

export function ModuleHeroStrip({ title, categoryLabel, minutes }: Props) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-nestle-700/40 bg-gradient-to-br from-nestle-800 via-nestle-700 to-nestle-600 p-6 text-white shadow-[0_20px_50px_-24px_rgba(0,56,96,0.55)] sm:p-8">
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.12)_0%,transparent_42%,rgba(0,0,0,0.12)_100%)]"
        aria-hidden
      />
      <div className="relative flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/75">
            {categoryLabel}
          </p>
          <h2 className="mt-2 max-w-3xl text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
            {title}
          </h2>
        </div>
        <p className="shrink-0 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/95 backdrop-blur-sm">
          {minutes} min study
        </p>
      </div>
    </div>
  )
}
