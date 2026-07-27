import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { deleteUser, getAdminUsers, suspendUser } from '../../api/admin'
import Loader from '../../components/Loader'

export default function ManageUsers() {
  const [users, setUsers] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const load = () =>
    getAdminUsers()
      .then((res) => setUsers(res.data))
      .catch(() => setUsers([]))

  useEffect(() => {
    load()
  }, [])

  const handleSuspend = async (id) => {
    try {
      await suspendUser(id)
      toast.success('User sessions revoked successfully')
      load()
    } catch (error) {
      toast.error('Failed to revoke sessions')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('តើអ្នកប្រាកដថាចង់លុបអ្នកប្រើប្រាស់នេះមែនទេ? / Are you sure you want to delete this user?')) return
    try {
      await deleteUser(id)
      toast.success('User deleted successfully')
      load()
    } catch (error) {
      toast.error('Failed to delete user')
    }
  }

  if (users === null) return <Loader />

  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header & Search Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink-900">
            គ្រប់គ្រងអ្នកប្រើប្រាស់ · Manage Users
          </h1>
          <p className="mt-1 text-xs text-ink-800/60">
            មើល និងគ្រប់គ្រងគណនីអ្នកប្រើប្រាស់ទាំងអស់ក្នុងប្រព័ន្ធ
          </p>
        </div>

        {/* Search Input */}
        <div className="w-full sm:w-72">
          <input
            type="text"
            placeholder="ស្វែងរកតាមឈ្មោះ ឬ អ៊ីមែល..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-ink-900/10 bg-white px-4 py-2 text-sm text-ink-900 placeholder:text-ink-800/40 outline-none focus:border-teal-600 transition-all"
          />
        </div>
      </div>

      {/* Users List Card */}
      <div className="overflow-hidden rounded-2xl border border-ink-900/8 bg-white shadow-sm">
        {filteredUsers.length === 0 ? (
          <div className="p-8 text-center text-sm text-ink-800/60">
            {users.length === 0 ? 'មិនទាន់មានអ្នកប្រើប្រាស់នៅឡើយទេ។' : 'រកមិនឃើញអ្នកប្រើប្រាស់ឡើយ។'}
          </div>
        ) : (
          <div className="divide-y divide-ink-900/8">
            {filteredUsers.map((u) => (
              <div
                key={u.id}
                className="flex flex-col gap-3 p-4 transition-colors hover:bg-[#faf9f5]/50 sm:flex-row sm:items-center sm:justify-between"
              >
                {/* User Info */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-50 text-sm font-bold text-teal-700">
                    {u.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-ink-900">{u.name}</p>
                      {u.roles?.map((role) => (
                        <span
                          key={role}
                          className="rounded-md bg-ink-900/5 px-2 py-0.5 text-[10px] font-medium text-ink-800/70 capitalize"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-ink-800/60">{u.email}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={() => handleSuspend(u.id)}
                    className="rounded-lg border border-amber-500/20 bg-amber-50/50 px-3 py-1.5 text-xs font-semibold text-amber-700 transition-colors hover:bg-amber-100/60"
                  >
                    Revoke Sessions
                  </button>
                  <button
                    onClick={() => handleDelete(u.id)}
                    className="rounded-lg border border-rose-500/20 bg-rose-50/50 px-3 py-1.5 text-xs font-semibold text-rose-600 transition-colors hover:bg-rose-100/60"
                  >
                    Delete
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