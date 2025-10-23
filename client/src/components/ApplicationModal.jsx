import React, { useState } from 'react'
import axios from 'axios'

const ApplicationModal = ({ course, onClose }) => {
  const [formData, setFormData] = useState({
    applicantName: '',
    applicantEmail: '',
    reasonForApplying: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/applications`, {
        course: course._id,
        ...formData
      })

      setSuccess(true)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit application')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-md w-full p-6 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-2xl font-bold text-neutral-900 mb-4">Application Submitted!</h3>
          <p className="text-neutral-600 mb-6">
            Thank you for your interest in <strong>{course.title}</strong>. 
            We'll review your application and get back to you soon.
          </p>
          <button
            onClick={onClose}
            className="btn-primary w-full"
          >
            Close
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-neutral-900">Apply for Course</h3>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-neutral-600 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-semibold text-neutral-900 mb-2">{course.title}</h4>
            <p className="text-neutral-600">{course.subtitle}</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="applicantName" className="block text-sm font-medium text-neutral-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="applicantName"
                name="applicantName"
                value={formData.applicantName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="applicantEmail" className="block text-sm font-medium text-neutral-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="applicantEmail"
                name="applicantEmail"
                value={formData.applicantEmail}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label htmlFor="reasonForApplying" className="block text-sm font-medium text-neutral-700 mb-2">
                Reason for Applying *
              </label>
              <textarea
                id="reasonForApplying"
                name="reasonForApplying"
                value={formData.reasonForApplying}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Tell us why you want to join this course and how it will help you achieve your goals..."
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ApplicationModal
