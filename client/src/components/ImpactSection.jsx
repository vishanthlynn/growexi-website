import React from 'react'

const ImpactSection = () => {
  const testimonials = [
    {
      name: 'Marie Uwimana',
      role: 'Data Analyst',
      company: 'Bank of Kigali',
      image: '👩‍💼',
      quote: 'The data analysis training at GROWEXI transformed my career. I went from basic Excel skills to advanced Python programming in just 6 months.',
      service: 'Data Analysis & Digital Tools'
    },
    {
      name: 'Jean Paul Nkurunziza',
      role: 'Entrepreneur',
      company: 'Tech Startup',
      image: '👨‍💻',
      quote: 'The entrepreneurship program gave me the confidence and skills to launch my tech startup. The mentorship was invaluable.',
      service: 'Entrepreneurship & Business Growth'
    },
    {
      name: 'Grace Mukamana',
      role: 'Research Coordinator',
      company: 'University of Rwanda',
      image: '👩‍🔬',
      quote: 'The research methodology training helped me complete my PhD thesis successfully. The quality of instruction was exceptional.',
      service: 'Research & Methodology'
    },
    {
      name: 'David Rukundo',
      role: 'Public Relations Manager',
      company: 'Rwanda Development Board',
      image: '👨‍💼',
      quote: 'The professional development program improved my presentation skills dramatically. I now confidently lead board meetings.',
      service: 'Professional Development'
    }
  ]

  const successMetrics = [
    {
      number: '500+',
      label: 'Learners Trained',
      description: 'Across all programs in our first year'
    },
    {
      number: '80%',
      label: 'Employment Success',
      description: 'Of graduates report improved prospects'
    },
    {
      number: '15+',
      label: 'University Partnerships',
      description: 'Leading Rwandan institutions'
    },
    {
      number: '50+',
      label: 'Corporate Clients',
      description: 'Trust us for their training needs'
    }
  ]

  return (
    <section id="impact" className="section-padding bg-neutral-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            Our <span className="gradient-text">Impact</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Real stories of transformation and measurable results that make a difference
          </p>
        </div>

        {/* Success Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {successMetrics.map((metric, index) => (
            <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                  {metric.number}
                </div>
                <div className="text-lg font-semibold text-neutral-900 mb-2">
                  {metric.label}
                </div>
                <div className="text-sm text-neutral-600">
                  {metric.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Success Stories */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-neutral-900 mb-12">
            Success Stories
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card p-8 animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
                <div className="flex items-start mb-6">
                  <div className="text-4xl mr-4">{testimonial.image}</div>
                  <div>
                    <h4 className="text-lg font-semibold text-neutral-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-primary-600 font-medium">
                      {testimonial.role}
                    </p>
                    <p className="text-neutral-600 text-sm">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
                
                <blockquote className="text-neutral-700 leading-relaxed mb-4 italic">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-500">
                    Program: {testimonial.service}
                  </span>
                  <div className="flex text-accent-500">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>⭐</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Future Vision */}
        <div className="bg-gradient-rwanda rounded-2xl p-8 md:p-12 text-center text-white">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            Our Vision for 2025
          </h3>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            By 2025, we aim to train 5,000 learners across Rwanda, creating a ripple effect that transforms communities and drives national development.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="animate-fade-in">
              <div className="text-4xl font-bold text-accent-300 mb-2">5,000</div>
              <div className="text-lg font-semibold">Target Learners</div>
              <div className="text-white/80 text-sm mt-2">
                Across all programs by 2025
              </div>
            </div>
            
            <div className="animate-fade-in animation-delay-200">
              <div className="text-4xl font-bold text-accent-300 mb-2">30</div>
              <div className="text-lg font-semibold">Districts</div>
              <div className="text-white/80 text-sm mt-2">
                Reaching every corner of Rwanda
              </div>
            </div>
            
            <div className="animate-fade-in animation-delay-400">
              <div className="text-4xl font-bold text-accent-300 mb-2">100</div>
              <div className="text-lg font-semibold">Partners</div>
              <div className="text-white/80 text-sm mt-2">
                Universities, companies, and organizations
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ImpactSection
