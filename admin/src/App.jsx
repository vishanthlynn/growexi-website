import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import DashboardLayout from './components/DashboardLayout'
import DashboardPage from './pages/DashboardPage'
import CoursesAdmin from './pages/CoursesAdmin'
import ApplicationsAdmin from './pages/ApplicationsAdmin'
import AnnouncementsAdmin from './pages/AnnouncementsAdmin'
import { AuthProvider, useAuth } from './utils/AuthContext'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={
            <ProtectedRoute>
              <DashboardLayout>
                <DashboardPage />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/courses" element={
            <ProtectedRoute>
              <DashboardLayout>
                <CoursesAdmin />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/applications" element={
            <ProtectedRoute>
              <DashboardLayout>
                <ApplicationsAdmin />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/announcements" element={
            <ProtectedRoute>
              <DashboardLayout>
                <AnnouncementsAdmin />
              </DashboardLayout>
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
