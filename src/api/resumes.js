import api from './axios'

export const getMyResume = () => api.get('/resume').then((r) => r.data)

export const saveResume = (data) => api.post('/resume', data).then((r) => r.data)

// ១. សម្រួល Upload (ដក manual Content-Type header ចេញ)
export const uploadResumeFile = (file) => {
  const form = new FormData()
  form.append('file', file)
  return api.post('/resume/file', form).then((r) => r.data)
}

// ២. សម្រួល Download សម្រាប់ Candidate
export const downloadResumeFile = () => {
  return api
    .get('/resume/download', {
      responseType: 'blob',
    })
    .then((r) => r.data)
}