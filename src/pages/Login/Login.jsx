import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../../hooks/useAuth'
import GoogleLoginButton from '../../components/GoogleLoginButton'

const dashboardPath = { candidate: '/candidate', employer: '/employer', admin: '/admin' }

export default function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const bannerImage = "https://static.vecteezy.com/system/resources/previews/010/442/458/non_2x/search-job-of-people-online-find-vacancy-employment-go-to-career-of-hire-people-seek-opportunity-for-vacancy-or-work-position-search-new-work-in-internet-illustration-vector.jpg"

  const onSubmit = async (data) => {
    try {
      const user = await login(data)
      toast.success('ចូលបានជោគជ័យ! Welcome back.')
      const role = user.roles?.[0]
      navigate(location.state?.from?.pathname || dashboardPath[role] || '/', { replace: true })
    } catch (err) {
      toast.error(err.response?.data?.message || 'អ៊ីមែល ឬពាក្យសម្ងាត់មិនត្រឹមត្រូវ')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4 font-sans">
      <div className="w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-xl md:flex">
        
        {/* Left Side: Promotional Banner with Background Image */}
        <div className="relative flex flex-col justify-between p-8 text-white md:w-1/2 md:p-12">
          
          {/* Background Image & Gradient Overlay */}
          <img 
            src={bannerImage} 
            alt="Office Banner" 
            className="absolute inset-0 h-full w-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/60 to-blue-900/70" />

          {/* Top Logo */}
          <div className="relative z-10 flex items-center gap-2">
             <Link to="/" className="inline-flex items-center gap-2">
              <img 
                src="/images/logo.png" 
                alt="Logo" 
                className="h-8 w-auto object-contain" 
              />
            </Link>
          </div>

          {/* Center Message */}
          <div className="relative z-10 my-12">
            <h1 className="text-2xl font-bold leading-relaxed md:text-3xl lg:leading-snug">
              ស្វែងរកការងារក្នុងក្ដីស្រមៃរបស់អ្នក
            </h1>
            <p className="mt-3 text-sm text-slate-200 leading-relaxed">
              ចូលដើម្បីបន្តស្វែងរកការងារ ឬគ្រប់គ្រងការជ្រើសរើសបុគ្គលិកសម្រាប់ក្រុមហ៊ុនរបស់អ្នក។
            </p>
          </div>

          {/* Footer Copyright */}
          <div className="relative z-10 text-xs text-slate-300">
            &copy; {new Date().getFullYear()} CareerKH. All rights reserved.
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="flex flex-col justify-center p-8 md:w-1/2 md:p-12">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">ចូលគណនី · Login</h2>
            <p className="mt-1 text-sm text-slate-500">សូមបញ្ចូលព័ត៌មានលម្អិតរបស់អ្នកដើម្បីបន្ត។</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                អ៊ីមែល · Email
              </label>
              <input 
                type="email" 
                placeholder="name@example.com" 
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-all focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-600/20" 
                {...register('email', { required: true })} 
              />
              {errors.email && <p className="mt-1 text-xs text-rose-600">សូមបញ្ចូលអ៊ីមែលរបស់អ្នក។</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                ពាក្យសម្ងាត់ · Password
              </label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-all focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-600/20" 
                {...register('password', { required: true })} 
              />
              {errors.password && <p className="mt-1 text-xs text-rose-600">សូមបញ្ចូលពាក្យសម្ងាត់របស់អ្នក។</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100"
            >
              {isSubmitting && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              )}
              {isSubmitting ? 'កំពុងចូល...' : 'ចូលគណនី · Login'}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs uppercase tracking-wider text-slate-400">ឬ · or</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="flex justify-center">
            <GoogleLoginButton role="candidate" />
          </div>

          <p className="mt-8 text-center text-sm text-slate-600">
            មិនទាន់មានគណនី?{' '}
            <Link to="/register" className="font-semibold text-blue-600 hover:underline">
              ចុះឈ្មោះ
            </Link>
          </p>
        </div>

      </div>
    </div>
  )
}