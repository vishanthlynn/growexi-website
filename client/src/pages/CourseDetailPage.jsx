import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import ApplicationModal from '../components/ApplicationModal'
import axios from 'axios'

const CourseDetailPage = () => {
  const { id } = useParams()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showApplicationModal, setShowApplicationModal] = useState(false)

  useEffect(() => {
    fetchCourse()
  }, [id])

  const fetchCourse = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/courses/${id}`)
      setCourse(response.data.data)
    } catch (err) {
      setError('Course not found')
      console.error('Error fetching course:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Header />
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-neutral-600">Loading course...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Header />
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-2xl font-semibold text-neutral-700 mb-2">Course Not Found</h2>
            <p className="text-neutral-500 mb-6">The course you're looking for doesn't exist.</p>
            <Link to="/courses" className="btn-primary">
              Browse All Courses
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      
      {/* Course Hero */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Link 
                to="/courses" 
                className="text-primary-600 hover:text-primary-700 font-medium mb-4 inline-flex items-center"
              >
                ← Back to Courses
              </Link>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              {course.title}
            </h1>
            <p className="text-xl text-neutral-600 mb-8">
              {course.subtitle}
            </p>
            
            <button
              onClick={() => setShowApplicationModal(true)}
              className="btn-primary text-lg px-8 py-4"
            >
              Apply Now
            </button>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-12">
                {/* Description */}
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-6">About This Course</h2>
                  <div className="prose prose-lg text-neutral-700">
                    <p className="whitespace-pre-line">{course.description}</p>
                  </div>
                </div>

                {/* What You'll Learn */}
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-6">What You'll Learn</h2>
                  <ul className="space-y-3">
                    {course.whatYoullLearn.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary-600 mr-3 mt-1">✓</span>
                        <span className="text-neutral-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Who Can Join */}
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-6">Who Can Join</h2>
                  <ul className="space-y-3">
                    {course.whoCanJoin.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-secondary-600 mr-3 mt-1">👥</span>
                        <span className="text-neutral-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Expected Outcome */}
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-6">Expected Outcome</h2>
                  <div className="bg-primary-50 rounded-lg p-6">
                    <p className="text-neutral-700">{course.outcome}</p>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-neutral-900 mb-4">Ready to Apply?</h3>
                    <p className="text-neutral-600 mb-6">
                      Join this transformative learning experience and take the next step in your career.
                    </p>
                    <button
                      onClick={() => setShowApplicationModal(true)}
                      className="btn-primary w-full text-center"
                    >
                      Apply Now
                    </button>
                    
                    <div className="mt-6 pt-6 border-t border-neutral-200">
                      <h4 className="font-semibold text-neutral-900 mb-3">Course Details</h4>
                      <div className="space-y-2 text-sm text-neutral-600">
                        <div className="flex justify-between">
                          <span>Status:</span>
                          <span className={`font-medium ${course.isActive ? 'text-green-600' : 'text-red-600'}`}>
                            {course.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Format:</span>
                          <span>Online</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Application Modal */}
      {showApplicationModal && (
        <ApplicationModal
          course={course}
          onClose={() => setShowApplicationModal(false)}
        />
      )}
    </div>
  )
}

export default CourseDetailPage
