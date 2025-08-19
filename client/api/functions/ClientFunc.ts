import { AboutResponse, BannerResponse } from "@/types/ClientTypes";
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