"use client"
import React, { CSSProperties } from 'react'
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
import Spinner from 'react-bootstrap/Spinner';

const override: CSSProperties = {
  display: "flex",
  margin: "0 auto",
  justifyContent: "center",
  alignItems: "center"
};

const HomePage = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <section className="hero__v6 section" id="home">
        <div className="container d-flex justify-content-center align-items-center">
          <Spinner animation="border" role="status" variant='primary'>
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </section>
    )
  }
  return (
    <div>
      {/* <!-- ======= Site Wrap =======--> */}
      <div className="site-wrap">
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <FeaturesSection />
          <PricingSection />
          <HowItWorks />
          <ServiceSection />
          <TestimonialSection />
          <FAQ />
          <Contact />
          <Footer />
        </main>
      </div>

      {/* <!-- ======= Back to Top =======--> */}
      <button id="back-to-top"><i className="bi bi-arrow-up-short"></i></button>
      {/* <!-- End Back to top--> */}
    </div>
  )
}

export default HomePage