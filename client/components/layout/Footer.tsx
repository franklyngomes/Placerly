"use client";
import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="footer pt-5 pb-5">
        <div className="container">
          <div className="row mb-5 pb-4">
            <div className="col-md-7">
              <h2 className="fs-5">Join our newsletter</h2>
              <p>
                Stay updated with our latest templates and offers—join our
                newsletter today!
              </p>
            </div>
            <div className="col-md-5">
              <form className="d-flex gap-2">
                <input
                  className="form-control"
                  type="email"
                  placeholder="Email your email"
                  required={true}
                />
                <button className="btn btn-primary fs-6" type="submit">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="row justify-content-between mb-5 g-xl-5">
            <div className="col-md-4 mb-5 mb-lg-0">
              <h3 className="mb-3">About</h3>
              <p className="mb-4">
                Utilize our tools to develop your concepts and bring your vision
                to life. Once complete, effortlessly share your creations.
              </p>
            </div>
            <div className="col-md-7">
              <div className="row g-2">
                <div className="col-md-6 col-lg-4 mb-4 mb-lg-0">
                  <h3 className="mb-3">Company</h3>
                  <ul className="list-unstyled">
                    <li>
                      <a href="page-about.html">Leadership</a>
                    </li>
                    <li>
                      <a href="page-careers.html">
                        Careers
                        <span className="badge ms-1">we&apos;re hiring</span>
                      </a>
                    </li>
                    <li>
                      <a href="page-case-studies.html">Case Studies</a>
                    </li>
                    <li>
                      <a href="page-terms-conditions.html">
                        Terms &amp; Conditions
                      </a>
                    </li>
                    <li>
                      <a href="page-privacy-policy.html">Privacy Policy</a>
                    </li>
                    <li>
                      <a href="page-404.html">404 page</a>
                    </li>
                  </ul>
                </div>
                <div className="col-md-6 col-lg-4 mb-4 mb-lg-0">
                  <h3 className="mb-3">Accounts</h3>
                  <ul className="list-unstyled">
                    <li>
                      <a href="page-signup.html">Register</a>
                    </li>
                    <li>
                      <a href="page-signin.html">Sign in</a>
                    </li>
                    <li>
                      <a href="page-forgot-password.html">Forgot Password</a>
                    </li>
                    <li>
                      <a href="page-coming-soon.html">Coming soon</a>
                    </li>
                    <li>
                      <a href="page-portfolio-masonry.html">
                        Portfolio Masonry
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-md-6 col-lg-4 mb-4 mb-lg-0 quick-contact">
                  <h3 className="mb-3">Contact</h3>
                  <p className="d-flex mb-3">
                    <i className="bi bi-geo-alt-fill me-3"></i>
                    <span>
                      123 Main Street Apt 4B Springfield, <br />
                      IL 62701 United States
                    </span>
                  </p>
                  <a className="d-flex mb-3" href="mailto:support@placerly.com">
                    <i className="bi bi-envelope-fill me-3"></i>
                    <span>support@placerly.com</span>
                  </a>
                  <a className="d-flex mb-3" href="tel://+123456789900">
                    <i className="bi bi-telephone-fill me-3"></i>
                    <span>+1 (234) 5678 9900</span>
                  </a>
                  <a className="d-flex mb-3" href="http://localhost:3000/">
                    <i className="bi bi-globe me-3"></i>
                    <span>placerly.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="row credits pt-3">
            <div className="col-xl-8 text-center text-xl-start mb-3 mb-xl-0">
              &copy; 2025
              Placerly. All rights reserved.
            </div>
            <div className="col-xl-4 justify-content-start justify-content-xl-end quick-links d-flex flex-column flex-xl-row text-center text-xl-start gap-1">
              Developed by
              <a href="https://franklyngomes.vercel.app/" target="_blank" className="">
                Franklyn Gomes
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
