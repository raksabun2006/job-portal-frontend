import { Link } from 'react-router-dom'

export default function CompanyCard({ company }) {
  return (
    <Link 
      to={`/companies/${company.id}`} 
      className="group block rounded-xl border border-ink-900/10 bg-white p-5 transition-all duration-200 hover:border-ink-900/20 hover:shadow-md"
    >
      <div className="flex items-center gap-4">
        <div className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-xl border border-ink-900/5 bg-ink-900/5">
          {company.logo ? (
            <img src={company.logo} alt={company.name} className="h-full w-full object-cover" />
          ) : (
            <span className="text-lg font-bold text-ink-900/50">
              {company.name?.[0] ?? '?'}
            </span>
          )}
        </div>
        
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold text-ink-950 transition-colors group-hover:text-primary-600">
            {company.name}
          </h3>
          <p className="mt-0.5 truncate text-sm font-medium text-ink-800/70">
            {company.industry || 'Company'} {company.location && `· ${company.location}`}
          </p>
          
          {typeof company.jobs_count === 'number' && (
            <p className="mt-1.5 inline-flex items-center rounded-md bg-teal-500/10 px-2 py-0.5 text-xs font-semibold text-teal-700">
              {company.jobs_count} ការងារបើកបច្ចុប្បន្ន
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}