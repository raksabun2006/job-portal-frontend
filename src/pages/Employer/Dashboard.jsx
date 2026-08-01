import { useEffect, useState } from 'react'
import Loader from '../../components/Loader'
import AvatarUpload from '../../components/AvatarUpload'
import { useAuth } from '../../hooks/useAuth'
import { Link } from 'react-router-dom'
import { getCompany } from '../../api/companies'

export default function EmployerDashboard() {
  const { user } = useAuth()
  const [jobs, setJobs] = useState(null)
  const [company, setCompany] = useState(undefined)

  useEffect(() => {
    if (user?.company?.id) {
      getCompany(user.company.id).then((res) => setCompany(res.data)).catch(() => setCompany(null))
    } else {
      setCompany(null)
    }
  }, [user])

  if (company === undefined) return <Loader />

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-ink-900/8 bg-white p-6 shadow-sm sm:flex-row sm:items-center">
        <AvatarUpload fallback="E" />
        <div>
          <h1 className="text-xl font-semibold text-ink-950">ផ្ទាំងគ្រប់គ្រងនិយោជក · Employer Dashboard</h1>
          <p className="mt-1 text-xs text-ink-800/60">
            {user?.name} · {user?.email}
          </p>
        </div>
      </div>

      {!company ? (
        <div className="card mt-6 p-6 text-center">
          <p className="text-ink-800/70">អ្នកមិនទាន់មានក្រុមហ៊ុនទេ — បង្កើតឥឡូវនេះដើម្បីចាប់ផ្តើមដាក់ការងារ។</p>
          <Link to="/employer/company" className="btn-accent mt-4 inline-flex">បង្កើតក្រុមហ៊ុន</Link>
        </div>
      ) : (
        <div className="card mt-6 flex items-center justify-between p-6">
          <div>
            <p className="font-semibold text-ink-950">{company.name}</p>
            <p className="text-sm text-ink-800/60">{company.jobs_count ?? 0} ការងារកំពុងផុសផ្សាយ</p>
          </div>
          <Link to="/employer/jobs" className="btn-primary">គ្រប់គ្រងការងារ</Link>
        </div>
      )}
    </div>
  )
}
