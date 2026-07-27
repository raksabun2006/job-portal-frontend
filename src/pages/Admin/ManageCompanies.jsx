import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { deleteAdminCompany, getAdminCompanies } from '../../api/admin'
import Loader from '../../components/Loader'

export default function ManageCompanies() {
  const [companies, setCompanies] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const load = () =>
    getAdminCompanies()
      .then((res) => setCompanies(res.data))
      .catch(() => setCompanies([]))

  useEffect(() => {
    load()
  }, [])

  const handleDelete = async (id) => {
    if (!confirm('តើអ្នកប្រាកដថាចង់លុបក្រុមហ៊ុននេះមែនទេ? / Are you sure you want to delete this company?')) return
    try {
      await deleteAdminCompany(id)
      toast.success('Company removed successfully')
      load()
    } catch (error) {
      toast.error('Failed to remove company')
    }
  }

  if (companies === null) return <Loader />

  const filteredCompanies = companies.filter(
    (c) =>
      c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.industry?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header & Search Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink-900">
            គ្រប់គ្រងក្រុមហ៊ុន · Manage Companies
          </h1>
          <p className="mt-1 text-xs text-ink-800/60">
            មើល និងគ្រប់គ្រងទិន្នន័យក្រុមហ៊ុនទាំងអស់ក្នុងប្រព័ន្ធ
          </p>
        </div>

        {/* Search Input */}
        <div className="w-full sm:w-72">
          <input
            type="text"
            placeholder="ស្វែងរកតាមឈ្មោះ ឬ វិស័យ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-ink-900/10 bg-white px-4 py-2 text-sm text-ink-900 placeholder:text-ink-800/40 outline-none focus:border-teal-600 transition-all"
          />
        </div>
      </div>

      {/* Companies List Card */}
      <div className="overflow-hidden rounded-2xl border border-ink-900/8 bg-white shadow-sm">
        {filteredCompanies.length === 0 ? (
          <div className="p-8 text-center text-sm text-ink-800/60">
            {companies.length === 0 ? 'មិនទាន់មានក្រុមហ៊ុននៅឡើយទេ។' : 'រកមិនឃើញក្រុមហ៊ុនឡើយ។'}
          </div>
        ) : (
          <div className="divide-y divide-ink-900/8">
            {filteredCompanies.map((c) => (
              <div
                key={c.id}
                className="flex flex-col gap-3 p-4 transition-colors hover:bg-[#faf9f5]/50 sm:flex-row sm:items-center sm:justify-between"
              >
                {/* Company Info */}
                <div className="flex items-center gap-3">
                  {/* Company Logo or Fallback Avatar */}
                  {c.logo ? (
                    <img
                      src={c.logo}
                      alt={c.name}
                      className="h-10 w-10 shrink-0 rounded-xl border border-ink-900/10 object-contain p-1"
                    />
                  ) : (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-sm font-bold text-teal-700">
                      {c.name?.charAt(0)?.toUpperCase() || 'C'}
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-ink-900">{c.name}</p>
                      {c.industry && (
                        <span className="rounded-md bg-ink-900/5 px-2 py-0.5 text-[10px] font-medium text-ink-800/70">
                          {c.industry}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-ink-800/60">
                      {c.location || 'N/A'} · <span className="font-medium text-teal-700">{c.jobs_count ?? 0}</span> ឱកាសការងារ (Jobs)
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="rounded-lg border border-rose-500/20 bg-rose-50/50 px-3 py-1.5 text-xs font-semibold text-rose-600 transition-colors hover:bg-rose-100/60"
                  >
                    Delete Company
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