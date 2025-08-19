import { AboutResponse, BannerResponse, FAQResponse, PricingResponse, ServiceResponse, TestimonialResponse } from "@/types/ClientTypes";
import { axiosInstance } from "../axios/axiosInstance";
import { endPoints } from "../axios/endpoints";

export const BannerList = async (): Promise<BannerResponse> => {
  try {
    const response = await axiosInstance.get<BannerResponse>(endPoints.client.banners)
    return response?.data
  } catch (error) {
    throw error
  }
}
export const AboutList = async (): Promise<AboutResponse> => {
  try {
    const response = await axiosInstance.get(endPoints.client.about)
    return response?.data
  } catch (error) {
    throw error
  }
}
export const PricingList = async () : Promise<PricingResponse>=> {
  try {
    const response = await axiosInstance.get(endPoints.client.pricing)
    return response?.data
  } catch (error) {
    throw error
  }
}
export const ServiceList = async() : Promise<ServiceResponse> => {
  try {
    const response = await axiosInstance.get(endPoints.client.service)
    return response?.data
  } catch (error) {
    throw error
  }
}
export const TestimonialList = async() : Promise<TestimonialResponse> => {
  try {
    const response = await axiosInstance.get(endPoints.client.testimonial)
    return response?.data
  } catch (error) {
    throw error
  }
}
export const FAQList = async() : Promise<FAQResponse> => {
  try {
    const response = await axiosInstance.get(endPoints.client.faq)
    return response?.data
  } catch (error) {
    throw error
  }
}