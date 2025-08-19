"use client"
import { useQuery } from "@tanstack/react-query";
import { AboutList, BannerList, FAQList, PricingList, ServiceList, TestimonialList } from "../functions/ClientFunc";
import { AboutResponse, BannerResponse, PricingResponse, ServiceResponse, TestimonialResponse } from "@/types/ClientTypes";

export const BannerQuery = () => {
  return useQuery<BannerResponse>({
    queryKey: ["banner"],
    queryFn: BannerList
  })
}
export const AboutQuery = () => {
  return useQuery<AboutResponse>({
    queryKey: ["About"],
    queryFn: AboutList
  })
}
export const PricingQuery = () => {
  return useQuery<PricingResponse>({
    queryKey: ["Pricing"],
    queryFn: PricingList
  })
}
export const ServiceQuery = () => {
  return useQuery<ServiceResponse>({
    queryKey: ["Service"],
    queryFn: ServiceList
  })
}
export const TestimonialQuery = () => {
  return useQuery<TestimonialResponse>({
    queryKey: ["Testimonial"],
    queryFn: TestimonialList
  })
}
export const FAQQuery = () => {
  return useQuery({
    queryKey: ["FAQ"],
    queryFn: FAQList
  })
}