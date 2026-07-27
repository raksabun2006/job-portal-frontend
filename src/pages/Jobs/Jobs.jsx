import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getJobs } from '../../api/jobs'
import JobCard from '../../components/JobCard'
import Pagination from '../../components/Pagination'
import Loader from '../../components/Loader'
import EmptyState from '../../components/EmptyState'
import { useDebounce } from '../../hooks/useDebounce'

const types = ['full-time', 'part-time', 'contract', 'internship', 'remote']

export default function Jobs() {
  const [params, setParams] = useSearchParams()
  const [keyword, setKeyword] = useState(params.get('keyword') || '')
  const debouncedKeyword = useDebounce(keyword)
  const [jobs, setJobs] = useState(null)
  const [meta, setMeta] = useState(null)
  const [type, setType] = useState(params.get('type') || '')
  const [location, setLocation] = useState(params.get('location') || '')
  const page = Number(params.get('page') || 1)

  useEffect(() => {
    setJobs(null)
    getJobs({
      keyword: debouncedKeyword || undefined,
      category: params.get('category') || undefined,
      type: type || undefined,
      location: location || undefined,
      page,
    })
      .then((res) => { setJobs(res.data); setMeta(res.meta) })
      .catch(() => setJobs([]))
  }, [debouncedKeyword, type, location, page, params])

  const updatePage = (p) => setParams((prev) => { prev.set('page', p); return prev })

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-ink-950">ស្វែងរកការងារ · Browse Jobs</h1>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="ស្វែងរកតួនាទី, ជំនាញ..."
          className="input"
        />
        <select value={type} onChange={(e) => setType(e.target.value)} className="input">
          <option value="">គ្រប់ប្រភេទការងារ</option>
          {types.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="ទីតាំង..."
          className="input"
        />
      </div>

      <div className="mt-8">
        {jobs === null ? (
          <Loader />
        ) : jobs.length === 0 ? (
          <EmptyState title="រកមិនឃើញការងារទេ" description="សាកល្បងកែពាក្យស្វែងរក ឬតម្រង។" />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => <JobCard key={job.id} job={job} />)}
          </div>
        )}
        <Pagination meta={meta} onPageChange={updatePage} />
      </div>
    </div>
  )
}
