import { useEffect, useRef, useState } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const dashboardPath = { candidate: '/candidate', employer: '/employer', admin: '/admin' }

export default function GoogleLoginButton({ role = 'candidate' }) {
  const { loginWithGoogleToken } = useAuth()
  const navigate = useNavigate()
  const containerRef = useRef(null)
  const [width, setWidth] = useState(320)

  // Google's rendered button uses a fixed pixel width, so it must be measured
  // against its container to avoid overflowing narrow phone screens.
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const update = () => setWidth(Math.max(200, Math.min(320, Math.floor(el.offsetWidth))))
    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="w-full">
      <div className="flex justify-center">
        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            try {
              const user = await loginWithGoogleToken(credentialResponse.credential, role)
              toast.success('ចូលបានជោគជ័យ! Signed in with Google.')
              navigate(dashboardPath[user.roles?.[0]] || '/')
            } catch (err) {
              toast.error('Google login failed. Please try again.')
            }
          }}
          onError={() => toast.error('Google login failed. Please try again.')}
          text="continue_with"
          shape="pill"
          width={width}
        />
      </div>
    </div>
  )
}