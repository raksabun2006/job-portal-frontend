import { createContext, useEffect, useState } from 'react'
import { getProfile, loginUser, loginWithGoogle, logoutUser, registerUser } from '../api/auth'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const cached = localStorage.getItem('user')
    return cached ? JSON.parse(cached) : null
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      setLoading(false)
      return
    }
    getProfile()
      .then((res) => {
        setUser(res.data)
        localStorage.setItem('user', JSON.stringify(res.data))
      })
      .catch(() => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUser(null)
      })
      .finally(() => setLoading(false))
  }, [])

  const login = async (credentials) => {
    const res = await loginUser(credentials)
    localStorage.setItem('token', res.token)
    localStorage.setItem('user', JSON.stringify(res.user))
    setUser(res.user)
    return res.user
  }

  const register = async (data) => {
    const res = await registerUser(data)
    localStorage.setItem('token', res.token)
    localStorage.setItem('user', JSON.stringify(res.user))
    setUser(res.user)
    return res.user
  }

  const loginWithGoogleToken = async (credential, role) => {
    const res = await loginWithGoogle(credential, role)
    localStorage.setItem('token', res.token)
    localStorage.setItem('user', JSON.stringify(res.user))
    setUser(res.user)
    return res.user
  }

  const logout = async () => {
    try {
      await logoutUser()
    } finally {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      setUser(null)
    }
  }

  const role = user?.roles?.[0] ?? null

  return (
    <AuthContext.Provider value={{ user, role, loading, login, register, loginWithGoogleToken, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}