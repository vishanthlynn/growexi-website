import React from 'react'
import Header from '../components/layout/Header'
import HeroSection from '../components/HeroSection'
import AboutSection from '../components/AboutSection'
import ServicesSection from '../components/ServicesSection'
import ImpactSection from '../components/ImpactSection'
import ContactSection from '../components/ContactSection'
import Footer from '../components/layout/Footer'

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ImpactSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

export default HomePage
