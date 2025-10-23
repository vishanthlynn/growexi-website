import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AnnouncementsPage from './pages/AnnouncementsPage'
import CoursesPage from './pages/CoursesPage'
import CourseDetailPage from './pages/CourseDetailPage'
import Marquee from './components/Marquee'

function App() {
  return (
    <Router>
      <div className="App">
        <Marquee />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/announcements" element={<AnnouncementsPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:id" element={<CourseDetailPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
