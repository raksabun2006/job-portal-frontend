import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50/50 font-sans text-slate-600 antialiased">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-12 text-sm sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          
          {/* Brand & Map Location (Spans 2 columns on large screens) */}
          <div className="space-y-4 lg:col-span-2">
            <Link to="/" className="inline-flex items-center">
              <img 
                src="/images/logo.png" 
                alt="CareerKH Logo" 
                className="h-9 w-auto object-contain" 
              />
            </Link>
            
           

            {/* Google Maps Embed */}
            <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d6947.910707754751!2d104.89067556449092!3d11.571283130100898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2skh!4v1785650433109!5m2!1sen!2skh" 
                width="100%" 
                height="160" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="strict-origin-when-cross-origin"
                title="Google Maps Location"
                className="w-full  transition-all duration-300 hover:grayscale-0"
              />
            </div>
          </div>

          {/* Quick Links: Job Seekers */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-900">
              សម្រាប់អ្នកស្វែងរកការងារ
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/jobs" className="group inline-flex items-center text-slate-600 transition-colors hover:text-blue-600">
                  <span className="transition-transform group-hover:translate-x-0.5">ស្វែងរកការងារ</span>
                </Link>
              </li>
              <li>
                <Link to="/companies" className="group inline-flex items-center text-slate-600 transition-colors hover:text-blue-600">
                  <span className="transition-transform group-hover:translate-x-0.5">ក្រុមហ៊ុនល្បីៗ</span>
                </Link>
              </li>
              <li>
                <Link to="/register" className="group inline-flex items-center text-slate-600 transition-colors hover:text-blue-600">
                  <span className="transition-transform group-hover:translate-x-0.5">បង្កើតគណនីបេក្ខជន</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links: Employers */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-900">
              សម្រាប់និយោជក
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/employer/jobs/create" className="group inline-flex items-center text-slate-600 transition-colors hover:text-blue-600">
                  <span className="transition-transform group-hover:translate-x-0.5">ដាក់ការងារថ្មី</span>
                </Link>
              </li>
              <li>
                <Link to="/employer" className="group inline-flex items-center text-slate-600 transition-colors hover:text-blue-600">
                  <span className="transition-transform group-hover:translate-x-0.5">គ្រប់គ្រងបេក្ខជន</span>
                </Link>
              </li>
              <li>
                <Link to="/login" className="group inline-flex items-center text-slate-600 transition-colors hover:text-blue-600">
                  <span className="transition-transform group-hover:translate-x-0.5">ចូលគណនីនិយោជក</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-900">
              ទំនាក់ទំនង · Contact
            </h3>
            <ul className="space-y-3 text-sm text-slate-500">
              <li className="flex items-start gap-2.5">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>រាជធានីភ្នំពេញ, កម្ពុជា</span>
              </li>
              <li className="flex items-center gap-2.5">
                <svg className="h-4 w-4 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:bun.raksa.1224@rupp.edu.kh" className="transition-colors hover:text-blue-600">
                  bun.raksa.1224@rupp.edu.kh
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <svg className="h-4 w-4 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>096 878 2196</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 text-xs text-slate-500 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} CareerKH. All rights reserved.</p>
          
          <div className="flex items-center gap-6 font-medium">
            <Link to="/terms" className="transition-colors hover:text-slate-800">
              លក្ខខណ្ឌសេវាកម្ម
            </Link>
            <span className="h-3 w-px bg-slate-300" />
            <Link to="/privacy" className="transition-colors hover:text-slate-800">
              គោលការណ៍ឯកជនភាព
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}