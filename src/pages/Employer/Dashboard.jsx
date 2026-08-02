import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../../components/Loader'
import AvatarUpload from '../../components/AvatarUpload'
import { useAuth } from '../../hooks/useAuth'
import { getCompany } from '../../api/companies'

export default function EmployerDashboard() {
  const { user } = useAuth()
  const [company, setCompany] = useState(undefined)

  useEffect(() => {
    let isMounted = true

    if (user?.company?.id) {
      getCompany(user.company.id)
        .then((res) => {
          if (!isMounted) return
          setCompany(res.data?.data || res.data || res)
        })
        .catch(() => {
          if (!isMounted) return
          setCompany(null)
        })
    } else {
      setCompany(null)
    }

    return () => {
      isMounted = false
    }
  }, [user])

  if (company === undefined) return <Loader />

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-4 sm:space-y-8 sm:px-6 sm:py-6">
      
      {/* 1. Employer Profile Header Card */}
      <div className="flex flex-col gap-4 rounded-2xl border border-ink-900/10 bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:p-6">
        <div className="shrink-0">
          <AvatarUpload fallback="E" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="truncate text-lg font-bold tracking-tight text-ink-900 sm:text-2xl">
              ផ្ទាំងគ្រប់គ្រងនិយោជក · Employer Dashboard
            </h1>
            <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-indigo-700 capitalize">
              និយោជក · Employer
            </span>
          </div>
          <p className="mt-1 truncate text-xs text-ink-800/70">
            {user?.name ? `${user.name} · ` : ''}{user?.email}
          </p>
        </div>
      </div>

      {/* 2. Company Status & Actions */}
      {!company ? (
        /* Empty State: Prompt to Create Company */
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink-900/15 bg-white p-6 text-center shadow-xs sm:p-10">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 font-bold text-lg mb-3">
            🏢
          </div>
          <h3 className="text-base font-bold text-ink-900">មិនទាន់មានក្រុមហ៊ុន · No Company Profile</h3>
          <p className="mt-1 max-w-md text-xs leading-relaxed text-ink-800/70">
            អ្នកមិនទាន់មានក្រុមហ៊ុនទេ — បង្កើតឥឡូវនេះដើម្បីចាប់ផ្តើមដាក់ការងារ និងគ្រប់គ្រងពាក្យសុំ។
          </p>
          <Link
            to="/employer/company"
            className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-teal-600 px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-teal-700 active:bg-teal-800 sm:min-h-0"
          >
            បង្កើតក្រុមហ៊ុន · Create Company
          </Link>
        </div>
      ) : (
        /* Active State: Display Company Overview Card */
        <div className="flex flex-col gap-4 rounded-2xl border border-ink-900/10 bg-white p-5 shadow-xs sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-center gap-4 min-w-0">
            {company.logo ? (
              <img
                src={company.logo}
                alt={company.name}
                className="h-12 w-12 shrink-0 rounded-xl border border-ink-900/10 object-contain p-1"
              />
            ) : (
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-base font-bold text-indigo-700">
                {company.name?.charAt(0)?.toUpperCase() || 'C'}
              </div>
            )}
            
            <div className="min-w-0 flex-1">
              <h2 className="truncate font-bold text-ink-900 text-base sm:text-lg">
                {company.name}
              </h2>
              <p className="truncate text-xs text-ink-800/60 mt-0.5">
                {company.jobs_count ?? 0} ការងារកំពុងផុសផ្សាយ · Active Jobs Posted
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-ink-900/5 sm:border-t-0 sm:pt-0 shrink-0">
            <Link
              to="/employer/jobs"
              className="inline-flex min-h-[44px] w-full items-center justify-center rounded-xl bg-teal-600 px-4 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-teal-700 active:bg-teal-800 sm:min-h-0 sm:w-auto"
            >
              គ្រប់គ្រងការងារ · Manage Jobs
            </Link>
          </div>
        </div>
      )}

    </div>
  )
}