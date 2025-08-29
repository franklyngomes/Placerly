"use client";
import { AboutQuery } from "@/api/query/ClientQuery";
import Image from "next/image";
import React from "react";

const AboutSection = () => {
  const {data} = AboutQuery()
  const about = data?.data
  return (
    <div>
      <section className="about__v4 section" id="about">
        <div className="container">
          <div className="row">
            <div className="col-md-6 order-md-2">
              <div className="row justify-content-end">
                <div className="col-md-11 mb-4 mb-md-0">
                  <span
                    className="subtitle text-uppercase mb-3"
                    data-aos="fade-up"
                    data-aos-delay="0"
                  >
                    About us
                  </span>
                  <h2 className="mb-4" data-aos="fade-up" data-aos-delay="100">
                    {about?.title}
                  </h2>
                  <div data-aos="fade-up" data-aos-delay="200">
                    <p>
                      {about?.descriptionOne}
                    </p>
                    <p>
                      {about?.descriptionTwo}
                    </p>
                  </div>
                  <h4
                    className="small fw-bold mt-4 mb-3"
                    data-aos="fade-up"
                    data-aos-delay="300"
                  >
                    Key Values and Vision
                  </h4>
                  <ul
                    className="d-flex flex-row flex-wrap list-unstyled gap-3 features"
                    data-aos="fade-up"
                    data-aos-delay="400"
                  >
                    {about?.values?.map((item, index) => (
                    <li key={index} className="d-flex align-items-center gap-2">
                      <span className="icon rounded-circle text-center">
                        <i className="bi bi-check"></i>
                      </span>
                      <span className="text">{item}</span>
                    </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="img-wrap position-relative">
                <Image
                  className="img-fluid rounded-4"
                  src={`https://placerly.onrender.com/${about?.image}`}
                  alt="About"
                  data-aos="fade-up"
                  data-aos-delay="0"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{width: "100%", height: "auto"}}
                />
                <div
                  className="mission-statement p-4 rounded-4 d-flex gap-4"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <div className="mission-icon text-center rounded-circle">
                    <i className="bi bi-lightbulb fs-4"></i>
                  </div>
                  <div>
                    <h3 className="text-uppercase fw-bold">
                      Mission Statement
                    </h3>
                    <p className="fs-5 mb-0">
                      {about?.mission}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutSection;
