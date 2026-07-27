import { Link } from 'react-router-dom'

const typeColors = {
  'full-time': 'bg-teal-500/10 text-teal-700 border-teal-500/20',
  'part-time': 'bg-amber-500/10 text-amber-700 border-amber-500/20',
  'contract': 'bg-zinc-500/10 text-zinc-700 border-zinc-500/20',
  'internship': 'bg-purple-500/10 text-purple-700 border-purple-500/20',
  'remote': 'bg-blue-500/10 text-blue-700 border-blue-500/20',
}

function formatSalary(min, max) {
  if (!min && !max) return null
  if (min && max) return `$${min.toLocaleString()} – $${max.toLocaleString()}`
  return `$${(min || max).toLocaleString()}+`
}

export default function JobCard({ job }) {
  const salary = formatSalary(job.salary_min, job.salary_max)

  return (
    <Link 
      to={`/jobs/${job.id}`} 
      className="group block rounded-xl border border-ink-900/10 bg-white p-5 transition-all duration-200 hover:border-ink-900/20 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        {/* Company Logo & Titles */}
        <div className="flex items-start gap-3.5">
          <div className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-lg border border-ink-900/5 bg-ink-900/5">
            {job.company?.logo ? (
              <img src={job.company.logo} alt={job.company.name} className="h-full w-full object-cover" />
            ) : (
              <span className="text-base font-bold text-ink-900/50">
                {job.company?.name?.[0] ?? '?'}
              </span>
            )}
          </div>
          
          <div>
            <h3 className="font-semibold text-ink-950 transition-colors group-hover:text-primary-600">
              {job.title}
            </h3>
            <p className="mt-0.5 text-sm font-medium text-ink-800/70">
              {job.company?.name}
            </p>
          </div>
        </div>

        {/* Job Type Badge */}
        {job.type && (
          <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${typeColors[job.type] ?? 'bg-ink-900/8 text-ink-800 border-ink-900/10'}`}>
            {job.type}
          </span>
        )}
      </div>

      {/* Meta Details (Location, Salary, Experience, Deadline) */}
      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-ink-800/60">
        {job.location && (
          <span>{job.location}</span>
        )}
        
        {salary && (
          <>
            <span className="text-ink-900/20">•</span>
            <span className="font-medium text-ink-900/80">{salary}</span>
          </>
        )}

        {job.experience && (
          <>
            <span className="text-ink-900/20">•</span>
            <span>{job.experience}</span>
          </>
        )}

        {job.deadline && (
          <>
            <span className="text-ink-900/20">•</span>
            <span className="text-rose-600/80 font-medium">ផុតកំណត់ {job.deadline}</span>
          </>
        )}
      </div>
    </Link>
  )
}