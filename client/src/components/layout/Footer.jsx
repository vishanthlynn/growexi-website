import React from 'react'

const Footer = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const quickLinks = [
    { name: 'Home', section: 'home' },
    { name: 'About', section: 'about' },
    { name: 'Services', section: 'services' },
    { name: 'Impact', section: 'impact' },
    { name: 'Contact', section: 'contact' }
  ]

  const services = [
    'Professional Development',
    'Entrepreneurship & Business Growth',
    'Data Analysis & Digital Tools',
    'Research & Methodology',
    'Digital Skills'
  ]

  const socialLinks = [
    { name: 'Facebook', url: 'https://facebook.com/GROWEXI', icon: '📘' },
    { name: 'Twitter', url: 'https://twitter.com/GROWEXI', icon: '🐦' },
    { name: 'LinkedIn', url: 'https://linkedin.com/company/growexi', icon: '💼' },
    { name: 'Instagram', url: 'https://instagram.com/growexi', icon: '📷' }
  ]

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                    GROWEXI
                  </span>
                </h3>
                <p className="text-sm text-neutral-400 mb-2">Rwanda</p>
                <p className="text-neutral-300 leading-relaxed">
                  Growing Rwanda's Opportunities & Workforce Expertise and Innovation. 
                  Empowering 5,000 learners in 5 years through accessible, relevant, and high-impact training.
                </p>
              </div>
              
              {/* Mission Statement */}
              <div className="bg-neutral-800 rounded-lg p-4 mb-6">
                <h4 className="text-sm font-semibold text-primary-400 mb-2">
                  Our Mission
                </h4>
                <p className="text-xs text-neutral-300">
                  To become Rwanda's leading center for lifelong learning and professional growth.
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(link.section)}
                      className="text-neutral-300 hover:text-primary-400 transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Our Services</h4>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection('services')}
                      className="text-neutral-300 hover:text-primary-400 transition-colors duration-300 text-sm text-left"
                    >
                      {service}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-neutral-300 mb-1">Email</p>
                  <a
                    href="mailto:info@growexi.rw"
                    className="text-primary-400 hover:text-primary-300 transition-colors duration-300 text-sm"
                  >
                    info@growexi.rw
                  </a>
                </div>
                
                <div>
                  <p className="text-sm text-neutral-300 mb-1">Phone</p>
                  <a
                    href="tel:+250781184517"
                    className="text-primary-400 hover:text-primary-300 transition-colors duration-300 text-sm"
                  >
                    +250 781184517
                  </a>
                </div>
                
                <div>
                  <p className="text-sm text-neutral-300 mb-1">Address</p>
                  <p className="text-neutral-300 text-sm">
                    Norrsken House Kigali<br />
                    Kigali, Rwanda
                  </p>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-6">
                <h5 className="text-sm font-semibold mb-3">Follow Us</h5>
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-8 h-8 bg-neutral-800 hover:bg-primary-600 text-neutral-400 hover:text-white rounded-lg transition-all duration-300 transform hover:scale-110"
                      title={social.name}
                    >
                      <span className="text-sm">{social.icon}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-neutral-400 mb-4 md:mb-0">
              © {new Date().getFullYear()} GROWEXI Rwanda. All rights reserved.<br />
              <span className="text-xs text-neutral-500">Designed and developed by Vishanth Dandu GROWEXI</span>
            </div>
            
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <div className="flex items-center text-sm text-neutral-400">
                <span className="mr-2">🇷🇼</span>
                Proudly serving Rwanda
              </div>
              
              <div className="flex space-x-4 text-sm">
                <button className="text-neutral-400 hover:text-primary-400 transition-colors duration-300">
                  Privacy Policy
                </button>
                <button className="text-neutral-400 hover:text-primary-400 transition-colors duration-300">
                  Terms of Service
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Vision 2050 Footer Note */}
        <div className="border-t border-neutral-800 py-4">
          <div className="text-center">
            <p className="text-xs text-neutral-500">
              Aligned with Rwanda's Vision 2050 and the National Strategy for Transformation (NST)
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
