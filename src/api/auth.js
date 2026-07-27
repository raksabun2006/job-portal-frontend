import api from './axios'

export const registerUser = (data) => api.post('/register', data).then((r) => r.data)
export const loginUser = (data) => api.post('/login', data).then((r) => r.data)
export const loginWithGoogle = (credential, role) =>
  api.post('/auth/google', { credential, role }).then((r) => r.data)
export const logoutUser = () => api.post('/logout').then((r) => r.data)
export const getProfile = () => api.get('/profile').then((r) => r.data)
export const updateProfile = (data) => api.put('/profile', data).then((r) => r.data)
export const updateAvatar = (file) => {
  const form = new FormData()
  form.append('avatar', file)
  return api.post('/profile/avatar', form, { headers: { 'Content-Type': 'multipart/form-data' } }).then((r) => r.data)
}