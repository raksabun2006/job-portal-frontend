import { GoogleLogin } from '@react-oauth/google'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const dashboardPath = { candidate: '/candidate', employer: '/employer', admin: '/admin' }

export default function GoogleLoginButton({ role = 'candidate' }) {
  const { loginWithGoogleToken } = useAuth()
  const navigate = useNavigate()

  return (
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
      width="320"
    />
  )
}