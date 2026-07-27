const styles = {
  applied: 'bg-blue-500/10 text-blue-600',
  reviewed: 'bg-gold-500/10 text-gold-600',
  interview: 'bg-purple-500/10 text-purple-600',
  accepted: 'bg-teal-500/10 text-teal-600',
  rejected: 'bg-red-500/10 text-red-600',
  draft: 'bg-ink-900/8 text-ink-800',
  published: 'bg-teal-500/10 text-teal-600',
  closed: 'bg-ink-900/8 text-ink-800',
}

export default function StatusBadge({ status }) {
  return <span className={`badge capitalize ${styles[status] ?? 'bg-ink-900/8 text-ink-800'}`}>{status}</span>
}
