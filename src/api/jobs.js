import api from "./axios";

export const getJobs = (params) =>
  api.get("/jobs", { params }).then((r) => r.data);
export const getJob = (id) => api.get(`/jobs/${id}`).then((r) => r.data);
export const getMyJobs = (params) =>
  api.get("/my-jobs", { params }).then((r) => r.data);
export const createJob = (data) => api.post("/jobs", data).then((r) => r.data);
export const updateJob = (id, data) =>
  api.put(`/jobs/${id}`, data).then((r) => r.data);
export const deleteJob = (id) => api.delete(`/jobs/${id}`).then((r) => r.data);
export const toggleSaveJob = (id) =>
  api.post(`/jobs/${id}/save`).then((r) => r.data);
export const getSavedJobs = () => api.get("/saved-jobs").then((r) => r.data);
