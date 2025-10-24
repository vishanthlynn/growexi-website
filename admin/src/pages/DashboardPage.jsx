import React, { useState, useEffect } from 'react'
import axios from 'axios'

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalApplications: 0,
    pendingApplications: 0,
    acceptedApplications: 0,
    rejectedApplications: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [coursesRes, applicationsRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL || 'https://growexi-api.onrender.com'}/api/courses/admin/all`),
        axios.get(`${import.meta.env.VITE_API_URL || 'https://growexi-api.onrender.com'}/api/applications/admin/all`)
      ])

      const courses = coursesRes.data.data
      const applications = applicationsRes.data.data

      const pendingApplications = applications.filter(app => app.status === 'Pending').length
      const acceptedApplications = applications.filter(app => app.status === 'Accepted').length
      const rejectedApplications = applications.filter(app => app.status === 'Rejected').length

      setStats({
        totalCourses: courses.length,
        totalApplications: applications.length,
        pendingApplications,
        acceptedApplications,
        rejectedApplications
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  const statCards = [
    {
      title: 'Total Courses',
      value: stats.totalCourses,
      icon: '📚',
      color: 'bg-blue-500'
    },
    {
      title: 'Total Applications',
      value: stats.totalApplications,
      icon: '📝',
      color: 'bg-green-500'
    },
    {
      title: 'Pending Applications',
      value: stats.pendingApplications,
      icon: '⏳',
      color: 'bg-yellow-500'
    },
    {
      title: 'Accepted Applications',
      value: stats.acceptedApplications,
      icon: '✅',
      color: 'bg-green-600'
    },
    {
      title: 'Rejected Applications',
      value: stats.rejectedApplications,
      icon: '❌',
      color: 'bg-red-500'
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
        <p className="text-neutral-600">Overview of your GROWEXI admin panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="card p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.color} text-white text-2xl`}>
                {stat.icon}
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-600">{stat.title}</p>
                <p className="text-2xl font-bold text-neutral-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <a href="/courses" className="block w-full btn-primary text-center">
              Manage Courses
            </a>
            <a href="/applications" className="block w-full btn-secondary text-center">
              Review Applications
            </a>
            <a href="/announcements" className="block w-full btn-outline text-center">
              Manage Announcements
            </a>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center text-sm text-neutral-600">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              System is running normally
            </div>
            <div className="flex items-center text-sm text-neutral-600">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              {stats.pendingApplications} applications pending review
            </div>
            <div className="flex items-center text-sm text-neutral-600">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
              {stats.totalCourses} courses available
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
