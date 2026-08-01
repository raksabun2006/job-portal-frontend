import { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { updateAvatar } from '../api/auth'
import { useAuth } from '../hooks/useAuth'

const MAX_AVATAR_BYTES = 2 * 1024 * 1024 // backend limit: image, max 2048 KB

export function getAvatarUrl(avatarPath) {
  if (!avatarPath) return null
  if (avatarPath.startsWith('http')) return avatarPath
  return `http://127.0.0.1:8000/storage/${avatarPath.replace(/^\//, '')}`
}

export default function AvatarUpload({ sizeClass = 'h-16 w-16', fallback = 'U' }) {
  const { user, setUser } = useAuth()
  const [uploading, setUploading] = useState(false)
  const [imgError, setImgError] = useState(false)
  const inputRef = useRef(null)

  const avatarUrl = !imgError ? getAvatarUrl(user?.avatar || user?.profile_photo_url) : null

  const handleChange = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('សូមជ្រើសរើសឯកសាររូបភាព · Please select an image file')
      return
    }

    if (file.size > MAX_AVATAR_BYTES) {
      toast.error('ទំហំរូបភាពធំពេក (អតិបរមា 2MB) · Image is too large (max 2MB)')
      return
    }

    setUploading(true)
    try {
      const res = await updateAvatar(file)
      setUser({ ...user, avatar: res.data.avatar })
      setImgError(false)
      toast.success('រូបភាពត្រូវបានផ្ទុកឡើង · Avatar updated')
    } catch (err) {
      const message =
        err?.response?.data?.errors?.avatar?.[0] || err?.response?.data?.message
      toast.error(message ? `ការផ្ទុកឡើងមិនជោគជ័យ · ${message}` : 'ការផ្ទុកឡើងមិនជោគជ័យ · Avatar upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      disabled={uploading}
      className={`relative shrink-0 ${sizeClass} rounded-full`}
      title="ប្តូររូបភាព · Change avatar"
    >
      <input ref={inputRef} type="file" accept="image/*" onChange={handleChange} className="hidden" />

      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={user?.name || 'Avatar'}
          onError={() => setImgError(true)}
          className="h-full w-full rounded-full border-2 border-teal-600/20 object-cover p-0.5"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-full border border-teal-600/20 bg-teal-50 text-xl font-bold text-teal-700">
          {user?.name?.charAt(0)?.toUpperCase() || fallback}
        </div>
      )}

      {/* Edit badge, always visible in the corner so the upload affordance is discoverable */}
      <span className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-teal-600 text-white shadow-sm">
        {uploading ? (
          <svg className="h-3.5 w-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : (
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 17a4 4 0 100-8 4 4 0 000 8z" />
          </svg>
        )}
      </span>
    </button>
  )
}
