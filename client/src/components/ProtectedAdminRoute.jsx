import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedAdminRoute({ children }) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  const userStr = typeof window !== 'undefined' ? localStorage.getItem('user') : null
  const user = userStr ? JSON.parse(userStr) : null
  
  if (!token || !user) {
    return <Navigate to="/login" replace />
  }
  
  if (user.role !== 'admin') {
    return <Navigate to="/" replace />
  }
  
  return children
}
