import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    if (sectionId === 'home') {
      // Special handling for home - scroll to top of page
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setIsMenuOpen(false)
  }

  // No authentication needed for public website

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
    }`}>
      <nav className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <a 
              href="https://growexi.org/"
              className="flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity duration-300"
            >
              <h1 className="text-2xl font-bold gradient-text">
                GROWEXI
              </h1>
              <p className="text-xs text-neutral-600 -mt-1">Rwanda</p>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button
                onClick={() => scrollToSection('home')}
                className="text-neutral-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors duration-300"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-neutral-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors duration-300"
              >
                About
              </button>
              <Link
                to="/courses"
                className="text-neutral-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors duration-300"
              >
                Courses
              </Link>
              <Link
                to="/announcements"
                className="text-neutral-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors duration-300"
              >
                Announcements
              </Link>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-neutral-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors duration-300"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Right Controls */}
          <div className="hidden md:block">
            <div className="flex items-center gap-4">
              <Link to="/courses" className="btn-primary">
                Browse Courses
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-neutral-700 hover:text-primary-600 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-neutral-200">
            <button
              onClick={() => scrollToSection('home')}
              className="text-neutral-700 hover:text-primary-600 block px-3 py-2 text-base font-medium w-full text-left"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-neutral-700 hover:text-primary-600 block px-3 py-2 text-base font-medium w-full text-left"
            >
              About
            </button>
            <Link
              to="/courses"
              className="text-neutral-700 hover:text-primary-600 block px-3 py-2 text-base font-medium w-full text-left"
            >
              Courses
            </Link>
            <Link
              to="/announcements"
              className="text-neutral-700 hover:text-primary-600 block px-3 py-2 text-base font-medium w-full text-left"
            >
              Announcements
            </Link>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-neutral-700 hover:text-primary-600 block px-3 py-2 text-base font-medium w-full text-left"
            >
              Contact
            </button>
            <Link
              to="/courses"
              className="btn-primary w-full mt-4 text-center"
            >
              Browse Courses
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
