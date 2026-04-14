import { Link } from 'react-router-dom'

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <p className="text-sm font-semibold tracking-tight text-slate-900">
            Nestlé at a Glance
          </p>
          <p className="mt-1 max-w-md text-sm text-slate-500">
            Industrial intelligence for Nestlé Waters operations. Editorial
            content for training — validate against your site&apos;s master data
            and SOPs.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
          <Link to="/app" className="font-medium hover:text-nestle-700">
            Intelligence hub
          </Link>
          <Link to="/#quick-access" className="font-medium hover:text-nestle-700">
            Quick access
          </Link>
        </div>
      </div>
    </footer>
  )
}
