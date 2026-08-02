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
    let isMounted = true

    Promise.allSettled([getMyApplications(), getMyResume()]).then(([appRes, resumeRes]) => {
      if (!isMounted) return
      
      if (appRes.status === 'fulfilled') {
        setApplications(appRes.data?.data || appRes.data || [])
      } else {
        setApplications([])
      }

      if (resumeRes.status === 'fulfilled') {
        setResume(resumeRes.data?.data || resumeRes.data || null)
      } else {
        setResume(null)
      }
    })

    return () => {
      isMounted = false
    }
  }, [])

  if (applications === null) return <Loader />

  const hasResume = Boolean(resume?.file_url)
  const interviewCount = applications.filter((a) => a.status === 'interview').length

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-4 sm:space-y-8 sm:px-6 sm:py-6">
      
      {/* 1. Profile Header */}
      <div className="flex flex-col gap-4 rounded-2xl border border-ink-900/10 bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="shrink-0">
            <AvatarUpload fallback="C" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="truncate text-lg font-bold text-ink-900 sm:text-2xl">
                សួស្តី, {user?.name || 'បេក្ខជន'}
              </h1>
              <span className="inline-flex items-center rounded-md bg-teal-50 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-teal-700 capitalize">
                បេក្ខជន · Candidate
              </span>
            </div>
            <p className="mt-1 truncate text-xs text-ink-800/70">
              {user?.email} <span className="hidden sm:inline">· គ្រប់គ្រងពាក្យសុំ និងប្រវត្តិរូបសង្ខេបរបស់អ្នក</span>
            </p>
          </div>
        </div>

        {/* Quick Action Button */}
        <Link
          to="/candidate/resume"
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-ink-900/15 px-4 py-2 text-xs font-semibold text-ink-800 transition-colors hover:bg-ink-900/5 active:bg-ink-900/10 sm:min-h-0 sm:self-auto"
        >
          {hasResume ? 'កែប្រែ CV · Edit Resume' : 'បញ្ចូល CV · Upload Resume'}
        </Link>
      </div>

      {/* 2. Stats Summary Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Card 1: Total Applications */}
        <div className="relative overflow-hidden rounded-2xl border border-ink-900/10 bg-white p-4 shadow-xs sm:p-5">
          <div className="absolute top-0 left-0 h-1 w-full bg-teal-600" />
          <p className="text-xs font-medium text-ink-800/70">ពាក្យសុំសរុប · Applications</p>
          <div className="mt-2 flex items-baseline justify-between">
            <p className="text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">
              {applications.length}
            </p>
          </div>
          <p className="mt-1 text-[11px] text-ink-800/60">ការងារដែលបានដាក់ពាក្យរួចរាល់</p>
        </div>

        {/* Card 2: CV Status */}
        <div className="relative overflow-hidden rounded-2xl border border-ink-900/10 bg-white p-4 shadow-xs sm:p-5">
          <div className={`absolute top-0 left-0 h-1 w-full ${hasResume ? 'bg-emerald-500' : 'bg-amber-500'}`} />
          <p className="text-xs font-medium text-ink-800/70">ស្ថានភាព CV · Resume Status</p>
          <p className={`mt-2 text-xl font-bold tracking-tight sm:text-2xl ${hasResume ? 'text-emerald-700' : 'text-amber-600'}`}>
            {hasResume ? 'បានបញ្ចប់' : 'មិនទាន់មាន'}
          </p>
          <p className="mt-1 text-[11px] text-ink-800/60">
            {hasResume ? 'CV រួចរាល់សម្រាប់ដាក់ពាក្យ' : 'សូមបញ្ចូល CV ដើម្បីងាយស្រួលដាក់ពាក្យ'}
          </p>
        </div>

        {/* Card 3: Interviews */}
        <div className="relative overflow-hidden rounded-2xl border border-ink-900/10 bg-white p-4 shadow-xs sm:p-5">
          <div className="absolute top-0 left-0 h-1 w-full bg-indigo-500" />
          <p className="text-xs font-medium text-ink-800/70">ត្រូវសម្ភាសន៍ · Interviews</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-indigo-700 sm:text-3xl">
            {interviewCount}
          </p>
          <p className="mt-1 text-[11px] text-ink-800/60">ក្រុមហ៊ុនបានអញ្ជើញសម្ភាសន៍</p>
        </div>
      </div>

      {/* 3. Missing Resume Alert */}
      {!hasResume && (
        <div className="flex flex-col gap-3 rounded-2xl border border-amber-500/30 bg-amber-50/70 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3 sm:items-center">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-800">
              !
            </div>
            <p className="text-xs font-medium leading-relaxed text-amber-900">
              អ្នកមិនទាន់បានបញ្ចូល CV ទេ — បញ្ចប់ព័ត៌មានរបស់អ្នកដើម្បីបង្កើនឱកាសទទួលបានការងារ!
            </p>
          </div>
          <Link
            to="/candidate/resume"
            className="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-xl bg-teal-600 px-4 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-teal-700 active:bg-teal-800 sm:min-h-0"
          >
            បញ្ចូល CV ឥឡូវនេះ
          </Link>
        </div>
      )}

      {/* 4. Recent Applications Section */}
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-ink-900 sm:text-lg">
              ពាក្យសុំចុងក្រោយ · Recent Applications
            </h2>
            <p className="text-xs text-ink-800/60">ប្រវត្តិការងារដែលអ្នកបានដាក់ពាក្យថ្មីៗនេះ</p>
          </div>
        </div>

        {applications.length === 0 ? (
          <div className="rounded-2xl border border-ink-900/10 bg-white p-8 text-center text-xs text-ink-800/60 shadow-xs">
            អ្នកមិនទាន់បានដាក់ពាក្យសុំណាមួយទេ។
          </div>
        ) : (
          <div className="divide-y divide-ink-900/10 overflow-hidden rounded-2xl border border-ink-900/10 bg-white shadow-xs">
            {applications.slice(0, 5).map((a) => {
              const logoSrc = a.job?.company?.logo
                ? a.job.company.logo.startsWith('http')
                  ? a.job.company.logo
                  : `${API_ORIGIN}/storage/${a.job.company.logo.replace(/^\//, '')}`
                : null

              return (
                <div
                  key={a.id}
                  className="flex flex-col gap-3 p-4 transition-colors hover:bg-black/[0.015] sm:flex-row sm:items-center sm:justify-between"
                >
                  {/* Job & Company Info */}
                  <div className="flex items-center gap-3 min-w-0">
                    {logoSrc ? (
                      <img
                        src={logoSrc}
                        alt={a.job?.company?.name || 'Company Logo'}
                        className="h-10 w-10 shrink-0 rounded-xl border border-ink-900/10 object-contain p-1"
                      />
                    ) : (
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-xs font-bold text-teal-700">
                        {a.job?.title?.charAt(0)?.toUpperCase() || 'J'}
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-ink-900 text-sm sm:text-base">
                        {a.job?.title || 'N/A'}
                      </p>
                      <p className="truncate text-xs text-ink-800/60">
                        {a.job?.company?.name || 'Unknown Company'}
                        {a.created_at && (
                          <span> · {new Date(a.created_at).toLocaleDateString()}</span>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center justify-end sm:justify-start shrink-0">
                    <StatusBadge status={a.status} />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

    </div>
  )
}