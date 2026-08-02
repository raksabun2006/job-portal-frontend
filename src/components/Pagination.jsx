export default function Pagination({ meta, currentPage, onPageChange }) {
  if (!meta) return null
  const totalPages = meta.last_page || meta.totalPages || meta.total_pages || 1
  if (totalPages <= 1) return null

  const page = currentPage || meta.current_page || meta.currentPage || 1

  const getPageNumbers = () => {
    const pages = []
    const delta = 1

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= page - delta && i <= page + delta)
      ) {
        pages.push(i)
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...')
      }
    }
    return pages
  }

  const btnBase =
    'h-9 min-w-9 px-3 flex items-center justify-center rounded-full text-sm font-medium transition-colors'

  return (
    <nav className="mt-8 flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className={`${btnBase} gap-1 px-4 text-ink-500 hover:bg-ink-100 disabled:opacity-40 disabled:hover:bg-transparent`}
      >
        <span aria-hidden="true">⬅️</span>
        Back
      </button>

      {getPageNumbers().map((p, i) =>
        p === '...' ? (
          <span key={`ellipsis-${i}`} className="px-1 text-ink-400 select-none">
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            aria-current={p === page ? 'page' : undefined}
            className={`${btnBase} ${
              p === page
                ? 'bg-ink-950 text-white'
                : 'text-ink-700 hover:bg-ink-100'
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className={`${btnBase} gap-1 px-4 text-ink-500 hover:bg-ink-100 disabled:opacity-40 disabled:hover:bg-transparent`}
      >
        Next
        <span aria-hidden="true">➡️</span>
      </button>
    </nav>
  )
}