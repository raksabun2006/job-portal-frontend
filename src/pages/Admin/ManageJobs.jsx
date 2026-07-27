import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { deleteAdminJob, getAdminJobs } from '../../api/admin'
import StatusBadge from '../../components/StatusBadge'
import Loader from '../../components/Loader'

export default function ManageJobs() {
  const [jobs, setJobs] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const load = () =>
    getAdminJobs()
      .then((res) => setJobs(res.data))
      .catch(() => setJobs([]))

  useEffect(() => {
    load()
  }, [])

  const handleDelete = async (id) => {
    if (!confirm('តើអ្នកប្រាកដថាចង់លុបការងារនេះមែនទេ? / Are you sure you want to delete this job posting?')) return
    try {
      await deleteAdminJob(id)
      toast.success('Job removed successfully')
      load()
    } catch (error) {
      toast.error('Failed to remove job')
    }
  }

  if (jobs === null) return <Loader />

  const filteredJobs = jobs.filter(
    (j) =>
      j.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.company?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.category?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header & Search Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink-900">
            គ្រប់គ្រងការងារ · Manage Jobs
          </h1>
          <p className="mt-1 text-xs text-ink-800/60">
            មើល និងគ្រប់គ្រងការប្រកាសរើសបុគ្គលិកទាំងអស់ក្នុងប្រព័ន្ធ
          </p>
        </div>

        {/* Search Input */}
        <div className="w-full sm:w-72">
          <input
            type="text"
            placeholder="ស្វែងរកតាមចំណងជើង ឬ ក្រុមហ៊ុន..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-ink-900/10 bg-white px-4 py-2 text-sm text-ink-900 placeholder:text-ink-800/40 outline-none focus:border-teal-600 transition-all"
          />
        </div>
      </div>

      {/* Jobs List Card */}
      <div className="overflow-hidden rounded-2xl border border-ink-900/8 bg-white shadow-sm">
        {filteredJobs.length === 0 ? (
          <div className="p-8 text-center text-sm text-ink-800/60">
            {jobs.length === 0 ? 'មិនទាន់មានការប្រកាសការងារនៅឡើយទេ។' : 'រកមិនឃើញការងារឡើយ។'}
          </div>
        ) : (
          <div className="divide-y divide-ink-900/8">
            {filteredJobs.map((j) => (
              <div
                key={j.id}
                className="flex flex-col gap-3 p-4 transition-colors hover:bg-[#faf9f5]/50 sm:flex-row sm:items-center sm:justify-between"
              >
                {/* Job Info */}
                <div className="flex items-center gap-3">
                  {/* Company Logo or Fallback Badge */}
                  {j.company?.logo ? (
                    <img
                      src={j.company.logo}
                      alt={j.company.name}
                      className="h-10 w-10 shrink-0 rounded-xl border border-ink-900/10 object-contain p-1"
                    />
                  ) : (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-sm font-bold text-teal-700">
                      {j.title?.charAt(0)?.toUpperCase() || 'J'}
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-ink-900">{j.title}</p>
                      {j.type && (
                        <span className="rounded-md bg-teal-50 px-2 py-0.5 text-[10px] font-semibold text-teal-700 capitalize">
                          {j.type}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-ink-800/60">
                      <span className="font-medium text-ink-900">{j.company?.name || 'Unknown Company'}</span>
                      {j.location && ` · ${j.location}`}
                      {j.deadline && ` · ផុតកំណត់: ${j.deadline}`}
                    </p>
                  </div>
                </div>

                {/* Status & Actions */}
                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <StatusBadge status={j.status} />
                  <button
                    onClick={() => handleDelete(j.id)}
                    className="rounded-lg border border-rose-500/20 bg-rose-50/50 px-3 py-1.5 text-xs font-semibold text-rose-600 transition-colors hover:bg-rose-100/60"
                  >
                    Delete Job
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}