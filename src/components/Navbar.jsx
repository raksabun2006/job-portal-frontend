import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const dashboardPath = {
  candidate: '/candidate',
  employer: '/employer',
  admin: '/admin',
}

export default function Navbar() {
  const { user, role, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)

  // Add subtle shadow and background adjustment on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  const linkClass = ({ isActive }) =>
    `relative py-1 text-sm font-semibold transition-all duration-300 group ${
      isActive ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'
    }`

  const mobileLinkClass = ({ isActive }) =>
    `flex items-center justify-between rounded-xl px-4 py-3 text-base font-semibold transition-all duration-200 ${
      isActive
        ? 'bg-blue-500/10 text-blue-600 shadow-sm'
        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
    }`

  const handleLogout = async () => {
    if (loggingOut) return
    setLoggingOut(true)
    try {
      await logout()
      navigate('/')
    } catch (error) {
      console.error('Failed to log out', error)
    } finally {
      setLoggingOut(false)
    }
  }

  const navLinks = [
    { path: '/', label: 'ទំព័រដើម', subLabel: 'Home', end: true },
    { path: '/jobs', label: 'ការងារ', subLabel: 'Jobs' },
    { path: '/companies', label: 'ក្រុមហ៊ុន', subLabel: 'Companies' },
  ]

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-md shadow-lg shadow-slate-900/5 border-b border-slate-200/60'
          : 'bg-white/60 backdrop-blur-sm border-b border-slate-100'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
        {/* Brand Logo */}
        <Link to="/" className="group relative flex items-center gap-2">
          <div className="relative overflow-hidden rounded-2xl transition-transform duration-300 group-hover:scale-105">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="h-12 w-auto object-contain transition-all duration-300"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.path} to={link.path} end={link.end} className={linkClass}>
              {({ isActive }) => (
                <>
                  <span className="flex items-center gap-1.5">
                    {link.label}
                    <span className="text-xs opacity-60 font-normal">· {link.subLabel}</span>
                  </span>
                  {/* Active / Hover Animated Underline */}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}

          {role && dashboardPath[role] && (
            <NavLink to={dashboardPath[role]} className={linkClass}>
              {({ isActive }) => (
                <>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-blue-700 ring-1 ring-inset ring-blue-600/20">
                    Dashboard
                  </span>
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 rounded-full bg-blue-600 transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </>
              )}
            </NavLink>
          )}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-full bg-slate-100/80 px-3 py-1.5 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                <span>សួស្តី, {user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 hover:text-slate-900 hover:shadow-sm active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100"
              >
                {loggingOut && (
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-slate-300 border-t-slate-600" />
                )}
                {loggingOut ? 'កំពុងចាកចេញ...' : 'ចាកចេញ · Logout'}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-100 hover:text-slate-900 active:scale-95"
              >
                ចូល · Login
              </Link>
              <Link
                to="/register"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-95"
              >
                <span>ចុះឈ្មោះ · Register</span>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="relative inline-flex items-center justify-center rounded-xl p-2.5 text-slate-700 transition-colors hover:bg-slate-100 md:hidden"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <svg className="h-6 w-6 transition-transform duration-300" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="animate-in slide-in-from-top-2 duration-200 border-b border-slate-200 bg-white/95 backdrop-blur-xl px-4 pb-6 pt-2 md:hidden">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <NavLink key={link.path} to={link.path} end={link.end} className={mobileLinkClass}>
                <span>{link.label}</span>
                <span className="text-xs font-normal opacity-60">{link.subLabel}</span>
              </NavLink>
            ))}

            {role && dashboardPath[role] && (
              <NavLink to={dashboardPath[role]} className={mobileLinkClass}>
                <span>Dashboard</span>
              </NavLink>
            )}
          </div>

          <div className="mt-4 border-t border-slate-100 pt-4">
            {user ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 px-2 text-sm font-semibold text-slate-700">
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                  <span>សួស្តី, {user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-100 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100"
                >
                  {loggingOut && (
                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-slate-300 border-t-slate-600" />
                  )}
                  {loggingOut ? 'កំពុងចាកចេញ...' : 'ចាកចេញ · Logout'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/login"
                  className="flex items-center justify-center rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 active:scale-95"
                >
                  ចូល · Login
                </Link>
                <Link
                  to="/register"
                  className="flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-all active:scale-95"
                >
                  ចុះឈ្មោះ · Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}