import api from './axios'

export const scheduleInterview = (applicationId, data) => api.post(`/applications/${applicationId}/interview`, data).then((r) => r.data)
export const updateInterview = (id, data) => api.put(`/interviews/${id}`, data).then((r) => r.data)
export const cancelInterview = (id) => api.put(`/interviews/${id}/cancel`).then((r) => r.data)
