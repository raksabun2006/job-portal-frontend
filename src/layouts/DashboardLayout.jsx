import { NavLink, Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function DashboardLayout({ title, links }) {
  const linkClass = ({ isActive }) =>
    `block rounded-md px-3.5 py-2.5 text-sm font-medium transition-colors ${
      isActive ? 'bg-ink-900 text-white' : 'text-ink-800/80 hover:bg-ink-900/5'
    }`

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="mx-auto flex w-full max-w-6xl flex-1 gap-8 px-4 py-8">
        <aside className="w-56 shrink-0">
          <p className="mb-3 px-1 text-xs font-semibold uppercase tracking-wide text-ink-800/40">{title}</p>
          <nav className="space-y-1">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
                {l.label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <div className="min-w-0 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
