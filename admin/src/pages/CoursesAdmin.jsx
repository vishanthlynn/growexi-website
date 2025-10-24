import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getApiUrl } from '../utils/api'

const CoursesAdmin = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingCourse, setEditingCourse] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    whatYoullLearn: [''],
    whoCanJoin: [''],
    outcome: '',
    isActive: true,
    courseMaterialsLink: ''
  })

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const response = await axios.get(getApiUrl('/api/courses/admin/all'))
      setCourses(response.data.data)
    } catch (error) {
      console.error('Error fetching courses:', error)
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

  const handleArrayChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }))
  }

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }))
  }

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingCourse) {
        await axios.put(getApiUrl(`/api/courses/admin/${editingCourse._id}`), formData)
      } else {
        await axios.post(getApiUrl('/api/courses/admin'), formData)
      }
      
      setShowForm(false)
      setEditingCourse(null)
      setFormData({
        title: '',
        subtitle: '',
        description: '',
        whatYoullLearn: [''],
        whoCanJoin: [''],
        outcome: '',
        isActive: true,
        courseMaterialsLink: ''
      })
      fetchCourses()
    } catch (error) {
      console.error('Error saving course:', error)
    }
  }

  const handleEdit = (course) => {
    setEditingCourse(course)
    setFormData({
      title: course.title,
      subtitle: course.subtitle,
      description: course.description,
      whatYoullLearn: course.whatYoullLearn,
      whoCanJoin: course.whoCanJoin,
      outcome: course.outcome,
      isActive: course.isActive,
      courseMaterialsLink: course.courseMaterialsLink
    })
    setShowForm(true)
  }

  const handleDelete = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await axios.delete(getApiUrl(`/api/courses/admin/${courseId}`))
        fetchCourses()
      } catch (error) {
        console.error('Error deleting course:', error)
      }
    }
  }

  const resetForm = () => {
    setShowForm(false)
    setEditingCourse(null)
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      whatYoullLearn: [''],
      whoCanJoin: [''],
      outcome: '',
      isActive: true,
      courseMaterialsLink: ''
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
          <h1 className="text-2xl font-bold text-neutral-900">Courses Management</h1>
          <p className="text-neutral-600">Manage your course offerings</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary"
        >
          Add New Course
        </button>
      </div>

      {showForm && (
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-neutral-900 mb-4">
            {editingCourse ? 'Edit Course' : 'Add New Course'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Subtitle</label>
                <input
                  type="text"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={3}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">What You'll Learn</label>
              {formData.whatYoullLearn.map((item, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleArrayChange('whatYoullLearn', index, e.target.value)}
                    className="input-field flex-1"
                    placeholder="Enter learning outcome"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem('whatYoullLearn', index)}
                    className="btn-danger px-3"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('whatYoullLearn')}
                className="btn-outline text-sm"
              >
                + Add Learning Outcome
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Who Can Join</label>
              {formData.whoCanJoin.map((item, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleArrayChange('whoCanJoin', index, e.target.value)}
                    className="input-field flex-1"
                    placeholder="Enter target audience"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem('whoCanJoin', index)}
                    className="btn-danger px-3"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('whoCanJoin')}
                className="btn-outline text-sm"
              >
                + Add Target Audience
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Expected Outcome</label>
              <textarea
                name="outcome"
                value={formData.outcome}
                onChange={handleChange}
                required
                rows={3}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Course Materials Link</label>
              <input
                type="url"
                name="courseMaterialsLink"
                value={formData.courseMaterialsLink}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="https://..."
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="mr-2"
              />
              <label className="text-sm text-neutral-700">Course is active</label>
            </div>

            <div className="flex gap-3">
              <button type="submit" className="btn-primary">
                {editingCourse ? 'Update Course' : 'Create Course'}
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
          <h3 className="text-lg font-semibold text-neutral-900">All Courses</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {courses.map((course) => (
                <tr key={course._id}>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-neutral-900">{course.title}</div>
                      <div className="text-sm text-neutral-500">{course.subtitle}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      course.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {course.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(course)}
                        className="text-primary-600 hover:text-primary-900 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(course._id)}
                        className="text-red-600 hover:text-red-900 text-sm"
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
    </div>
  )
}

export default CoursesAdmin
