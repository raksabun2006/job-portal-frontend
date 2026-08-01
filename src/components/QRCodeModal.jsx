import JobQRCode from './JobQRCode'

export default function QRCodeModal({ job, onClose }) {
  if (!job) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/50 p-4"
      onClick={onClose}
    >
      <div
        className="card w-full max-w-sm p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold text-ink-950">QR កូដការងារ · Job QR Code</h3>
            <p className="mt-0.5 text-sm text-ink-800/60">{job.title}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-md p-1 text-ink-800/50 hover:bg-ink-900/5 hover:text-ink-900"
            aria-label="Close"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mt-5">
          <JobQRCode jobId={job.id} jobTitle={job.title} />
        </div>
      </div>
    </div>
  )
}
