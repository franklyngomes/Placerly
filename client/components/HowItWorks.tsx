"use client";
import React from "react";

const HowItWorks = () => {
  return (
    <div>
      <section className="section howitworks__v1" id="how-it-works">
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-6 text-center mx-auto">
              <span
                className="subtitle text-uppercase mb-3"
                data-aos="fade-up"
                data-aos-delay="0"
              >
                How it works
              </span>
              <h2 data-aos="fade-up" data-aos-delay="100">
                How It Works
              </h2>
              <p data-aos="fade-up" data-aos-delay="200">
                Our platform is designed to make managing your finances simple
                and efficient. Follow these easy steps to get started:
              </p>
            </div>
          </div>
          <div className="row g-md-5">
            <div className="col-md-6 col-lg-3">
              <div
                className="step-card text-center h-100 d-flex flex-column justify-content-start position-relative"
                data-aos="fade-up"
                data-aos-delay="0"
              >
                <div data-aos="fade-right" data-aos-delay="500">
                  <img
                    className="arch-line"
                    src="/assets/images/arch-line.svg"
                    alt="FreeBootstrap.net image placeholder"
                  />
                </div>
                <span className="step-number rounded-circle text-center fw-bold mb-5 mx-auto">
                  1
                </span>
                <div>
                  <h3 className="fs-5 mb-4">Sign Up</h3>
                  <p>
                    Visit our website or download our app to sign up. Provide
                    basic information to set up your secure account.
                  </p>
                </div>
              </div>
            </div>
            <div
              className="col-md-6 col-lg-3"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <div className="step-card reverse text-center h-100 d-flex flex-column justify-content-start position-relative">
                <div data-aos="fade-right" data-aos-delay="1100">
                  <img
                    className="arch-line reverse"
                    src="/assets/images/arch-line-reverse.svg"
                    alt="FreeBootstrap.net image placeholder"
                  />
                </div>
                <span className="step-number rounded-circle text-center fw-bold mb-5 mx-auto">
                  2
                </span>
                <h3 className="fs-5 mb-4">Set Up Your Profile</h3>
                <p>
                  Add your personal or business details to tailor the platform
                  to your specific needs.
                </p>
              </div>
            </div>
            <div
              className="col-md-6 col-lg-3"
              data-aos="fade-up"
              data-aos-delay="1200"
            >
              <div className="step-card text-center h-100 d-flex flex-column justify-content-start position-relative">
                <div data-aos="fade-right" data-aos-delay="1700">
                  <img
                    className="arch-line"
                    src="/assets/images/arch-line.svg"
                    alt="FreeBootstrap.net image placeholder"
                  />
                </div>
                <span className="step-number rounded-circle text-center fw-bold mb-5 mx-auto">
                  3
                </span>
                <h3 className="fs-5 mb-4">Explore Features</h3>
                <p>
                  Access your dashboard for a summary of your finances:
                  balances, recent transactions, and insights.
                </p>
              </div>
            </div>
            <div
              className="col-md-6 col-lg-3"
              data-aos="fade-up"
              data-aos-delay="1800"
            >
              <div className="step-card last text-center h-100 d-flex flex-column justify-content-start position-relative">
                <span className="step-number rounded-circle text-center fw-bold mb-5 mx-auto">
                  4
                </span>
                <div>
                  <h3 className="fs-5 mb-4">Invest and Grow</h3>
                  <p>
                    Discover a variety of investment opportunities tailored to
                    your financial goals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
