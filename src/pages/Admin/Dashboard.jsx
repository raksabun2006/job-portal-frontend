import { useEffect, useState } from 'react'
import { getAdminStats } from '../../api/admin'
import StatusBadge from '../../components/StatusBadge'
import Loader from '../../components/Loader'
import AvatarUpload from '../../components/AvatarUpload'
import { useAuth } from '../../hooks/useAuth'

export default function AdminDashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)

  useEffect(() => {
    let isMounted = true

    getAdminStats()
      .then((res) => {
        if (!isMounted) return
        setStats(res.data || res || {})
      })
      .catch(() => {
        if (!isMounted) return
        setStats({})
      })

    return () => {
      isMounted = false
    }
  }, [])

  if (stats === null) return <Loader />

  const cards = [
    { label: 'អ្នកប្រើប្រាស់សរុប', en: 'Total Users', value: stats.total_users, color: 'bg-teal-500' },
    { label: 'បេក្ខជន', en: 'Candidates', value: stats.total_candidates, color: 'bg-blue-500' },
    { label: 'និយោជក', en: 'Employers', value: stats.total_employers, color: 'bg-indigo-500' },
    { label: 'ក្រុមហ៊ុន', en: 'Companies', value: stats.total_companies, color: 'bg-emerald-500' },
    { label: 'ការងារសរុប', en: 'Total Jobs', value: stats.total_jobs, color: 'bg-amber-500' },
    { label: 'ការងារកំពុងផ្សាយ', en: 'Published Jobs', value: stats.published_jobs, color: 'bg-teal-600' },
    { label: 'ពាក្យសុំសរុប', en: 'Applications', value: stats.total_applications, color: 'bg-purple-500' },
  ]

  // Calculate total applications for percentage bars
  const totalApps = stats.applications_by_status
    ? Object.values(stats.applications_by_status).reduce((acc, curr) => acc + Number(curr), 0)
    : 0

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-4 sm:space-y-8 sm:px-6 sm:py-6">
      
      {/* 1. Header Card */}
      <div className="flex flex-col gap-4 rounded-2xl border border-ink-900/10 bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:p-6">
        <div className="shrink-0">
          <AvatarUpload fallback="A" />
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-lg font-bold tracking-tight text-ink-900 sm:text-2xl">
            ផ្ទាំងគ្រប់គ្រងអ្នកគ្រប់គ្រង · Admin Dashboard
          </h1>
          <p className="mt-1 truncate text-xs text-ink-800/70">
            {user?.name ? `${user.name} · ` : ''}ទិន្នន័យស្ថិតិសរុបរបស់ប្រព័ន្ធ និងការវិភាគពាក្យសុំការងារ
          </p>
        </div>
      </div>

      {/* 2. Overview Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div
            key={c.en}
            className="group relative overflow-hidden rounded-2xl border border-ink-900/10 bg-white p-4 shadow-xs transition-all hover:shadow-md sm:p-5"
          >
            {/* Top accent line */}
            <div className={`absolute top-0 left-0 h-1 w-full ${c.color}`} />

            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-ink-800/70">{c.en}</span>
              <span className={`h-2.5 w-2.5 rounded-full ${c.color}`} />
            </div>

            <p className="mt-3 text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">
              {c.value ?? 0}
            </p>
            <p className="mt-1 text-xs text-ink-800/70">{c.label}</p>
          </div>
        ))}
      </div>

      {/* 3. Analytics Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        
        {/* Graph 1: Application Status Breakdown */}
        {stats.applications_by_status && (
          <div className="rounded-2xl border border-ink-900/10 bg-white p-4 shadow-xs sm:p-6 lg:col-span-7">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-2 sm:mb-6">
              <div>
                <h3 className="text-base font-bold text-ink-900">
                  ពាក្យសុំតាមស្ថានភាព · Applications by Status
                </h3>
                <p className="text-xs text-ink-800/60">ការបែងចែកស្ថានភាពនៃពាក្យសុំការងារ</p>
              </div>
              <span className="rounded-xl bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700">
                សរុប: {totalApps}
              </span>
            </div>

            {/* Progress Bar Items */}
            <div className="space-y-4">
              {Object.entries(stats.applications_by_status).map(([status, count]) => {
                const percentage = totalApps > 0 ? Math.round((Number(count) / totalApps) * 100) : 0
                return (
                  <div key={status} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <StatusBadge status={status} />
                      </div>
                      <span className="font-semibold text-ink-900">
                        {count} <span className="font-normal text-ink-800/50">({percentage}%)</span>
                      </span>
                    </div>

                    {/* Bar Container */}
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-ink-900/5">
                      <div
                        className="h-full bg-teal-600 transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Graph 2: Platform Users Ratio */}
        <div className="rounded-2xl border border-ink-900/10 bg-white p-4 shadow-xs sm:p-6 lg:col-span-5">
          <h3 className="text-base font-bold text-ink-900">
            សមាមាត្រអ្នកប្រើប្រាស់ · User Ratio
          </h3>
          <p className="text-xs text-ink-800/60">ការប្រៀបធៀបរវាងបេក្ខជន និង និយោជក</p>

          <div className="mt-6 flex flex-col items-center justify-center sm:mt-8">
            {/* Donut Chart Simulation */}
            <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-8 border-teal-500/20 bg-teal-50 sm:h-36 sm:w-36">
              <div className="text-center">
                <span className="text-xl font-bold text-ink-900 sm:text-2xl">{stats.total_users ?? 0}</span>
                <p className="text-[10px] font-medium text-ink-800/60">អ្នកប្រើប្រាស់សរុប</p>
              </div>
            </div>

            {/* Sub-counts */}
            <div className="mt-6 grid w-full grid-cols-2 gap-3 border-t border-ink-900/10 pt-4">
              <div className="rounded-xl bg-black/[0.02] p-3 text-center">
                <p className="text-xs text-ink-800/60">បេក្ខជន</p>
                <p className="mt-1 text-base font-bold text-teal-700 sm:text-lg">{stats.total_candidates ?? 0}</p>
              </div>

              <div className="rounded-xl bg-black/[0.02] p-3 text-center">
                <p className="text-xs text-ink-800/60">និយោជក</p>
                <p className="mt-1 text-base font-bold text-indigo-700 sm:text-lg">{stats.total_employers ?? 0}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}