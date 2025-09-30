import React from 'react'

const ServicesSection = () => {
  const services = [
    {
      title: 'Professional Development',
      icon: '💼',
      description: 'Enhance your professional skills and communication abilities',
      features: [
        'Negotiation & Business Communication',
        'Public Speaking & Presentation Skills',
        'Role-play simulations and real-world case studies',
        'Stage presence, storytelling, and visual design'
      ],
      ctaText: 'Enroll in Professional Development Programs',
      color: 'primary'
    },
    {
      title: 'Entrepreneurship & Business Growth',
      icon: '🚀',
      description: 'Build and scale your business with practical skills',
      features: [
        'Business Planning & Financial Literacy',
        'Sales Forecasting & Proposal Writing',
        'From ideation to investor-ready pitch decks',
        'Practical templates and peer-reviewed feedback'
      ],
      ctaText: 'Join Entrepreneurship Programs',
      color: 'secondary'
    },
    {
      title: 'Data Analysis & Digital Tools',
      icon: '📊',
      description: 'Master data-driven decision making and digital productivity',
      features: [
        'Statistical Software Training (Stata, R, Python, SPSS, Power BI)',
        'Digital Productivity Tools (Microsoft Office, SurveyCTO, CS Entry)',
        'Data visualization and interpretation',
        'Hands-on labs and project-based learning'
      ],
      ctaText: 'Sign Up for Data Analysis Training',
      color: 'accent'
    },
    {
      title: 'Research & Methodology',
      icon: '🔬',
      description: 'Develop rigorous research skills and academic writing',
      features: [
        'Qualitative & Quantitative Methods',
        'Thesis & Report Writing',
        'Grounded theory, ethnography, and survey design',
        'Structuring arguments, citations, and publication strategies'
      ],
      ctaText: 'Register for Research Training',
      color: 'primary'
    },
    {
      title: 'Digital Skills',
      icon: '💻',
      description: 'Stay ahead with cutting-edge digital technologies',
      features: [
        'Cybersecurity & Web Design',
        'Infographics & AI Tools',
        'Hands-on labs and project-based learning',
        'Communicating data visually and ethically'
      ],
      ctaText: 'Explore Digital Skills Courses',
      color: 'secondary'
    }
  ]

  const getColorClasses = (color) => {
    const colorMap = {
      primary: {
        bg: 'bg-primary-50',
        border: 'border-primary-200',
        text: 'text-primary-600',
        button: 'bg-primary-600 hover:bg-primary-700'
      },
      secondary: {
        bg: 'bg-secondary-50',
        border: 'border-secondary-200',
        text: 'text-secondary-600',
        button: 'bg-secondary-600 hover:bg-secondary-700'
      },
      accent: {
        bg: 'bg-accent-50',
        border: 'border-accent-200',
        text: 'text-accent-600',
        button: 'bg-accent-600 hover:bg-accent-700'
      }
    }
    return colorMap[color] || colorMap.primary
  }

  return (
    <section id="services" className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive training and development services designed to equip you with future-ready skills
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const colors = getColorClasses(service.color)
            return (
              <div
                key={index}
                className={`card p-8 ${colors.bg} ${colors.border} border-2 animate-fade-in`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Service Icon */}
                <div className="text-center mb-6">
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Features List */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-neutral-900 mb-4">
                    What You'll Learn:
                  </h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <span className={`w-2 h-2 ${colors.bg} ${colors.text} rounded-full mt-2 mr-3 flex-shrink-0`}></span>
                        <span className="text-neutral-600 text-sm leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => {
                    const contactSection = document.getElementById('contact')
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                  className={`w-full ${colors.button} text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-opacity-50 ${
                    service.color === 'primary' ? 'focus:ring-primary-200' :
                    service.color === 'secondary' ? 'focus:ring-secondary-200' :
                    'focus:ring-accent-200'
                  }`}
                >
                  {service.ctaText}
                </button>
              </div>
            )
          })}
        </div>

        {/* Call-to-Action Section */}
        <div className="bg-gradient-rwanda rounded-2xl p-8 md:p-12 text-center text-white">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Career?
          </h3>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of Rwandans who are building their future with GROWEXI. 
            Our programs are designed to give you the skills you need to thrive in today's economy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                const contactSection = document.getElementById('contact')
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="bg-white text-primary-600 hover:bg-neutral-100 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Get Started Today
            </button>
            <button
              onClick={() => {
                const contactSection = document.getElementById('contact')
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-all duration-300"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
