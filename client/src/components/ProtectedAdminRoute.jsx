import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedAdminRoute({ children }) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  const userRole = typeof window !== 'undefined' ? localStorage.getItem('userRole') : null
  
  if (!token) {
    return <Navigate to="/login" replace />
  }
  
  if (userRole !== 'admin') {
    return <Navigate to="/announcements" replace />
  }
  
  return children
}
