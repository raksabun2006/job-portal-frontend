import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getMyApplications } from '../../api/applications'
import { getMyResume } from '../../api/resumes'
import { API_ORIGIN } from '../../api/axios'
import StatusBadge from '../../components/StatusBadge'
import Loader from '../../components/Loader'
import AvatarUpload from '../../components/AvatarUpload'
import { useAuth } from '../../hooks/useAuth'

export default function CandidateDashboard() {
  const { user } = useAuth()
  const [applications, setApplications] = useState(null)
  const [resume, setResume] = useState(null)

  useEffect(() => {
    getMyApplications()
      .then((res) => setApplications(res.data))
      .catch(() => setApplications([]))

    getMyResume()
      .then((res) => setResume(res.data))
      .catch(() => setResume(null))
  }, [])

  if (applications === null) return <Loader />

  return (
    <div className="space-y-8">
      {/* Candidate Profile Header Widget */}
      <div className="flex flex-col gap-4 rounded-2xl border border-ink-900/8 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <AvatarUpload fallback="C" />

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-ink-900 sm:text-2xl">
                សួស្តី, {user?.name || 'បេក្ខជន'}
              </h1>
              <span className="rounded-md bg-teal-50 px-2 py-0.5 text-[10px] font-semibold text-teal-700 capitalize">
                បេក្ខជន · Candidate
              </span>
            </div>
            <p className="mt-1 text-xs text-ink-800/60">
              {user?.email} · គ្រប់គ្រងពាក្យសុំ និងប្រវត្តិរូបសង្ខេបរបស់អ្នក
            </p>
          </div>
        </div>

        {/* Quick Resume Link */}
        <Link
          to="/candidate/resume"
          className="self-start rounded-xl border border-ink-900/15 px-4 py-2 text-xs font-semibold text-ink-800 transition-colors hover:bg-ink-900/5 sm:self-auto"
        >
          {resume?.file_url ? 'កែប្រែ CV · Edit Resume' : 'បញ្ចូល CV · Upload Resume'}
        </Link>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {/* Total Applications */}
        <div className="relative overflow-hidden rounded-2xl border border-ink-900/8 bg-white p-5 shadow-sm">
          <div className="absolute top-0 left-0 h-1 w-full bg-teal-600" />
          <p className="text-xs font-semibold text-ink-800/60">ពាក្យសុំសរុប · Applications</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-ink-900">
            {applications.length}
          </p>
          <p className="mt-1 text-[11px] text-ink-800/50">ការងារដែលបានដាក់ពាក្យរួចរាល់</p>
        </div>

        {/* CV Status */}
        <div className="relative overflow-hidden rounded-2xl border border-ink-900/8 bg-white p-5 shadow-sm">
          <div
            className={`absolute top-0 left-0 h-1 w-full ${
              resume?.file_url ? 'bg-emerald-500' : 'bg-amber-500'
            }`}
          />
          <p className="text-xs font-semibold text-ink-800/60">ស្ថានភាព CV · Resume Status</p>
          <p
            className={`mt-2 text-2xl font-bold tracking-tight ${
              resume?.file_url ? 'text-emerald-700' : 'text-amber-600'
            }`}
          >
            {resume?.file_url ? 'បានបញ្ចប់' : 'មិនទាន់មាន'}
          </p>
          <p className="mt-1 text-[11px] text-ink-800/50">
            {resume?.file_url ? 'CV រួចរាល់សម្រាប់ដាក់ពាក្យ' : 'សូមបញ្ចូល CV ដើម្បីងាយស្រួលដាក់ពាក្យ'}
          </p>
        </div>

        {/* Interview Calls */}
        <div className="relative overflow-hidden rounded-2xl border border-ink-900/8 bg-white p-5 shadow-sm">
          <div className="absolute top-0 left-0 h-1 w-full bg-indigo-500" />
          <p className="text-xs font-semibold text-ink-800/60">ត្រូវសម្ភាសន៍ · Interviews</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-indigo-700">
            {applications.filter((a) => a.status === 'interview').length}
          </p>
          <p className="mt-1 text-[11px] text-ink-800/50">ក្រុមហ៊ុនបានអញ្ជើញសម្ភាសន៍</p>
        </div>
      </div>

      {/* Missing Resume Alert Notice */}
      {!resume?.file_url && (
        <div className="flex flex-col gap-3 rounded-2xl border border-amber-500/20 bg-amber-50/60 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700 font-bold text-xs">
              !
            </div>
            <p className="text-xs font-medium text-amber-900">
              អ្នកមិនទាន់បានបញ្ចូល CV ទេ — បញ្ចប់ព័ត៌មានរបស់អ្នកដើម្បីបង្កើនឱកាសទទួលបានការងារ!
            </p>
          </div>
          <Link
            to="/candidate/resume"
            className="shrink-0 rounded-xl bg-teal-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-teal-700 active:scale-[0.98]"
          >
            បញ្ចូល CV ឥឡូវនេះ
          </Link>
        </div>
      )}

      {/* Recent Applications List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-ink-900">
              ពាក្យសុំចុងក្រោយ · Recent Applications
            </h2>
            <p className="text-xs text-ink-800/60">ប្រវត្តិការងារដែលអ្នកបានដាក់ពាក្យថ្មីៗនេះ</p>
          </div>
        </div>

        {applications.length === 0 ? (
          <div className="rounded-2xl border border-ink-900/8 bg-white p-8 text-center text-xs text-ink-800/60">
            អ្នកមិនទាន់បានដាក់ពាក្យសុំណាមួយទេ។
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-ink-900/8 bg-white shadow-sm divide-y divide-ink-900/8">
            {applications.slice(0, 5).map((a) => (
              <div
                key={a.id}
                className="flex flex-col gap-3 p-4 transition-colors hover:bg-[#faf9f5]/50 sm:flex-row sm:items-center sm:justify-between"
              >
                {/* Job & Company Info */}
                <div className="flex items-center gap-3">
                  {a.job?.company?.logo ? (
                    <img
                      src={
                        a.job.company.logo.startsWith('http')
                          ? a.job.company.logo
                          : `${API_ORIGIN}/storage/${a.job.company.logo.replace(/^\//, '')}`
                      }
                      alt={a.job.company.name}
                      className="h-10 w-10 shrink-0 rounded-xl border border-ink-900/10 object-contain p-1"
                    />
                  ) : (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-sm font-bold text-teal-700">
                      {a.job?.title?.charAt(0)?.toUpperCase() || 'J'}
                    </div>
                  )}

                  <div>
                    <p className="font-semibold text-ink-900">{a.job?.title || 'N/A'}</p>
                    <p className="text-xs text-ink-800/60">
                      {a.job?.company?.name || 'Unknown Company'}
                      {a.created_at && ` · ${new Date(a.created_at).toLocaleDateString()}`}
                    </p>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="self-end sm:self-auto">
                  <StatusBadge status={a.status} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}