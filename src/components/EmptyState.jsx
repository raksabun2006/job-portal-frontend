export default function EmptyState({ title, description }) {
  return (
    <div className="rounded-lg border border-dashed border-ink-900/15 py-16 text-center">
      <p className="font-medium text-ink-900">{title}</p>
      {description && <p className="mt-1 text-sm text-ink-800/60">{description}</p>}
    </div>
  )
}
