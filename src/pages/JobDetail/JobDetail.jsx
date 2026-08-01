import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getJob, toggleSaveJob } from '../../api/jobs'
import { applyToJob } from '../../api/applications'
import { useAuth } from '../../hooks/useAuth'
import Loader from '../../components/Loader'
import JobQRCode from '../../components/JobQRCode'

function formatSalary(min, max) {
  if (!min && !max) return null
  if (min && max) return `$${min.toLocaleString()} – $${max.toLocaleString()}`
  return `$${(min || max).toLocaleString()}+`
}

export default function JobDetail() {
  const { id } = useParams()
  const { user, role } = useAuth()
  const [job, setJob] = useState(null)
  const [coverLetter, setCoverLetter] = useState('')
  const [applying, setApplying] = useState(false)
  const [applied, setApplied] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    getJob(id).then((res) => setJob(res.data)).catch(() => setJob(false))
  }, [id])

  if (job === null) return <Loader />
  if (job === false) return <div className="mx-auto max-w-5xl px-4 py-16 text-center text-ink-800/60">រកមិនឃើញការងារនេះទេ។</div>

  const handleApply = async () => {
    setApplying(true)
    try {
      await applyToJob(job.id, { cover_letter: coverLetter })
      toast.success('ដាក់ពាក្យបានជោគជ័យ! Application submitted.')
      setApplied(true)
    } catch (err) {
      toast.error(err.response?.data?.message || 'មិនអាចដាក់ពាក្យបានទេ')
    } finally {
      setApplying(false)
    }
  }

  const handleSave = async () => {
    try {
      const res = await toggleSaveJob(job.id)
      setSaved(res.saved)
      toast.success(res.saved ? 'បានរក្សាទុកការងារនេះ' : 'បានលុបចេញពីបញ្ជីរក្សាទុក')
    } catch {
      toast.error('សូមចូលគណនីជាមុនសិន')
    }
  }

  const salary = formatSalary(job.salary_min, job.salary_max)
  const companyName = job.company?.name || 'Company'

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link to="/jobs" className="text-sm font-medium text-teal-600 transition-colors hover:text-teal-700 hover:underline">
        ← ត្រឡប់ទៅការងារទាំងអស់
      </Link>

      {/* Main 2-Column Grid */}
      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3">
        
        {/* LEFT COLUMN: Main Job Details & Application Form */}
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border border-ink-900/10 bg-white p-6 shadow-sm md:p-8">
            {/* Header Header Info */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-ink-900/10 bg-ink-900/5 font-bold text-ink-800">
                  {job.company?.logo ? (
                    <img
                      src={job.company.logo}
                      alt={companyName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-lg uppercase">
                      {companyName.slice(0, 2)}
                    </span>
                  )}
                </div>

                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-ink-950 md:text-3xl">{job.title}</h1>
                  <p className="mt-1 text-base font-medium text-ink-800/70">
                    {companyName} · {job.location}
                  </p>
                </div>
              </div>

              {job.type && (
                <span className="hidden sm:inline-flex items-center rounded-full border border-teal-500/20 bg-teal-500/10 px-3 py-1 text-xs font-semibold text-teal-700">
                  {job.type}
                </span>
              )}
            </div>

            <hr className="my-8 border-ink-900/10" />

            {/* Description */}
            <section>
              <h2 className="text-lg font-semibold text-ink-950">ការពិពណ៌នាការងារ · Description</h2>
              <div className="mt-3 whitespace-pre-line text-sm leading-relaxed text-ink-800/80">
                {job.description}
              </div>
            </section>

            {/* Requirements */}
            {job.requirement && (
              <section className="mt-8">
                <h2 className="text-lg font-semibold text-ink-950">លក្ខខណ្ឌតម្រូវ · Requirements</h2>
                <div className="mt-3 whitespace-pre-line text-sm leading-relaxed text-ink-800/80">
                  {job.requirement}
                </div>
              </section>
            )}

            <hr className="my-8 border-ink-900/10" />

            {/* Apply Action Section */}
            <div className="mt-6">
              {!user ? (
                <Link to="/login" className="btn-primary inline-block w-full text-center py-3">
                  ចូលគណនីដើម្បីដាក់ពាក្យ · Login to apply
                </Link>
              ) : role !== 'candidate' ? (
                <p className="text-sm font-medium text-ink-800/60">មានតែបេក្ខជនប៉ុណ្ណោះទើបអាចដាក់ពាក្យបាន។</p>
              ) : applied ? (
                <div className="rounded-xl border border-teal-500/20 bg-teal-500/5 p-4 text-center font-medium text-teal-700">
                  អ្នកបានដាក់ពាក្យលើការងារនេះរួចហើយ
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-ink-950">
                      សំបុត្រណែនាំខ្លួន (ស្រេចចិត្ត)
                    </label>
                    <textarea
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      placeholder="សរសេរហេតុផលដែលអ្នកសាកសមនឹងតំណែងនេះ..."
                      className="input min-h-[120px] w-full rounded-xl border border-ink-900/15 p-3 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    />
                  </div>

                  <button 
                    onClick={handleApply} 
                    disabled={applying} 
                    className="btn-primary w-full rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-700 disabled:opacity-50"
                  >
                    {applying ? 'កំពុងដាក់ពាក្យ...' : 'ដាក់ពាក្យសុំ · Apply Now'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Sidebar (Job Overview & Related Info) */}
        <div className="space-y-6 lg:col-span-1">
          <div className="sticky top-6 space-y-6">
            
            {/* Quick Details Card */}
            <div className="rounded-2xl border border-ink-900/10 bg-white p-6 shadow-sm">
              <h3 className="text-base font-semibold text-ink-950">ទិន្នន័យសង្ខេប · Job Overview</h3>
              
              <dl className="mt-4 space-y-4 text-sm">
                {salary && (
                  <div className="flex flex-col border-b border-ink-900/5 pb-3">
                    <dt className="text-xs font-medium text-ink-800/60">ប្រាក់បៀវត្ស · Salary</dt>
                    <dd className="mt-1 font-semibold text-ink-950">{salary}</dd>
                  </div>
                )}

                {job.type && (
                  <div className="flex flex-col border-b border-ink-900/5 pb-3">
                    <dt className="text-xs font-medium text-ink-800/60">ប្រភេទការងារ · Job Type</dt>
                    <dd className="mt-1 font-medium text-ink-900">{job.type}</dd>
                  </div>
                )}

                {job.experience && (
                  <div className="flex flex-col border-b border-ink-900/5 pb-3">
                    <dt className="text-xs font-medium text-ink-800/60">បទពិសោធន៍ · Experience</dt>
                    <dd className="mt-1 font-medium text-ink-900">{job.experience}</dd>
                  </div>
                )}

                {job.deadline && (
                  <div className="flex flex-col pb-1">
                    <dt className="text-xs font-medium text-ink-800/60">កាលបរិច្ឆេទផុតកំណត់ · Deadline</dt>
                    <dd className="mt-1 font-medium text-rose-600">{job.deadline}</dd>
                  </div>
                )}
              </dl>

              {/* Save Job Button */}
              <button 
                onClick={handleSave} 
                className={`mt-6 w-full rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors ${
                  saved 
                    ? 'border-teal-500 bg-teal-500/10 text-teal-700' 
                    : 'border-ink-900/15 bg-white text-ink-800 hover:bg-ink-900/5'
                }`}
              >
                {saved ? 'បានរក្សាទុក' : 'រក្សាទុកការងារនេះ'}
              </button>
            </div>

            {/* Scan to Apply QR Card */}
            <div className="rounded-2xl border border-ink-900/10 bg-white p-6 shadow-sm">
              <h3 className="text-base font-semibold text-ink-950">ស្កេនដើម្បីដាក់ពាក្យ · Scan to Apply</h3>
              <div className="mt-4">
                <JobQRCode jobId={job.id} jobTitle={job.title} size={160} />
              </div>
            </div>

            {/* Company Card */}
            {job.company && (
              <div className="rounded-2xl border border-ink-900/10 bg-white p-6 shadow-sm">
                <h3 className="text-base font-semibold text-ink-950">អំពីក្រុមហ៊ុន · Company Details</h3>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-ink-900/10 bg-ink-900/5 font-bold text-ink-800">
                    {job.company.logo ? (
                      <img src={job.company.logo} alt={companyName} className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-sm uppercase">{companyName.slice(0, 2)}</span>
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-ink-900">{companyName}</h4>
                    {job.company.industry && (
                      <p className="text-xs text-ink-800/60">{job.company.industry}</p>
                    )}
                  </div>
                </div>

                {job.company.description && (
                  <p className="mt-3 text-xs leading-relaxed text-ink-800/70 line-clamp-3">
                    {job.company.description}
                  </p>
                )}

                {job.company.website && (
                  <a
                    href={job.company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-xs font-medium text-teal-600 hover:underline"
                  >
                    ចូលមើលគេហទំព័រ →
                  </a>
                )}
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  )
}