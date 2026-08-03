import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getMyApplications } from '../../api/applications'
import StatusBadge from '../../components/StatusBadge'
import Loader from '../../components/Loader'
import EmptyState from '../../components/EmptyState'

export default function AppliedJobs() {
  const [applications, setApplications] = useState(null)

  useEffect(() => {
    getMyApplications().then((res) => setApplications(res.data)).catch(() => setApplications([]))
  }, [])

  if (applications === null) return <Loader />

  return (
    <div>
      <h1 className="text-xl font-semibold text-ink-950">ពាក្យសុំការងារ · Applied Jobs</h1>
      {applications.length === 0 ? (
        <EmptyState title="មិនទាន់មានពាក្យសុំណាមួយទេ" description="ចាប់ផ្តើមស្វែងរកការងារ ហើយដាក់ពាក្យសុំ។" />
      ) : (
        <div className="card mt-6 divide-y divide-ink-900/8">
          {applications.map((a) => (
            <Link key={a.id} to={`/jobs/${a.job?.id}`} className="flex flex-col gap-2 p-4 hover:bg-ink-900/[0.02] sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="font-medium text-ink-950">{a.job?.title}</p>
                <p className="text-sm text-ink-800/60">{a.job?.company?.name} · បានដាក់ពាក្យ {new Date(a.created_at).toLocaleDateString()}</p>
              </div>
              <StatusBadge status={a.status} />
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
