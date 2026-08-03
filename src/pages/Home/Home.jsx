import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getJobs } from '../../api/jobs'
import { getCompanies } from '../../api/companies'
import JobCard from '../../components/JobCard'
import CompanyCard from '../../components/CompanyCard'
import Loader from '../../components/Loader'

const categories = [
  { name: 'Accounting', km: 'គណនេយ្យ', count: '5' },
  { name: 'Human Resource', km: 'ធនាគារ & ធនធានមនុស្ស', count: '3' },
  { name: 'IT & Software', km: 'ព័ត៌មានវិទ្យា & IT', count: '8' },
  { name: 'Banking', km: 'ធនាគារ & ហិរញ្ញវត្ថុ', count: '6' },
  { name: 'Digital & Creative', km: 'ឌីជីថល & ការច្នៃប្រឌិត', count: '4' },
  { name: 'Sales & Marketing', km: 'លក់ & ទីផ្សារ', count: '2' },
]

export default function Home() {
  const [keyword, setKeyword] = useState('')
  const [location, setLocation] = useState('')
  const [category, setCategory] = useState('')
  const [jobs, setJobs] = useState(null)
  const [companies, setCompanies] = useState(null)
  const [currentCompanyIndex, setCurrentCompanyIndex] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    getJobs({ per_page: 6 }).then((res) => setJobs(res.data)).catch(() => setJobs([]))
    getCompanies({ per_page: 6 }).then((res) => setCompanies(res.data)).catch(() => setCompanies([]))
  }, [])

  // Dynamic slider timer for featured companies
  useEffect(() => {
    if (!companies || companies.length <= 1) return

    const interval = setInterval(() => {
      setCurrentCompanyIndex((prev) => (prev + 1) % companies.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [companies])

  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (keyword) params.append('keyword', keyword)
    if (location) params.append('location', location)
    if (category) params.append('category', category)
    navigate(`/jobs?${params.toString()}`)
  }

  const activeCompany = companies && companies.length > 0 ? companies[currentCompanyIndex] : null

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      
      {/* Hero Section with Blue Gradient Overlay */}
      <section className="relative bg-slate-900 text-white overflow-hidden py-12 sm:py-20 md:py-28">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-500"
          style={{
            backgroundImage: `url('https://media.licdn.com/dms/image/v2/D4E12AQHSP2c-t1xwMg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1699539921842?e=2147483647&v=beta&t=dbcfO4OnNcIHtlLy3Qdg4pJJQjQewH7DY0gVe-4xm0k')`
          }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-blue-950/70 to-slate-950/80" />

        <div className="relative z-20 mx-auto max-w-6xl px-4">

          {/* Main Hero Headline */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Great Careers. <span className="underline decoration-blue-400 underline-offset-8">Start here!</span>
            </h1>
          </div>

          {/* Search Form */}
          <form
            onSubmit={handleSearch}
            className="flex flex-col md:flex-row items-stretch bg-white/95 backdrop-blur-md rounded-xl p-2 shadow-2xl text-slate-800 gap-2 md:gap-0 border border-white/20"
          >
            {/* Keyword Input */}
            <div className="flex-1 flex items-center px-3 py-2 border-b md:border-b-0 md:border-r border-slate-200">
              <svg className="w-5 h-5 text-slate-400 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="All Positions, Company, Keywords"
                className="w-full text-sm outline-none bg-transparent placeholder-slate-400"
              />
            </div>

            {/* Category Dropdown */}
            <div className="flex-1 flex items-center px-3 py-2 border-b md:border-b-0 md:border-r border-slate-200">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-sm outline-none bg-transparent cursor-pointer text-slate-700"
              >
                <option value="">All Job Functions</option>
                {categories.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.km} ({c.name})
                  </option>
                ))}
              </select>
            </div>

            {/* Location Input */}
            <div className="flex-1 flex items-center px-3 py-2">
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full text-sm outline-none bg-transparent cursor-pointer text-slate-700"
              >
                <option value="">All Locations</option>
                <option value="Phnom Penh">Phnom Penh</option>
                <option value="Siem Reap">Siem Reap</option>
                <option value="Sihanoukville">Sihanoukville</option>
                <option value="Battambang">Battambang</option>
              </select>
            </div>

            {/* Find Jobs Button */}
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm px-8 py-3 rounded-lg shadow-md shadow-blue-500/30 transition-all duration-200 shrink-0 active:scale-95"
            >
              Find Jobs
            </button>
          </form>

          {/* DYNAMIC Featured Company Preview Widget & Pagination Dots */}
          {activeCompany && (
            <div className="mt-12 flex flex-col items-start gap-3">
              <Link
                to={`/companies/${activeCompany.id}`}
                className="flex items-center gap-4 bg-slate-900/60 backdrop-blur-md p-3 pr-6 rounded-2xl border border-white/20 text-white shadow-lg transition-all duration-300 hover:border-white/40 hover:bg-slate-900/80"
              >
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-blue-900 font-bold overflow-hidden shrink-0 shadow-sm">
                  {activeCompany.logo ? (
                    <img src={activeCompany.logo} alt={activeCompany.name} className="w-full h-full object-cover" />
                  ) : (
                    activeCompany.name?.slice(0, 2).toUpperCase()
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold text-white leading-tight">
                    {activeCompany.name}
                  </p>
                  <p className="text-xs text-blue-200">
                    {activeCompany.category || activeCompany.industry || 'Banking/ Insurance/ Microfinance'}
                  </p>
                  <p className="text-xs text-slate-300">
                    {activeCompany.location || 'Phnom Penh'}
                  </p>
                </div>
              </Link>

              {/* Dynamic Slider Dots */}
              {companies.length > 1 && (
                <div className="flex items-center gap-2 pl-4">
                  {companies.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentCompanyIndex(index)}
                      className={`transition-all duration-300 rounded-full ${
                        index === currentCompanyIndex
                          ? 'w-2.5 h-2.5 bg-blue-500 ring-2 ring-blue-400/30'
                          : 'w-2 h-2 bg-white/50 hover:bg-white/80'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </section>

      {/* Top Employers Section Header */}
      <section className="bg-white border-b border-slate-200/80 py-6">
        <h2 className="text-center text-xl font-bold text-slate-800 tracking-tight">
          Top Employers
        </h2>
      </section>

      {/* Main Content Area */}
      <section className="mx-auto max-w-6xl px-4 pt-8 sm:pt-10">

        {/* Top Companies Section Grid */}
        <div className="mb-10 sm:mb-14">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                ក្រុមហ៊ុនដៃគូ · Featured Companies
              </h3>
            </div>
            
            <Link 
              to="/companies" 
              className="text-xs font-semibold text-blue-600 hover:text-indigo-600 hover:underline transition-colors"
            >
              ក្រុមហ៊ុនទាំងអស់ · All Companies →
            </Link>
          </div>

          {companies === null ? (
            <Loader />
          ) : companies.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
              <p className="text-sm text-slate-500">មិនទាន់មានក្រុមហ៊ុននៅឡើយទេ។</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {companies.slice(0, 4).map((c) => (
                <CompanyCard key={c.id} company={c} />
              ))}
            </div>
          )}
        </div>

        {/* Content Layout with Sidebar */}
        {/* Mobile priority: jobs first (what people came for), categories second. Restored to sidebar-left order at lg. */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">

          {/* Left Column: Job Categories */}
          <div className="order-2 lg:order-1 lg:col-span-4">
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
              <h3 className="mb-4 text-base font-bold text-slate-900">ប្រភេទការងារ · Categories</h3>
              <div className="divide-y divide-slate-100">
                {categories.map((c) => (
                  <Link
                    key={c.name}
                    to={`/jobs?category=${encodeURIComponent(c.name)}`}
                    className="group flex items-center justify-between py-3 transition-colors hover:text-blue-600"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">{c.km}</p>
                      <p className="text-xs text-slate-400">{c.name}</p>
                    </div>
                    <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-600 ring-1 ring-inset ring-blue-500/10 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      {c.count}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Latest Job Listings */}
          <div className="order-1 lg:order-2 lg:col-span-8">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-slate-900">
                  ការងារថ្មីៗ · Latest Jobs
                </h2>
                <p className="text-xs text-slate-500">ឱកាសការងារថ្មីៗដែលត្រូវបានប្រកាសចុងក្រោយ</p>
              </div>

              <Link 
                to="/jobs" 
                className="rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300 shadow-sm"
              >
                មើលទាំងអស់ · View All
              </Link>
            </div>

            {jobs === null ? (
              <Loader />
            ) : jobs.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
                <p className="text-sm text-slate-500">មិនទាន់មានការងារនៅឡើយទេ។</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}
          </div>

        </div>

      </section>
    </div>
  )
}