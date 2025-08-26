import axios from "axios";
import { axiosInstance } from "../axios/axiosInstance";
import { endPoints } from "../endpoints/endPoints";
import { Cookies } from "react-cookie";
import { InsuranceFormProps, InsuranceResponse } from "@/types/types";
const cookies = new Cookies()

export const CreateInsuranceFunc = async (Data : InsuranceFormProps) => {
  const token = cookies.get("token")
  try {
    const response = await axiosInstance.post(endPoints.insurance.create, Data,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response?.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: true, message: error.response?.data?.message || "Something went wrong" };
    }
    return { error: true, message: "Unexpected error" };
  }
}
export const GetAllInsuranceFunc = async () : Promise<InsuranceResponse> => {
  const token = cookies.get("token")
  try {
    const response = await axiosInstance.get(endPoints.insurance.get_insurance,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response?.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: true, message: error.response?.data?.message || "Something went wrong" };
    }
    return { error: true, message: "Unexpected error" };
  }
}
export const InsuranceDetailsFunc = async (id: string) => {
  const token = cookies.get("token")
  try {
    const response = await axiosInstance.get(endPoints.insurance.details+ id,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: true, message: error.response?.data?.message || "Something went wrong" };
    }
    return { error: true, message: "Unexpected error" };
  }
}
export const InsuranceUpdateFunc = async (id: string ,payload: InsuranceFormProps) => {
  const token = cookies.get("token")
  try {
    const response = await axiosInstance.put(endPoints.insurance.update+id,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response?.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: true, message: error.response?.data?.message || "Something went wrong" };
    }
    return { error: true, message: "Unexpected error" };
  }
}

export const InsuranceDeleteFunc = async (id: string) => {
  const token = cookies.get("token")
  try {
    const response = await axiosInstance.delete(endPoints.insurance.delete+id,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response?.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: true, message: error.response?.data?.message || "Something went wrong" };
    }
    return { error: true, message: "Unexpected error" };
  }
}