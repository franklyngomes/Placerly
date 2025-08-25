import axios from "axios";
import { axiosInstance } from "../axios/axiosInstance";
import { endPoints } from "../endpoints/endPoints";

export const CreateInsuranceFunc = async (Data) => {
  try {
    const response = await axiosInstance.post(endPoints.insurance.create, Data);
    return response?.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: true, message: error.response?.data?.message || "Something went wrong" };
    }
    return { error: true, message: "Unexpected error" };
  }
}
export const GetAllInsuranceFunc = async (Data) => {
  try {
    const response = await axiosInstance.get(endPoints.insurance.get_insurance);
    return response?.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: true, message: error.response?.data?.message || "Something went wrong" };
    }
    return { error: true, message: "Unexpected error" };
  }
}
export const InsuranceDetailsFunc = async (id: string) => {
  try {
    const response = await axiosInstance.get(endPoints.insurance.details+ id);
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: true, message: error.response?.data?.message || "Something went wrong" };
    }
    return { error: true, message: "Unexpected error" };
  }
}
export const InsuranceUpdateFunc = async (id: string) => {
  try {
    const response = await axiosInstance.put(endPoints.insurance.update+id);
    return response?.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: true, message: error.response?.data?.message || "Something went wrong" };
    }
    return { error: true, message: "Unexpected error" };
  }
}

export const InsuranceDeleteFunc = async (id: string) => {
  try {
    const response = await axiosInstance.post(endPoints.insurance.delete+id);
    return response?.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: true, message: error.response?.data?.message || "Something went wrong" };
    }
    return { error: true, message: "Unexpected error" };
  }
}