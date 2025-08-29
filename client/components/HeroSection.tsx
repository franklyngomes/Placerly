"use client";
import { BannerQuery } from "@/api/query/ClientQuery";
import Image from "next/image";
import React from "react";

const HeroSection = () => {
  const {data} = BannerQuery()
  const banner = data?.data
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
                    {banner?.subtitle}
                  </span>
                  <h1
                    className="hero-title mb-3"
                    data-aos="fade-up"
                    data-aos-delay="100"
                  >
                   {banner?.title}
                  </h1>
                  <p
                    className="hero-description mb-4 mb-lg-5"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    {banner?.description}
                  </p>
                  <div
                    className="cta d-flex gap-2 mb-4 mb-lg-5"
                    data-aos="fade-up"
                    data-aos-delay="300"
                  >
                    <a className="btn" href="https://placerly-1.onrender.com/">
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
                    <div className="logos-images d-flex gap-4 align-items-center">
                      <Image
                        className="img-fluid js-img-to-inline-svg"
                        src="/assets/images/logo/actual-size/logo-air-bnb__black.svg"
                        alt="Company 1"
                        style={{ height: "auto"}}
                        height={0}
                        width={110}
                      />
                      <Image
                        className="img-fluid js-img-to-inline-svg"
                        src="/assets/images/logo/actual-size/logo-ibm__black.svg"
                        alt="Company 2"
                        style={{height: "auto"}}
                        height={0}
                        width={80}
                      />
                      <Image
                        className="img-fluid js-img-to-inline-svg"
                        src="/assets/images/logo/actual-size/logo-google__black.svg"
                        alt="Company 3"
                        style={{height: "auto"}}
                        height={0}
                        width={110}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-img" >
                <Image
                  className="img-card img-fluid"
                  src={`https://placerly.onrender.com/${banner?.secondaryImage}`}
                  alt="Image card"
                  data-aos="fade-down"
                  data-aos-delay="600"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '100%', height: 'auto' }}
                />
                <Image
                  className="img-main img-fluid rounded-4"
                  src={`https://placerly.onrender.com/${banner?.primaryImage}`}
                  alt="Hero Image"
                  data-aos="fade-in"
                  data-aos-delay="500"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '100%', height: 'auto' }}
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
