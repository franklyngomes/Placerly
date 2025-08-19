"use client"
import { FAQQuery } from '@/api/query/ClientQuery'
import React from 'react'

const FAQ = () => {
  const { data } = FAQQuery()
  const faq = data?.data
  return (
    <div>
      <section className="section faq__v2" id="faq">
        <div className="container">
          <div className="row mb-4">
            <div className="col-md-6 col-lg-7 mx-auto text-center">
              <span
                className="subtitle text-uppercase mb-3"
                data-aos="fade-up"
                data-aos-delay="0"
              >FAQ</span>
              <h2
                className="h2 fw-bold mb-3"
                data-aos="fade-up"
                data-aos-delay="0"
              >
                Frequently Asked Questions
              </h2>
              <p data-aos="fade-up" data-aos-delay="100">
                Utilize our tools to develop your concepts and bring your
                vision to life. Once complete, effortlessly share your
                creations.
              </p>
            </div>
          </div>
          <div className="row">
            <div
              className="col-md-8 mx-auto"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="faq-content">
                <div
                  className="accordion custom-accordion"
                  id="accordionPanelsStayOpenExample"
                >
                  {
                    faq?.map((item, index) => (
                      <div className="accordion-item" key={index}>
                        <h2 className="accordion-header">
                          <button
                            className={`accordion-button ${index === 0 ? "" : "collapsed"}`}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={index === 0 ? "#panelsStayOpen-collapseOne": index === 1 ? "#panelsStayOpen-collapseTwo" : index === 2 ? "#panelsStayOpen-collapseThree" : index === 3 ? "#panelsStayOpen-collapseFour" : "#panelsStayOpen-collapseFive" }
                            aria-expanded="false"
                            aria-controls={index === 0 ? "panelsStayOpen-collapseOne": index === 1 ? "panelsStayOpen-collapseTwo" : index === 2 ? "panelsStayOpen-collapseThree" : index === 3 ? "panelsStayOpen-collapseFour" : "panelsStayOpen-collapseFive" }
                          >
                            {item.question}
                          </button>
                        </h2>
                        <div
                          className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                          id={index === 0 ? "panelsStayOpen-collapseOne": index === 1 ? "panelsStayOpen-collapseTwo" : index === 2 ? "panelsStayOpen-collapseThree" : index === 3 ? "panelsStayOpen-collapseFour" : "panelsStayOpen-collapseFive" }
                        >
                          <div className="accordion-body">
                            {item.answer}
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- End FAQ--> */}
      </section>
    </div>
  )
}

export default FAQ