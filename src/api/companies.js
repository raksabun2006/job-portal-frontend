import api from './axios'

export const getCompanies = (params) => api.get('/companies', { params }).then((r) => r.data)
export const getCompany = (id) => api.get(`/companies/${id}`).then((r) => r.data)
export const createCompany = (data) => api.post('/companies', data).then((r) => r.data)
export const updateCompany = (id, data) => api.put(`/companies/${id}`, data).then((r) => r.data)
export const uploadCompanyLogo = (id, file) => {
  const form = new FormData()
  form.append('logo', file)
  return api.post(`/companies/${id}/logo`, form, { headers: { 'Content-Type': 'multipart/form-data' } }).then((r) => r.data)
}
