import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600">
      <div className="mx-auto max-w-7xl px-4 py-12 text-sm sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          
          {/* Brand & Description */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2">
              <img 
                src="/images/logo.png" 
                alt="Logo" 
                className="h-8 w-auto object-contain" 
              />
            </Link>
            
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-500">
              ភ្ជាប់អ្នកស្វែងរកការងារ ជាមួយក្រុមហ៊ុនល្អៗនៅកម្ពុជា — វេទិកាជ្រើសរើសបុគ្គលិកដ៏ទំនើប និងលឿនរហ័ស។
            </p>
          </div>

          {/* Quick Links: Job Seekers */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-900">
              សម្រាប់អ្នកស្វែងរកការងារ
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/jobs" className="transition-colors hover:text-blue-600">
                  ស្វែងរកការងារ
                </Link>
              </li>
              <li>
                <Link to="/companies" className="transition-colors hover:text-blue-600">
                  ក្រុមហ៊ុនល្បីៗ
                </Link>
              </li>
              <li>
                <Link to="/register" className="transition-colors hover:text-blue-600">
                  បង្កើតគណនីបេក្ខជន
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links: Employers */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-900">
              សម្រាប់និយោជក
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/post-job" className="transition-colors hover:text-blue-600">
                  ដាក់ការងារថ្មី
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="transition-colors hover:text-blue-600">
                  គ្រប់គ្រងបេក្ខជន
                </Link>
              </li>
              <li>
                <Link to="/login" className="transition-colors hover:text-blue-600">
                  ចូលគណនីនិយោជក
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} CareerKH. All rights reserved.</p>
          
          <div className="flex gap-6">
            <Link to="/terms" className="transition-colors hover:text-slate-800">
              លក្ខខណ្ឌសេវាកម្ម
            </Link>
            <Link to="/privacy" className="transition-colors hover:text-slate-800">
              គោលការណ៍ឯកជនភាព
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}