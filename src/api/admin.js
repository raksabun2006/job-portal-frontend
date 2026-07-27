import api from './axios'

export const getAdminStats = () => api.get('/admin/dashboard').then((r) => r.data)
export const getAdminUsers = (params) => api.get('/admin/users', { params }).then((r) => r.data)
export const suspendUser = (id) => api.put(`/admin/users/${id}/suspend`).then((r) => r.data)
export const deleteUser = (id) => api.delete(`/admin/users/${id}`).then((r) => r.data)
export const getAdminJobs = (params) => api.get('/admin/jobs', { params }).then((r) => r.data)
export const deleteAdminJob = (id) => api.delete(`/admin/jobs/${id}`).then((r) => r.data)
export const getAdminCompanies = () => api.get('/admin/companies').then((r) => r.data)
export const deleteAdminCompany = (id) => api.delete(`/admin/companies/${id}`).then((r) => r.data)
