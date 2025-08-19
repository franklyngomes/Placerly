"use client"
import React from 'react'

const Contact = () => {
  return (
    <div>
      <section className="section contact__v2" id="contact">
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-6 col-lg-7 mx-auto text-center">
              <span
                className="subtitle text-uppercase mb-3"
                data-aos="fade-up"
                data-aos-delay="0"
              >Contact</span>
              <h2
                className="h2 fw-bold mb-3"
                data-aos="fade-up"
                data-aos-delay="0"
              >
                Contact Us
              </h2>
              <p data-aos="fade-up" data-aos-delay="100">
                Utilize our tools to develop your concepts and bring your
                vision to life. Once complete, effortlessly share your
                creations.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="d-flex gap-5 flex-column">
                <div
                  className="d-flex align-items-start gap-3"
                  data-aos="fade-up"
                  data-aos-delay="0"
                >
                  <div className="icon d-block">
                    <i className="bi bi-telephone"></i>
                  </div>
                  <span>
                    <span className="d-block">Phone</span><strong>+(01 234 567 890)</strong></span>
                </div>
                <div
                  className="d-flex align-items-start gap-3"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <div className="icon d-block"><i className="bi bi-send"></i></div>
                  <span>
                    <span className="d-block">Email</span><strong>info@mydomain.com</strong></span>
                </div>
                <div
                  className="d-flex align-items-start gap-3"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <div className="icon d-block">
                    <i className="bi bi-geo-alt"></i>
                  </div>
                  <span>
                    <span className="d-block">Address</span>
                    <address className="fw-bold">
                      123 Main Street Apt 4B Springfield, <br />
                      IL 62701 United States
                    </address></span>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div
                className="form-wrapper"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <form id="contactForm">
                  <div className="row gap-3 mb-3">
                    <div className="col-md-12">
                      <label className="mb-2" htmlFor="name">Name</label>
                      <input
                        className="form-control"
                        id="name"
                        type="text"
                        name="name"
                        required={true}
                      />
                    </div>
                    <div className="col-md-12">
                      <label className="mb-2" htmlFor="email">Email</label>
                      <input
                        className="form-control"
                        id="email"
                        type="email"
                        name="email"
                        required={true}
                      />
                    </div>
                  </div>
                  <div className="row gap-3 mb-3">
                    <div className="col-md-12">
                      <label className="mb-2" htmlFor="subject">Subject</label>
                      <input
                        className="form-control"
                        id="subject"
                        type="text"
                        name="subject"
                      />
                    </div>
                  </div>
                  <div className="row gap-3 gap-md-0 mb-3">
                    <div className="col-md-12">
                      <label className="mb-2" htmlFor="message">Message</label>
                      <textarea
                        className="form-control"
                        id="message"
                        name="message"
                        rows={5}
                        required={true}
                      ></textarea>
                    </div>
                  </div>
                  <button className="btn btn-primary fw-semibold" type="submit">
                    Send Message
                  </button>
                </form>
                <div
                  className="mt-3 d-none alert alert-success"
                  id="successMessage"
                >
                  Message sent successfully!
                </div>
                <div className="mt-3 d-none alert alert-danger" id="errorMessage">
                  Message sending failed. Please try again later.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact