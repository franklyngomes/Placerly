"use client";
import { TestimonialQuery } from "@/api/query/ClientQuery";
import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";

const Masonry = dynamic(() => import("react-layout-masonry"), { ssr: false });

const TestimonialSection = () => {
  const { data } = TestimonialQuery()
  const testimonial = data?.data
  return (
    <div>
      <section className="section testimonials__v2" id="testimonials">
        <div className="container">
          <div className="row mb-5">
            <div className="col-lg-5 mx-auto text-center">
              <span
                className="subtitle text-uppercase mb-3"
                data-aos="fade-up"
                data-aos-delay="0"
              >
                Testimonials
              </span>
              <h2 className="mb-3" data-aos="fade-up" data-aos-delay="100">
                What Our Users Are Saying
              </h2>
              <p data-aos="fade-up" data-aos-delay="200">
                Real Stories of Success and Satisfaction from Our Diverse
                Community
              </p>
            </div>
          </div>
          <Masonry columns={{ 400: 1, 640: 2, 768: 3, 1024: 3, 1280: 3 }} gap={16}>
            {
              testimonial?.map((item, index) => (
              <div
                className=""
                data-aos="fade-up"
                data-aos-delay="0"
                key={index}
              >
                <div className="testimonial rounded-4 p-4">
                  <blockquote className="mb-3">
                    &ldquo;{item.comment} &rdquo;
                  </blockquote>
                  <div className="testimonial-author d-flex gap-3 align-items-center">
                    <div className="author-img">
                      <Image
                        className="rounded-circle img-fluid"
                        src={`https://placerly.onrender.com/${item.image}`}
                        alt="Author"
                        width={50}
                        height={50}
                      />
                    </div>
                    <div className="lh-base">
                      <strong className="d-block">{item.author}</strong>
                      <span>{item.designation}</span>
                    </div>
                  </div>
                </div>
              </div>
              ))
            }
          </Masonry>
        </div>
      </section>
    </div>
  );
};

export default TestimonialSection;
