import { useEffect, useState } from 'react'
import { getNotifications, markAllNotificationsRead, markNotificationRead } from '../../api/notifications'
import Loader from '../../components/Loader'
import EmptyState from '../../components/EmptyState'

// Utility icon renderer for notification types
const NotificationIcon = ({ type }) => {
  switch (type) {
    case 'success':
      return (
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </span>
      )
    case 'warning':
      return (
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </span>
      )
    default:
      return (
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-600">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </span>
      )
  }
}

export default function Notifications() {
  const [items, setItems] = useState(null)
  const [selectedNotification, setSelectedNotification] = useState(null)
  const [filter, setFilter] = useState('all') // 'all' | 'unread'

  const load = () =>
    getNotifications()
      .then((res) => setItems(res.data))
      .catch(() => setItems([]))

  useEffect(() => {
    load()
  }, [])

  const handleNotificationClick = async (n) => {
    setSelectedNotification(n)
    
    // Optimistic UI update for instant feedback
    if (!n.is_read) {
      setItems((prev) =>
        prev.map((item) => (item.id === n.id ? { ...item, is_read: true } : item))
      )
      markNotificationRead(n.id).catch(() => load()) // Revert/reload if backend sync fails
    }
  }

  const handleMarkAllRead = async () => {
    // Optimistic UI update
    setItems((prev) => prev.map((item) => ({ ...item, is_read: true })))
    markAllNotificationsRead().catch(() => load())
  }

  if (items === null) return <Loader />

  const unreadCount = items.filter((n) => !n.is_read).length
  const filteredItems = filter === 'unread' ? items.filter((n) => !n.is_read) : items

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-6 sm:px-6">
      {/* Header & Primary Actions */}
      <div className="flex flex-col gap-4 border-b border-ink-900/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-ink-900">
              សេចក្តីជូនដំណឹង <span className="text-sm font-normal text-ink-800/60">• Notifications</span>
            </h1>
            {unreadCount > 0 && (
              <span className="inline-flex items-center rounded-full bg-teal-600/10 px-2.5 py-0.5 text-xs font-semibold text-teal-700 ring-1 ring-inset ring-teal-600/20">
                {unreadCount} ថ្មី
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-ink-800/60">
            ព័ត៌មានបច្ចុប្បន្នភាពអំពីពាក្យសុំ និងគណនីរបស់អ្នក
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Segmented Filter Control */}
          <div className="inline-flex rounded-xl bg-ink-900/5 p-1">
            <button
              onClick={() => setFilter('all')}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
                filter === 'all'
                  ? 'bg-white text-ink-900 shadow-sm'
                  : 'text-ink-800/60 hover:text-ink-900'
              }`}
            >
              ទាំងអស់ ({items.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
                filter === 'unread'
                  ? 'bg-white text-ink-900 shadow-sm'
                  : 'text-ink-800/60 hover:text-ink-900'
              }`}
            >
              មិនទាន់អាន ({unreadCount})
            </button>
          </div>

          {/* Quick Action */}
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="text-xs font-semibold text-teal-600 hover:text-teal-700 hover:underline"
            >
              សម្គាល់ថាបានអានទាំងអស់
            </button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      {filteredItems.length === 0 ? (
        <div className="py-12">
          <EmptyState 
            title={filter === 'unread' ? "មិនមានសេចក្តីជូនដំណឹងថ្មីទេ" : "មិនមានសេចក្តីជូនដំណឹងទេ"} 
          />
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-ink-900/10 bg-white shadow-sm divide-y divide-ink-900/5">
          {filteredItems.map((n) => (
            <button
              key={n.id}
              onClick={() => handleNotificationClick(n)}
              className={`group flex w-full items-start gap-4 p-4 text-left transition-all hover:bg-slate-50/80 ${
                !n.is_read ? 'bg-teal-50/30' : 'bg-white'
              }`}
            >
              {/* Type / Visual Indicator Icon */}
              <NotificationIcon type={n.type} />

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className={`text-sm tracking-tight ${!n.is_read ? 'font-bold text-ink-900' : 'font-medium text-ink-800/80'}`}>
                    {n.title}
                  </p>
                  <span className="shrink-0 text-[11px] font-medium text-ink-800/40">
                    {new Date(n.created_at).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-ink-800/70">
                  {n.message}
                </p>
              </div>

              {/* Unread Status Dot or Action Cue */}
              <div className="flex shrink-0 items-center self-center pl-2">
                {!n.is_read ? (
                  <span className="h-2.5 w-2.5 rounded-full bg-teal-600 ring-4 ring-teal-600/15" />
                ) : (
                  <span className="text-xs font-semibold text-teal-600 opacity-0 transition-opacity group-hover:opacity-100">
                    មើល →
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Modal Detail Dialog */}
      {selectedNotification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-2xl border border-ink-900/10 bg-white p-6 shadow-2xl transition-all">
            <div className="flex items-center justify-between border-b border-ink-900/5 pb-4">
              <div className="flex items-center gap-3">
                <NotificationIcon type={selectedNotification.type} />
                <div>
                  <span className="rounded-md bg-teal-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-teal-700">
                    សេចក្តីជូនដំណឹង
                  </span>
                  <p className="mt-0.5 text-[11px] text-ink-800/50">
                    {new Date(selectedNotification.created_at).toLocaleString()}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedNotification(null)}
                className="rounded-xl p-1.5 text-ink-800/40 hover:bg-ink-900/5 hover:text-ink-900"
              >
                ✕
              </button>
            </div>

            <div className="mt-4">
              <h3 className="text-base font-bold text-ink-900">
                {selectedNotification.title}
              </h3>
              <p className="mt-3 rounded-xl bg-slate-50 p-4 text-xs leading-relaxed text-ink-800">
                {selectedNotification.message}
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedNotification(null)}
                className="rounded-xl bg-teal-600 px-5 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-teal-700 active:scale-[0.98]"
              >
                យល់ព្រម · Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}