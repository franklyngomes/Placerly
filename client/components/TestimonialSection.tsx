"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";
// import Masonry from 'react-layout-masonry';

const Masonry = dynamic(() => import("react-layout-masonry"), { ssr: false });
const TestimonialSection = () => {
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
            <div
              className=""
              data-aos="fade-up"
              data-aos-delay="0"
            >
              <div className="testimonial rounded-4 p-4">
                <blockquote className="mb-3">
                  &ldquo; This platform has completely transformed the way I
                  manage my business finances. The real-time transaction
                  tracking and seamless payment options have saved me so much
                  time and effort! &rdquo;
                </blockquote>
                <div className="testimonial-author d-flex gap-3 align-items-center">
                  <div className="author-img">
                    <Image
                      className="rounded-circle img-fluid"
                      src="/assets/images/person-sq-2-min.jpg"
                      alt="Author"
                      width={50}
                      height={50}
                    />
                  </div>
                  <div className="lh-base">
                    <strong className="d-block">John Davis</strong>
                    <span>Small Business Owner</span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className=""
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="testimonial rounded-4 p-4">
                <blockquote className="mb-3">
                  &ldquo; As a freelancer, managing my finances can be
                  overwhelming. The budgeting tools and personalized insights
                  have made it so much easier to stay on top of my expenses and
                  plan for the future. &rdquo;
                </blockquote>
                <div className="testimonial-author d-flex gap-3 align-items-center">
                  <div className="author-img">
                    <Image
                      className="rounded-circle img-fluid"
                      src="/assets/images/person-sq-1-min.jpg"
                      alt="Author"
                      width={50}
                      height={50}
                    />
                  </div>
                  <div className="lh-base">
                    <strong className="d-block">Emily Smith</strong>
                    <span>Freelancer</span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className=""
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="testimonial rounded-4 p-4">
                <blockquote className="mb-3">
                  &ldquo; The investment options and portfolio management tools
                  on this platform are top-notch. The variety of choices caters
                  to all types of investors, from conservative to aggressive. I
                  especially appreciate how the tailored recommendations align
                  perfectly with my financial goals. It&apos;s a game-changer for
                  anyone serious about growing their wealth. &rdquo;
                </blockquote>
                <div className="testimonial-author d-flex gap-3 align-items-center">
                  <div className="author-img">
                    <Image
                      className="rounded-circle img-fluid"
                      src="/assets/images/person-sq-5-min.jpg"
                      alt="Author"
                      width={50}
                      height={50}
                    />
                  </div>
                  <div className="lh-base">
                    <strong className="d-block">Michael Rodriguez</strong>
                    <span>Investor</span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className=""
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="testimonial rounded-4 p-4">
                <blockquote className="mb-3">
                  &ldquo; I never thought managing money could be this simple!
                  The user-friendly interface and secure transaction process
                  give me the confidence to handle my finances independently.
                  &rdquo;
                </blockquote>
                <div className="testimonial-author d-flex gap-3 align-items-center">
                  <div className="author-img">
                    <Image
                      className="rounded-circle img-fluid"
                      src="/assets/images/person-sq-3-min.jpg"
                      alt="Author"
                      width={50}
                      height={50}
                    />
                  </div>
                  <div className="lh-base">
                    <strong className="d-block">Sarah Lee</strong>
                    <span>College Student</span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className=""
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="testimonial rounded-4 p-4">
                <blockquote className="mb-3">
                  &ldquo; The security features are outstanding. Knowing that my
                  financial data is protected gives me peace of mind, and the
                  platform&apos;s efficiency makes it a pleasure to use. &rdquo;
                </blockquote>
                <div className="testimonial-author d-flex gap-3 align-items-center">
                  <div className="author-img">
                    <Image
                      className="rounded-circle img-fluid"
                      src="/assets/images/person-sq-7-min.jpg"
                      alt="Author"
                      width={50}
                      height={50}
                    />
                  </div>
                  <div className="lh-base">
                    <strong className="d-block">James Kim</strong>
                    <span>IT Consultant</span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className=""
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <div className="testimonial rounded-4 p-4">
                <blockquote className="mb-3">
                  &ldquo; The platform&apos;s intuitive design and robust features
                  have been a game-changer for my startup. It&apos;s helped me
                  streamline operations and focus on growing my business.
                  &rdquo;
                </blockquote>
                <div className="testimonial-author d-flex gap-3 align-items-center">
                  <div className="author-img">
                    <Image
                      className="rounded-circle img-fluid"
                      src="/assets/images/person-sq-8-min.jpg"
                      alt="Author"
                      width={50}
                      height={50}
                    />
                  </div>
                  <div className="lh-base">
                    <strong className="d-block">Laura Brown</strong>
                    <span>Entrepreneur</span>
                  </div>
                </div>
              </div>
            </div>
            </Masonry>
        </div>
      </section>
    </div>
  );
};

export default TestimonialSection;
