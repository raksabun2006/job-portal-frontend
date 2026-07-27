import { useEffect, useState } from 'react'
import { getSavedJobs } from '../../api/jobs'
import JobCard from '../../components/JobCard'
import Loader from '../../components/Loader'
import EmptyState from '../../components/EmptyState'

export default function SavedJobs() {
  const [jobs, setJobs] = useState(null)

  useEffect(() => {
    getSavedJobs().then((res) => setJobs(res.data)).catch(() => setJobs([]))
  }, [])

  if (jobs === null) return <Loader />

  return (
    <div>
      <h1 className="text-xl font-semibold text-ink-950">ការងារដែលបានរក្សាទុក · Saved Jobs</h1>
      {jobs.length === 0 ? (
        <EmptyState title="មិនទាន់រក្សាទុកការងារណាមួយទេ" />
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {jobs.map((job) => <JobCard key={job.id} job={job} />)}
        </div>
      )}
    </div>
  )
}
