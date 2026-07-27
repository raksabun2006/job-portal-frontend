import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createJob, getJob, updateJob } from '../../api/jobs'
import Loader from '../../components/Loader'

const types = ['full-time', 'part-time', 'contract', 'internship', 'remote']

export default function JobForm() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm()
  const [loading, setLoading] = useState(isEdit)

  useEffect(() => {
    if (isEdit) {
      getJob(id).then((res) => reset(res.data)).finally(() => setLoading(false))
    }
  }, [id, isEdit, reset])

  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        await updateJob(id, data)
        toast.success('ការងារត្រូវបានធ្វើបច្ចុប្បន្នភាព')
      } else {
        await createJob(data)
        toast.success('ការងារត្រូវបានផុសផ្សាយ')
      }
      navigate('/employer/jobs')
    } catch (err) {
      toast.error(err.response?.data?.message || 'មិនបានជោគជ័យទេ')
    }
  }

  if (loading) return <Loader />

  return (
    <div>
      <h1 className="text-xl font-semibold text-ink-950">{isEdit ? 'កែសម្រួលការងារ' : 'ដាក់ការងារថ្មី'} · {isEdit ? 'Edit Job' : 'Post a Job'}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="card mt-6 space-y-4 p-5">
        <div>
          <label className="label">ចំណងជើងការងារ · Title</label>
          <input className="input" {...register('title', { required: true })} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label">ប្រភេទ · Category</label>
            <input className="input" {...register('category')} />
          </div>
          <div>
            <label className="label">ប្រភេទការងារ · Type</label>
            <select className="input" {...register('type')}>
              <option value="">ជ្រើសរើស...</option>
              {types.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label">ប្រាក់ខែអប្បបរមា · Min salary</label>
            <input type="number" className="input" {...register('salary_min')} />
          </div>
          <div>
            <label className="label">ប្រាក់ខែអតិបរមា · Max salary</label>
            <input type="number" className="input" {...register('salary_max')} />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label">បទពិសោធន៍ · Experience</label>
            <input className="input" {...register('experience')} />
          </div>
          <div>
            <label className="label">ទីតាំង · Location</label>
            <input className="input" {...register('location')} />
          </div>
        </div>
        <div>
          <label className="label">ថ្ងៃផុតកំណត់ · Deadline</label>
          <input type="date" className="input" {...register('deadline')} />
        </div>
        <div>
          <label className="label">ការពិពណ៌នា · Description</label>
          <textarea className="input min-h-28" {...register('description', { required: true })} />
        </div>
        <div>
          <label className="label">លក្ខខណ្ឌតម្រូវ · Requirements</label>
          <textarea className="input min-h-24" {...register('requirement')} />
        </div>
        <div>
          <label className="label">ស្ថានភាព · Status</label>
          <select className="input" {...register('status')}>
            <option value="published">published</option>
            <option value="draft">draft</option>
            <option value="closed">closed</option>
          </select>
        </div>
        <button type="submit" disabled={isSubmitting} className="btn-primary">
          {isSubmitting ? 'កំពុងផ្ញើ...' : isEdit ? 'ធ្វើបច្ចុប្បន្នភាព' : 'ផុសផ្សាយ · Publish'}
        </button>
      </form>
    </div>
  )
}
