import api from './axios'

export const applyToJob = (jobId, data) => api.post(`/jobs/${jobId}/apply`, data).then((r) => r.data)
export const getMyApplications = () => api.get('/applications').then((r) => r.data)
export const getApplication = (id) => api.get(`/applications/${id}`).then((r) => r.data)
export const getApplicantsForJob = (jobId) => api.get(`/jobs/${jobId}/applicants`).then((r) => r.data)
export const updateApplicationStatus = (id, status) => api.put(`/applications/${id}/status`, { status }).then((r) => r.data)
