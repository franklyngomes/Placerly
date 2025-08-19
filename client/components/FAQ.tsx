"use client"
import React from 'react'

const FAQ = () => {
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
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseOne"
                        aria-expanded="true"
                        aria-controls="panelsStayOpen-collapseOne"
                      >
                        What services does your web agency offer?
                      </button>
                    </h2>
                    <div
                      className="accordion-collapse collapse show"
                      id="panelsStayOpen-collapseOne"
                    >
                      <div className="accordion-body">
                        Our web agency offers a comprehensive range of
                        services including web design and development,
                        e-commerce solutions, SEO optimization, content
                        creation, website maintenance, and digital marketing
                        strategies. We tailor our services to meet the unique
                        needs of each client, ensuring a customized approach
                        to every project.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseTwo"
                        aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseTwo"
                      >
                        How much does it cost to build a website?
                      </button>
                    </h2>
                    <div
                      className="accordion-collapse collapse"
                      id="panelsStayOpen-collapseTwo"
                    >
                      <div className="accordion-body">
                        The cost of building a website can vary widely
                        depending on the complexity, features, and specific
                        requirements of your project. We offer several pricing
                        packages to accommodate different budgets and needs.
                        After an initial consultation, we can provide a
                        detailed quote based on your specific goals and
                        objectives.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseThree"
                        aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseThree"
                      >
                        How long does it take to design and develop a website?
                      </button>
                    </h2>
                    <div
                      className="accordion-collapse collapse"
                      id="panelsStayOpen-collapseThree"
                    >
                      <div className="accordion-body">
                        The timeline for designing and developing a website
                        depends on the project&apos;s complexity and scope.
                        Typically, a standard business website takes about 4-6
                        weeks to complete, while more complex projects like
                        e-commerce sites or custom applications may take
                        longer. We work closely with our clients to establish
                        a realistic timeline and keep you informed throughout
                        the process.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseFour"
                        aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseFour"
                      >
                        Will my website be mobile-friendly?
                      </button>
                    </h2>
                    <div
                      className="accordion-collapse collapse"
                      id="panelsStayOpen-collapseFour"
                    >
                      <div className="accordion-body">
                        Absolutely! All the websites we design and develop are
                        fully responsive, meaning they are optimized to work
                        seamlessly across all devices, including desktops,
                        tablets, and smartphones. Ensuring a great user
                        experience on mobile devices is a top priority in our
                        development process.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseFive"
                        aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseFive"
                      >
                        Do you provide ongoing support and maintenance for
                        websites?
                      </button>
                    </h2>
                    <div
                      className="accordion-collapse collapse"
                      id="panelsStayOpen-collapseFive"
                    >
                      <div className="accordion-body">
                        Yes, we offer ongoing support and maintenance services
                        to ensure your website remains up-to-date, secure, and
                        functioning smoothly. Our maintenance packages can
                        include regular updates, security monitoring, backups,
                        and technical support to address any issues that may
                        arise. We&apos;re here to help you keep your website
                        running efficiently long after it&apos;s launched.
                      </div>
                    </div>
                  </div>
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