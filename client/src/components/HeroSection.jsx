import React from 'react'

const HeroSection = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-rwanda">
      {/* Background Pattern */}
      <div className="absolute inset-0 rwanda-pattern opacity-10"></div>
      
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600/90 via-secondary-600/80 to-accent-500/70"></div>
      
      {/* Content */}
      <div className="relative z-10 container-custom text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in">
            Welcome to{' '}
            <span className="text-accent-300">GROWEXI</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-4 font-light animate-fade-in animation-delay-200">
            Growing Rwanda's Opportunities & Workforce Expertise and Innovation
          </p>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in animation-delay-400">
            We are a transformative learning and innovation hub committed to equipping Rwandans with future-ready skills across multiple sectors. Explore our programs, meet our team, and join us in building a knowledge-based economy for Rwanda.
          </p>
          
          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in animation-delay-600">
            <button
              onClick={() => scrollToSection('services')}
              className="btn-primary bg-white text-primary-600 hover:bg-neutral-100 px-8 py-4 text-lg font-semibold shadow-xl"
            >
              Join a Program
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="btn-outline border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 text-lg font-semibold"
            >
              Book a Workshop
            </button>
          </div>
          
          {/* Mission Statement */}
          <div className="mt-16 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 animate-fade-in animation-delay-800">
            <h3 className="text-2xl font-semibold text-white mb-3">
              Our Mission
            </h3>
            <p className="text-lg text-white/90">
              To empower <span className="font-bold text-accent-300">5,000 learners</span> in{' '}
              <span className="font-bold text-accent-300">5 years</span> through accessible, relevant, and high-impact training
            </p>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-gentle">
        <button
          onClick={() => scrollToSection('about')}
          className="flex flex-col items-center text-white/70 hover:text-white transition-colors duration-300"
        >
          <span className="text-sm mb-2">Scroll to explore</span>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </button>
      </div>
    </section>
  )
}

export default HeroSection
