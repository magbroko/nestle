import { Search } from 'lucide-react'

type Props = {
  value: string
  onChange: (v: string) => void
}

export function ModuleSearch({ value, onChange }: Props) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search modules, keywords, or systems…"
        className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-nestle-400 focus:ring-2 focus:ring-nestle-500/25"
        type="search"
        autoComplete="off"
        aria-label="Search modules"
      />
    </div>
  )
}
