"use client";
import { ServiceQuery } from "@/api/query/ClientQuery";
import Image from "next/image";
import React from "react";

const ServiceSection = () => {
  const { data } = ServiceQuery()
  const services = data?.data

  return (
    <div>
      <section className="section services__v3" id="services">
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-8 mx-auto text-center">
              <span
                className="subtitle text-uppercase mb-3"
                data-aos="fade-up"
                data-aos-delay="0"
              >
                Our Services
              </span>
              <h2 className="mb-3" data-aos="fade-up" data-aos-delay="100">
                Empowering Financial Innovation Through Cutting-Edge Services
              </h2>
            </div>
          </div>
          <div className="row g-4">
            {
              services?.map((item, index) => (
                <div
                  className="col-md-6 col-lg-4"
                  data-aos="fade-up"
                  data-aos-delay="0"
                  key={index}
                >
                  <div className="service-card p-4 rounded-4 h-100 d-flex flex-column justify-content-between gap-5">
                    <div>
                      <span className="icon mb-4">
                        <Image
                          alt="Service Icon"
                          src={`http://localhost:5000/${item.image}`}
                          width={40}
                          height={40}
                        />
                      </span>
                      <h3 className="fs-5 mb-3">{item.title}</h3>
                      <p className="mb-4">
                        {item.description}
                      </p>
                    </div>
                    <a
                      className="special-link d-inline-flex gap-2 align-items-center text-decoration-none"
                      href={item.url}
                    >
                      <span className="icons">
                        <i className="icon-1 bi bi-arrow-right-short"></i>
                        <i className="icon-2 bi bi-arrow-right-short"> </i>
                      </span>
                      <span>Read more</span>
                    </a>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceSection;
