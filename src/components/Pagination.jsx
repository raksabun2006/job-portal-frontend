export default function Pagination({ meta, onPageChange }) {
  if (!meta || meta.last_page <= 1) return null

  const pages = Array.from({ length: meta.last_page }, (_, i) => i + 1)

  return (
    <div className="mt-8 flex items-center justify-center gap-1.5">
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`h-9 w-9 rounded-md text-sm font-medium transition-colors ${
            p === meta.current_page ? 'bg-ink-900 text-white' : 'text-ink-800 hover:bg-ink-900/5'
          }`}
        >
          {p}
        </button>
      ))}
    </div>
  )
}
