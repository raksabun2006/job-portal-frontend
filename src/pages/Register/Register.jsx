import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../../hooks/useAuth'
import GoogleLoginButton from '../../components/GoogleLoginButton'

export default function Register() {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({
    defaultValues: { role: 'candidate' },
  })
  const { register: doRegister } = useAuth()
  const navigate = useNavigate()
  const role = watch('role')

  // States to control password visibility
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const bannerImage = "./images/bannerAuth.png"

  const onSubmit = async (data) => {
    try {
      await doRegister(data)
      toast.success('ចុះឈ្មោះជោគជ័យ! Account created.')
      navigate(role === 'employer' ? '/employer' : '/candidate', { replace: true })
    } catch (err) {
      const msg = err.response?.data?.errors
        ? Object.values(err.response.data.errors).flat().join(' ')
        : err.response?.data?.message || 'ការចុះឈ្មោះមិនជោគជ័យ'
      toast.error(msg)
    }
  }

  return (
    <div className="flex min-h-dvh w-full bg-slate-100 font-sans">
      <div className="flex w-full flex-col bg-white md:h-dvh md:flex-row">
        
        {/* Left Side: Full Height Promotional Banner */}
        <div className="relative hidden flex-col justify-between p-8 text-white md:flex md:w-1/2 lg:p-16">
          <img 
            src={bannerImage} 
            alt="Register Banner" 
            className="absolute inset-0 h-full w-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/60 to-blue-900/70" />

          {/* Top Logo */}
          <div className="relative z-10 flex items-center gap-2">
            <Link to="/" className="inline-flex items-center gap-2">
              <img 
                src="/images/logo.png" 
                alt="Logo" 
                className="h-10 w-auto object-contain" 
              />
            </Link>
          </div>

          {/* Footer Copyright */}
          <div className="relative z-10 text-xs text-slate-300">
            &copy; {new Date().getFullYear()} CareerKH. All rights reserved.
          </div>
        </div>

        {/* Right Side: Register Form */}
        <div className="flex w-full flex-col justify-center p-6 sm:p-8 md:h-full md:overflow-y-auto md:w-1/2 lg:p-16">
          <div className="mx-auto w-full max-w-md py-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">ចុះឈ្មោះ · Register</h2>
              <p className="mt-2 text-sm text-slate-500">បំពេញព័ត៌មានខាងក្រោមដើម្បីបង្កើតគណនីថ្មី។</p>
            </div>

            {/* Role Selector */}
            <div className="mt-6">
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                ខ្ញុំគឺជា · I am a
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className={`cursor-pointer rounded-xl border p-3 text-center text-sm font-semibold transition-all ${role === 'candidate' ? 'border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600' : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'}`}>
                  <input type="radio" value="candidate" className="hidden" {...register('role')} />
                  Candidate
                </label>
                <label className={`cursor-pointer rounded-xl border p-3 text-center text-sm font-semibold transition-all ${role === 'employer' ? 'border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600' : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'}`}>
                  <input type="radio" value="employer" className="hidden" {...register('role')} />
                  Employer
                </label>
              </div>
            </div>

            {/* Google Quick Registration */}
            <div className="mt-4">
              <GoogleLoginButton role={role} />
            </div>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs uppercase tracking-wider text-slate-400">or</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            {/* Form inputs */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                  ឈ្មោះពេញ · Full name
                </label>
                <input 
                  placeholder="John Doe" 
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-all focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-600/20" 
                  {...register('name', { required: true })} 
                />
                {errors.name && <p className="mt-1 text-xs text-rose-600">សូមបញ្ចូលឈ្មោះពេញរបស់អ្នក។</p>}
              </div>

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
                  លេខទូរស័ព្ទ · Phone
                </label>
                <input 
                  placeholder="012 345 678" 
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-all focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-600/20" 
                  {...register('phone')} 
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Password Field */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                    ពាក្យសម្ងាត់ · Password
                  </label>
                  <div className="relative">
                    <input 
                      type={showPassword ? 'text' : 'password'} 
                      placeholder="••••••••" 
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-4 pr-10 py-3 text-sm text-slate-900 outline-none transition-all focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-600/20" 
                      {...register('password', { required: true, minLength: 8 })} 
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                    >
                      {showPassword ? (
                        /* Hide Eye Icon */
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                      ) : (
                        /* Show Eye Icon */
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12c1.074-4.65 5.062-8 10.222-8 5.16 0 9.148 3.35 10.222 8-1.074 4.65-5.062 8-10.222 8-5.16 0-9.148-3.35-10.222-8z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {errors.password && <p className="mt-1 text-xs text-rose-600">យ៉ាងហោចណាស់ ៨ តួអក្សរ។</p>}
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                    បញ្ជាក់ពាក្យសម្ងាត់
                  </label>
                  <div className="relative">
                    <input 
                      type={showConfirmPassword ? 'text' : 'password'} 
                      placeholder="••••••••" 
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-4 pr-10 py-3 text-sm text-slate-900 outline-none transition-all focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-600/20" 
                      {...register('password_confirmation', { required: true })} 
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                    >
                      {showConfirmPassword ? (
                        /* Hide Eye Icon */
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                      ) : (
                        /* Show Eye Icon */
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12c1.074-4.65 5.062-8 10.222-8 5.16 0 9.148 3.35 10.222 8-1.074 4.65-5.062 8-10.222 8-5.16 0-9.148-3.35-10.222-8z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting} 
                className="mt-2 w-full rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-700 active:scale-[0.98] disabled:opacity-50"
              >
                {isSubmitting ? 'កំពុងបង្កើត...' : 'បង្កើតគណនី · Create account'}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
              មានគណនីរួចហើយ?{' '}
              <Link to="/login" className="font-semibold text-blue-600 hover:underline">
                ចូលគណនី
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}