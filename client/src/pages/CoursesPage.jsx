import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import axios from 'axios'

const CoursesPage = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/courses`)
      setCourses(response.data.data)
    } catch (err) {
      setError('Failed to load courses')
      console.error('Error fetching courses:', err)
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
            <p className="mt-4 text-neutral-600">Loading courses...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Header />
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-red-600">{error}</p>
            <button 
              onClick={fetchCourses}
              className="mt-4 btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Our <span className="gradient-text">Courses</span>
            </h1>
            <p className="text-xl text-neutral-600 mb-8">
              Discover transformative learning opportunities designed to accelerate your career and personal growth in Rwanda's dynamic economy.
            </p>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16">
        <div className="container-custom">
          {courses.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-2xl font-semibold text-neutral-700 mb-2">No Courses Available</h3>
              <p className="text-neutral-500">Check back soon for new course offerings!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <div key={course._id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-neutral-600 mb-4 line-clamp-2">
                      {course.subtitle}
                    </p>
                    <p className="text-sm text-neutral-500 mb-4 line-clamp-3">
                      {course.description}
                    </p>
                    
                    {/* What You'll Learn Preview */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-neutral-700 mb-2">What You'll Learn:</h4>
                      <ul className="text-sm text-neutral-600 space-y-1">
                        {course.whatYoullLearn.slice(0, 2).map((item, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-primary-600 mr-2">✓</span>
                            {item}
                          </li>
                        ))}
                        {course.whatYoullLearn.length > 2 && (
                          <li className="text-neutral-500 text-xs">
                            +{course.whatYoullLearn.length - 2} more skills
                          </li>
                        )}
                      </ul>
                    </div>

                    <Link
                      to={`/courses/${course._id}`}
                      className="btn-primary w-full text-center block"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default CoursesPage
