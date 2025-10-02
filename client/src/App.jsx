import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AdminInquiries from './pages/AdminInquiries'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import AdminDashboard from './pages/AdminDashboard'
import ProtectedRoute from './components/ProtectedRoute'
import AnnouncementsPage from './pages/AnnouncementsPage'
import Marquee from './components/Marquee'

function App() {
  return (
    <Router>
      <div className="App">
        <Marquee />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin/inquiries" element={<AdminInquiries />} />
          <Route path="/announcements" element={<AnnouncementsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
