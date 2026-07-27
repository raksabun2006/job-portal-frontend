import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getApplicantsForJob, updateApplicationStatus } from '../../api/applications'
import { scheduleInterview } from '../../api/interviews'
import StatusBadge from '../../components/StatusBadge'
import Loader from '../../components/Loader'
import EmptyState from '../../components/EmptyState'

const statuses = ['applied', 'reviewed', 'interview', 'rejected', 'accepted']

export default function Applications() {
  const { jobId } = useParams()
  const [applicants, setApplicants] = useState(null)
  const [scheduling, setScheduling] = useState(null)
  const [form, setForm] = useState({ date: '', location: '', meeting_link: '' })

  const load = () => getApplicantsForJob(jobId).then((res) => setApplicants(res.data)).catch(() => setApplicants([]))

  useEffect(() => {
    load()
  }, [jobId])

  const handleStatus = async (id, status) => {
    await updateApplicationStatus(id, status)
    toast.success('ស្ថានភាពត្រូវបានធ្វើបច្ចុប្បន្នភាព')
    load()
  }

  const handleSchedule = async (id) => {
    try {
      await scheduleInterview(id, form)
      toast.success('សម្ភាសន៍ត្រូវបានកំណត់ពេល')
      setScheduling(null)
      setForm({ date: '', location: '', meeting_link: '' })
      load()
    } catch {
      toast.error('មិនបានជោគជ័យទេ')
    }
  }

  if (applicants === null) return <Loader />

  return (
    <div>
      <h1 className="text-xl font-semibold text-ink-950">អ្នកដាក់ពាក្យ · Applicants</h1>

      {applicants.length === 0 ? (
        <EmptyState title="មិនទាន់មានអ្នកដាក់ពាក្យទេ" />
      ) : (
        <div className="mt-6 space-y-4">
          {applicants.map((app) => (
            <div key={app.id} className="card p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-ink-950">{app.candidate?.name}</p>
                  <p className="text-sm text-ink-800/60">{app.candidate?.email}</p>
                </div>
                <StatusBadge status={app.status} />
              </div>

              {app.cover_letter && <p className="mt-3 text-sm text-ink-800/80">{app.cover_letter}</p>}
              {app.resume?.file_url && (
                <a href={app.resume.file_url} target="_blank" rel="noreferrer" className="mt-2 inline-block text-sm text-teal-600 hover:underline">
                  មើល CV
                </a>
              )}

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <select
                  value={app.status}
                  onChange={(e) => handleStatus(app.id, e.target.value)}
                  className="input w-auto py-1.5 text-sm"
                >
                  {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <button onClick={() => setScheduling(scheduling === app.id ? null : app.id)} className="btn-outline text-sm">
                  កំណត់ពេលសម្ភាសន៍
                </button>
              </div>

              {scheduling === app.id && (
                <div className="mt-4 grid gap-2 rounded-md bg-ink-900/[0.03] p-4 sm:grid-cols-3">
                  <input type="datetime-local" className="input" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                  <input placeholder="ទីតាំង" className="input" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
                  <input placeholder="តំណភ្ជាប់ Meeting" className="input" value={form.meeting_link} onChange={(e) => setForm({ ...form, meeting_link: e.target.value })} />
                  <button onClick={() => handleSchedule(app.id)} className="btn-primary sm:col-span-3">បញ្ជាក់កំណត់ពេល</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}