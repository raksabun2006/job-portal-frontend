import { useRef, useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { toast } from 'react-toastify'

export function getJobApplyUrl(jobId) {
  return `${window.location.origin}/jobs/${jobId}`
}

export default function JobQRCode({ jobId, jobTitle, size = 200 }) {
  const canvasWrapRef = useRef(null)
  const [copied, setCopied] = useState(false)
  const applyUrl = getJobApplyUrl(jobId)

  const handleDownload = () => {
    const canvas = canvasWrapRef.current?.querySelector('canvas')
    if (!canvas) return

    const link = document.createElement('a')
    link.download = `qr-${(jobTitle || 'job').toLowerCase().replace(/[^a-z0-9]+/g, '-')}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(applyUrl)
      setCopied(true)
      toast.success('បានចម្លងតំណ · Link copied')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('មិនអាចចម្លងតំណបានទេ · Could not copy link')
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div ref={canvasWrapRef} className="rounded-xl border border-ink-900/10 bg-white p-4">
        <QRCodeCanvas value={applyUrl} size={size} level="M" includeMargin={false} />
      </div>

      <p className="text-xs text-ink-800/60">
        ស្កេនដើម្បីមើលនិងដាក់ពាក្យ · Scan to view &amp; apply
      </p>

      <p className="max-w-[260px] break-all text-xs text-ink-800/50">{applyUrl}</p>

      <div className="flex w-full gap-2">
        <button type="button" onClick={handleDownload} className="btn-outline flex-1 text-sm">
          ទាញយក · Download
        </button>
        <button type="button" onClick={handleCopyLink} className="btn-outline flex-1 text-sm">
          {copied ? 'បានចម្លង! · Copied!' : 'ចម្លងតំណ · Copy link'}
        </button>
      </div>
    </div>
  )
}
