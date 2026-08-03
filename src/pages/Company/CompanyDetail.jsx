import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getCompany } from '../../api/companies'
import { getJobs } from '../../api/jobs'
import JobCard from '../../components/JobCard'
import Loader from '../../components/Loader'

export default function CompanyDetail() {
  const { id } = useParams()
  const [company, setCompany] = useState(null)
  const [jobs, setJobs] = useState(null)

  useEffect(() => {
    getCompany(id).then((res) => setCompany(res.data)).catch(() => setCompany(false))
    getJobs({ company_id: id }).then((res) => setJobs(res.data)).catch(() => setJobs([]))
  }, [id])

  if (company === null) return <Loader />
  if (company === false) return <div className="mx-auto max-w-3xl px-4 py-16 text-center text-ink-800/60">រកមិនឃើញក្រុមហ៊ុននេះទេ។</div>

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:py-10">
      <div className="card flex flex-col items-center gap-4 p-5 text-center sm:flex-row sm:items-center sm:gap-5 sm:p-6 sm:text-left">
        <div className="grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-lg bg-ink-900/5 text-2xl font-semibold text-ink-900/50">
          {company.logo ? <img src={company.logo} alt={company.name} className="h-full w-full object-cover" /> : company.name?.[0]}
        </div>
        <div className="min-w-0">
          <h1 className="text-xl font-semibold text-ink-950 sm:text-2xl">{company.name}</h1>
          <p className="text-ink-800/60">{company.industry} · {company.location}</p>
          {company.website && (
            <a href={company.website} target="_blank" rel="noreferrer" className="text-sm text-teal-600 hover:underline">
              {company.website}
            </a>
          )}
        </div>
      </div>

      {company.description && (
        <p className="mt-6 whitespace-pre-line text-sm leading-relaxed text-ink-800/80">{company.description}</p>
      )}

      <h2 className="mb-4 mt-8 text-lg font-semibold text-ink-950 sm:mt-10">ការងារបើកបច្ចុប្បន្ន · Open Roles</h2>
      {jobs === null ? (
        <Loader />
      ) : jobs.length === 0 ? (
        <p className="text-sm text-ink-800/60">មិនមានការងារបើកបច្ចុប្បន្នទេ។</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {jobs.map((job) => <JobCard key={job.id} job={job} />)}
        </div>
      )}
    </div>
  )
}
