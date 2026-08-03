import { useEffect, useState } from 'react'
import { getCompanies } from '../../api/companies'
import CompanyCard from '../../components/CompanyCard'
import Pagination from '../../components/Pagination'
import Loader from '../../components/Loader'
import EmptyState from '../../components/EmptyState'
import { useDebounce } from '../../hooks/useDebounce'

export default function Companies() {
  const [keyword, setKeyword] = useState('')
  const debounced = useDebounce(keyword)
  const [companies, setCompanies] = useState(null)
  const [meta, setMeta] = useState(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    setCompanies(null)
    getCompanies({ keyword: debounced || undefined, page })
      .then((res) => { setCompanies(res.data); setMeta(res.meta) })
      .catch(() => setCompanies([]))
  }, [debounced, page])

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:py-10">
      <h1 className="text-xl font-semibold text-ink-950 sm:text-2xl">ក្រុមហ៊ុន · Companies</h1>
      <input
        value={keyword}
        onChange={(e) => { setKeyword(e.target.value); setPage(1) }}
        placeholder="ស្វែងរកក្រុមហ៊ុន..."
        className="input mt-6 w-full sm:max-w-md"
      />

      <div className="mt-8">
        {companies === null ? (
          <Loader />
        ) : companies.length === 0 ? (
          <EmptyState title="រកមិនឃើញក្រុមហ៊ុនទេ" />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {companies.map((c) => <CompanyCard key={c.id} company={c} />)}
          </div>
        )}
        <Pagination meta={meta} onPageChange={setPage} />
      </div>
    </div>
  )
}
