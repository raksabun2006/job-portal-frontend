import { NavLink, Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function DashboardLayout({ title, links }) {
  const linkClass = ({ isActive }) =>
    `block rounded-md px-3.5 py-2.5 text-sm font-medium transition-colors ${
      isActive ? 'bg-ink-900 text-white' : 'text-ink-800/80 hover:bg-ink-900/5'
    }`

  const mobileLinkClass = ({ isActive }) =>
    `shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
      isActive ? 'bg-ink-900 text-white' : 'bg-ink-900/5 text-ink-800/80'
    }`

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Mobile section nav: horizontal scroll strip, sits below the navbar */}
      <nav className="flex gap-2 overflow-x-auto border-b border-ink-900/8 bg-white px-4 py-3 md:hidden">
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} end={l.end} className={mobileLinkClass}>
            {l.label}
          </NavLink>
        ))}
      </nav>

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-6 md:flex-row md:py-8">
        {/* Desktop sidebar */}
        <aside className="hidden w-56 shrink-0 md:block">
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
