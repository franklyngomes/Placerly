"use client"
import React from 'react'
import Navbar from './layout/Navbar'
import HeroSection from './HeroSection'
import AboutSection from './AboutSection'
import FeaturesSection from './FeaturesSection'
import PricingSection from './PricingSection'
import HowItWorks from './HowItWorks'
import ServiceSection from './ServiceSection'
import TestimonialSection from './TestimonialSection'
import FAQ from './FAQ'
import Contact from './Contact'
import Footer from './layout/Footer'

const HomePage = () => {
  return (
    <div>
      {/* <!-- ======= Site Wrap =======--> */}
        <div className="site-wrap">
          <Navbar/>
          <main>
            <HeroSection/>
            <AboutSection/>
            <FeaturesSection/>
            <PricingSection/>
            <HowItWorks/>
            <ServiceSection/>
            <TestimonialSection/>
            <FAQ/>
            <Contact/>
            <Footer/>
          </main>
        </div>

        {/* <!-- ======= Back to Top =======--> */}
        <button id="back-to-top"><i className="bi bi-arrow-up-short"></i></button>
        {/* <!-- End Back to top--> */}
    </div>
  )
}

export default HomePage