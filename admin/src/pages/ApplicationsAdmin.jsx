import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getApiUrl } from '../utils/api'

const ApplicationsAdmin = () => {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      const response = await axios.get(getApiUrl('/api/applications/admin/all'))
      setApplications(response.data.data)
    } catch (error) {
      console.error('Error fetching applications:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      await axios.put(getApiUrl(`/api/applications/admin/${applicationId}/status`), {
        status: newStatus
      })
      fetchApplications()
    } catch (error) {
      console.error('Error updating application status:', error)
    }
  }

  const handleDelete = async (applicationId) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        await axios.delete(getApiUrl(`/api/applications/admin/${applicationId}`))
        fetchApplications()
      } catch (error) {
        console.error('Error deleting application:', error)
      }
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'Accepted':
        return 'bg-green-100 text-green-800'
      case 'Rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Applications Management</h1>
        <p className="text-neutral-600">Review and manage course applications</p>
      </div>

      <div className="card">
        <div className="p-6 border-b border-neutral-200">
          <h3 className="text-lg font-semibold text-neutral-900">All Applications</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Course</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Applicant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Payment Proof</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Applied</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {applications.map((application) => (
                <tr key={application._id}>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-neutral-900">
                      {application.course?.title || 'Course not found'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-neutral-900">{application.applicantName}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-neutral-600">{application.applicantEmail}</div>
                  </td>
                  <td className="px-6 py-4">
                    {application.paymentScreenshotUrl ? (
                      <a 
                        href={application.paymentScreenshotUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm underline"
                      >
                        View Screenshot
                      </a>
                    ) : (
                      <span className="text-sm text-neutral-400">No screenshot</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(application.status)}`}>
                      {application.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-neutral-500">
                      {new Date(application.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <select
                        value={application.status}
                        onChange={(e) => handleStatusChange(application._id, e.target.value)}
                        className="text-xs border border-neutral-300 rounded px-2 py-1"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                      <button
                        onClick={() => handleDelete(application._id)}
                        className="text-red-600 hover:text-red-900 text-xs"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {applications.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-lg font-semibold text-neutral-700 mb-2">No Applications Yet</h3>
          <p className="text-neutral-500">Applications will appear here once students start applying for courses.</p>
        </div>
      )}
    </div>
  )
}

export default ApplicationsAdmin
