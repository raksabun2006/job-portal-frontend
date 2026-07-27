import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { getMyResume, saveResume, uploadResumeFile } from '../../api/resumes'
import Loader from '../../components/Loader'

export default function Resume() {
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm()
  const [loading, setLoading] = useState(true)
  const [resume, setResume] = useState(null)
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    getMyResume()
      .then((res) => {
        setResume(res.data)
        if (res.data) {
          reset({
            ...res.data,
            skills: (res.data.skills || []).join(', '),
          })
        }
      })
      .finally(() => setLoading(false))
  }, [reset])

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        skills: data.skills
          ? data.skills.split(',').map((s) => s.trim()).filter(Boolean)
          : [],
      }
      const res = await saveResume(payload)
      setResume(res.data)
      toast.success('CV ត្រូវបានរក្សាទុក · Profile saved')
    } catch {
      toast.error('រក្សាទុកមិនបានជោគជ័យទេ')
    }
  }

  const handleUpload = async () => {
    if (!file) return
    setUploading(true)
    try {
      const res = await uploadResumeFile(file)
      setResume(res.data)
      toast.success('បានផ្ទុកឡើង PDF · Resume uploaded')
    } catch {
      toast.error('ផ្ទុកឡើងមិនបានជោគជ័យទេ (PDF only, max 9MB)')
    } finally {
      setUploading(false)
    }
  }

  const handleViewResume = async () => {
    setDownloading(true)
    try {
      const token = localStorage.getItem('token') // Adjust key name if you store token under a different key in localStorage

      const response = await fetch('http://127.0.0.1:8000/api/resume/download', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/pdf',
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch file')
      }

      const blob = await response.blob()
      
      // If error JSON returned inside blob response
      if (blob.type === 'application/json') {
        const text = await blob.text()
        const json = JSON.parse(text)
        toast.error(json.message || 'មិនអាចទាញយក CV បានទេ')
        return
      }

      // Create object URL and open PDF in new tab
      const url = window.URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }))
      window.open(url, '_blank')
    } catch (error) {
      console.error('Download error details:', error)
      toast.error('មិនអាចទាញយក CV បានទេ · Failed to load resume')
    } finally {
      setDownloading(false)
    }
  }

  if (loading) return <Loader />

  return (
    <div>
      <h1 className="text-xl font-semibold text-ink-950">CV របស់ខ្ញុំ · My Resume</h1>

      {/* Upload & View Section */}
      <div className="card mt-6 p-5">
        <p className="label">ឯកសារ CV (PDF)</p>
        <div className="flex items-center gap-3">
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="text-sm"
          />
          <button
            type="button"
            onClick={handleUpload}
            disabled={!file || uploading}
            className="btn-outline"
          >
            {uploading ? 'កំពុងផ្ទុកឡើង...' : 'ផ្ទុកឡើង'}
          </button>
        </div>

        {resume?.file_url && (
          <button
            type="button"
            onClick={handleViewResume}
            disabled={downloading}
            className="mt-2 inline-block text-sm text-teal-600 hover:underline bg-transparent border-none p-0 cursor-pointer"
          >
            {downloading ? 'កំពុងបើក... · Loading...' : 'មើល CV បច្ចុប្បន្ន'}
          </button>
        )}
      </div>

      {/* Details Form Section */}
      <form onSubmit={handleSubmit(onSubmit)} className="card mt-6 space-y-4 p-5">
        <div>
          <label className="label">ការអប់រំ · Education</label>
          <textarea className="input min-h-20" {...register('education')} />
        </div>
        <div>
          <label className="label">បទពិសោធន៍ · Experience</label>
          <textarea className="input min-h-20" {...register('experience')} />
        </div>
        <div>
          <label className="label">ជំនាញ · Skills (comma separated)</label>
          <input className="input" placeholder="React, Laravel, SQL..." {...register('skills')} />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="label">Portfolio</label>
            <input className="input" {...register('portfolio')} />
          </div>
          <div>
            <label className="label">GitHub</label>
            <input className="input" {...register('github')} />
          </div>
          <div>
            <label className="label">LinkedIn</label>
            <input className="input" {...register('linkedin')} />
          </div>
        </div>
        <button type="submit" disabled={isSubmitting} className="btn-primary">
          {isSubmitting ? 'កំពុងរក្សាទុក...' : 'រក្សាទុក · Save'}
        </button>
      </form>
    </div>
  )
}