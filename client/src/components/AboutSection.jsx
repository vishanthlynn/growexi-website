import React from 'react'

const AboutSection = () => {
  const coreValues = [
    {
      title: 'Inclusion',
      description: 'Ensuring access to skills and opportunities for all, regardless of background',
      icon: '👥'
    },
    {
      title: 'Innovation',
      description: 'Driving creative solutions and adopting cutting-edge technologies',
      icon: '💡'
    },
    {
      title: 'Practicality',
      description: 'Offering market-relevant training with real-world applications',
      icon: '🎯'
    },
    {
      title: 'Impact',
      description: 'Focusing on measurable results that improve lives and communities',
      icon: '📈'
    }
  ]

  const impactMetrics = [
    { number: '500+', label: 'Learners Trained' },
    { number: '80%', label: 'Employment Success Rate' },
    { number: '5', label: 'Service Categories' },
    { number: '1000+', label: 'Hours of Training' }
  ]

  return (
    <section id="about" className="section-padding bg-neutral-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            About <span className="gradient-text">GROWEXI</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Bridging the gap between education and market needs in Rwanda
          </p>
        </div>

        {/* Company Story */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="animate-slide-up">
            <h3 className="text-3xl font-bold text-neutral-900 mb-6">
              Our Story
            </h3>
            <div className="space-y-4 text-neutral-600 leading-relaxed">
              <p>
                GROWEXI (Growing Rwanda's Opportunities & Workforce Expertise and Innovation) was founded to bridge the gap between education and market needs in Rwanda. Inspired by the country's Vision 2050, GROWEXI equips individuals with future-ready skills and practical knowledge that drive inclusive economic growth.
              </p>
              <p>
                The initiative was co-founded by <strong className="text-primary-600">Jean Claude Niyonsenga</strong> and <strong className="text-primary-600">Emmanuel Bigirimana</strong>, who share a passion for workforce development, innovation, and social impact.
              </p>
              <p>
                Through its inclusive approach, GROWEXI reaches underserved communities and creates opportunities for youth, women, and rural populations to thrive in Rwanda's knowledge-based economy.
              </p>
            </div>
          </div>
          
          <div className="relative animate-slide-up animation-delay-200">
            <div className="bg-gradient-rwanda rounded-2xl p-8 text-white">
              <h4 className="text-2xl font-bold mb-4">Vision 2050 Alignment</h4>
              <p className="text-white/90 leading-relaxed">
                Our work directly supports Rwanda's Vision 2050 and the National Strategy for Transformation (NST), focusing on building a competitive workforce and fostering innovation across all sectors.
              </p>
            </div>
            {/* Decorative element */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent-500 rounded-full animate-pulse-soft"></div>
          </div>
        </div>

        {/* Impact Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {impactMetrics.map((metric, index) => (
            <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                  {metric.number}
                </div>
                <div className="text-neutral-600 font-medium">
                  {metric.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center text-neutral-900 mb-12">
            Our Core Values
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <div key={index} className="card p-6 text-center animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
                <div className="text-4xl mb-4">{value.icon}</div>
                <h4 className="text-xl font-bold text-neutral-900 mb-3">
                  {value.title}
                </h4>
                <p className="text-neutral-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Strategic Partnerships */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-neutral-900 mb-4">
              Strategic Partnerships
            </h3>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              GROWEXI collaborates with universities, government institutions, and private sector partners to design industry-aligned programs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏛️</span>
              </div>
              <h4 className="text-lg font-semibold text-neutral-900 mb-2">
                Government Institutions
              </h4>
              <p className="text-neutral-600">
                Aligned with national development strategies
              </p>
            </div>
            
            <div className="animate-fade-in animation-delay-200">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎓</span>
              </div>
              <h4 className="text-lg font-semibold text-neutral-900 mb-2">
                Educational Institutions
              </h4>
              <p className="text-neutral-600">
                Rwandan universities and innovation hubs
              </p>
            </div>
            
            <div className="animate-fade-in animation-delay-400">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h4 className="text-lg font-semibold text-neutral-900 mb-2">
                International Organizations
              </h4>
              <p className="text-neutral-600">
                Building a competitive workforce ecosystem
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
