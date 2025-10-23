import React, { useState, useEffect } from 'react'
import axios from 'axios'

const AnnouncementsAdmin = () => {
  const [announcements, setAnnouncements] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingAnnouncement, setEditingAnnouncement] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    isMarquee: false
  })

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/announcements`)
      setAnnouncements(response.data.data)
    } catch (error) {
      console.error('Error fetching announcements:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingAnnouncement) {
        await axios.put(`${import.meta.env.VITE_API_URL}/api/announcements/${editingAnnouncement._id}`, formData)
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/announcements`, formData)
      }
      
      setShowForm(false)
      setEditingAnnouncement(null)
      setFormData({
        title: '',
        content: '',
        isMarquee: false
      })
      fetchAnnouncements()
    } catch (error) {
      console.error('Error saving announcement:', error)
    }
  }

  const handleEdit = (announcement) => {
    setEditingAnnouncement(announcement)
    setFormData({
      title: announcement.title,
      content: announcement.content,
      isMarquee: announcement.isMarquee
    })
    setShowForm(true)
  }

  const handleDelete = async (announcementId) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/announcements/${announcementId}`)
        fetchAnnouncements()
      } catch (error) {
        console.error('Error deleting announcement:', error)
      }
    }
  }

  const resetForm = () => {
    setShowForm(false)
    setEditingAnnouncement(null)
    setFormData({
      title: '',
      content: '',
      isMarquee: false
    })
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Announcements Management</h1>
          <p className="text-neutral-600">Manage site announcements and marquee messages</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary"
        >
          Add New Announcement
        </button>
      </div>

      {showForm && (
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-neutral-900 mb-4">
            {editingAnnouncement ? 'Edit Announcement' : 'Add New Announcement'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="Enter announcement title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Content</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows={4}
                className="input-field"
                placeholder="Enter announcement content"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="isMarquee"
                checked={formData.isMarquee}
                onChange={handleChange}
                className="mr-2"
              />
              <label className="text-sm text-neutral-700">
                Show as marquee on homepage (only one marquee can be active at a time)
              </label>
            </div>

            <div className="flex gap-3">
              <button type="submit" className="btn-primary">
                {editingAnnouncement ? 'Update Announcement' : 'Create Announcement'}
              </button>
              <button type="button" onClick={resetForm} className="btn-outline">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="card">
        <div className="p-6 border-b border-neutral-200">
          <h3 className="text-lg font-semibold text-neutral-900">All Announcements</h3>
        </div>
        <div className="divide-y divide-neutral-200">
          {announcements.map((announcement) => (
            <div key={announcement._id} className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-lg font-semibold text-neutral-900">{announcement.title}</h4>
                    {announcement.isMarquee && (
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-primary-100 text-primary-800">
                        Marquee
                      </span>
                    )}
                  </div>
                  <p className="text-neutral-600 mb-2">{announcement.content}</p>
                  <p className="text-sm text-neutral-500">
                    Created: {new Date(announcement.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => handleEdit(announcement)}
                    className="text-primary-600 hover:text-primary-900 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(announcement._id)}
                    className="text-red-600 hover:text-red-900 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {announcements.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📢</div>
          <h3 className="text-lg font-semibold text-neutral-700 mb-2">No Announcements Yet</h3>
          <p className="text-neutral-500">Create your first announcement to keep users informed.</p>
        </div>
      )}
    </div>
  )
}

export default AnnouncementsAdmin
