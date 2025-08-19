"use client";
import React from "react";

const HeroSection = () => {
  return (
    <div>
      <section className="hero__v6 section" id="home">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="row">
                <div className="col-lg-11">
                  <span
                    className="hero-subtitle text-uppercase"
                    data-aos="fade-up"
                    data-aos-delay="0"
                  >
                    Innovative Fintech Solutions
                  </span>
                  <h1
                    className="hero-title mb-3"
                    data-aos="fade-up"
                    data-aos-delay="100"
                  >
                    Secure, Efficient, and User-Friendly Financial Services
                  </h1>
                  <p
                    className="hero-description mb-4 mb-lg-5"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    Experience the future of finance with our secure, efficient,
                    and user-friendly financial services.
                  </p>
                  <div
                    className="cta d-flex gap-2 mb-4 mb-lg-5"
                    data-aos="fade-up"
                    data-aos-delay="300"
                  >
                    <a className="btn" href="#">
                      Get Started Now
                    </a>
                    <a className="btn btn-white-outline" href="#">
                      Learn More
                      <svg
                        className="lucide lucide-arrow-up-right"
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M7 7h10v10"></path>
                        <path d="M7 17 17 7"></path>
                      </svg>
                    </a>
                  </div>
                  <div
                    className="logos mb-4"
                    data-aos="fade-up"
                    data-aos-delay="400"
                  >
                    <span className="logos-title text-uppercase mb-4 d-block">
                      Trusted by major companies worldwide
                    </span>
                    {/* <div className="logos-images d-flex gap-4 align-items-center">
                            <img
                              className="img-fluid js-img-to-inline-svg"
                              src="/assets/images/logo/actual-size/logo-air-bnb__black.svg"
                              alt="Company 1"
                              style={{ width: "110px" }}
                            /><img
                              className="img-fluid js-img-to-inline-svg"
                              src="/assets/images/logo/actual-size/logo-ibm__black.svg"
                              alt="Company 2"
                              style={{ width: "80px" }}
                            /><img
                              className="img-fluid js-img-to-inline-svg"
                              src="/assets/images/logo/actual-size/logo-google__black.svg"
                              alt="Company 3"
                              style={{ width: "110px" }}
                            />
                          </div> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-img">
                <img
                  className="img-card img-fluid"
                  src="/assets/images/card-expenses.png"
                  alt="Image card"
                  data-aos="fade-down"
                  data-aos-delay="600"
                />
                <img
                  className="img-main img-fluid rounded-4"
                  src="/assets/images/hero-img-1-min.jpg"
                  alt="Hero Image"
                  data-aos="fade-in"
                  data-aos-delay="500"
                />
              </div>
            </div>
          </div>
        </div>
        {/* <!-- End Hero--> */}
      </section>
    </div>
  );
};

export default HeroSection;
