import axios from "axios";
import { axiosInstance } from "../axios/axiosInstance";
import { endPoints } from "../endpoints/endPoints";
import { Cookies } from "react-cookie";
import { UtilityFormProps, UtilityResponse } from "@/types/types";
const cookies = new Cookies()

export const CreateUtilityFunc = async (Data: UtilityFormProps) => {
  const token = cookies.get("token")
  try {
    const response = await axiosInstance.post(endPoints.utility.create, Data,{
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
export const GetAllUtilityFunc = async () : Promise<UtilityResponse> => {
  const token = cookies.get("token")
  try {
    const response = await axiosInstance.get(endPoints.utility.get_utility,{
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
export const UtilityDetailsFunc = async (id: string) => {
  const token = cookies.get("token")
  try {
    const response = await axiosInstance.get(endPoints.utility.details+ id,{
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
export const UtilityUpdateFunc = async (id: string, payload: UtilityFormProps) => {
  const token = cookies.get("token")
  try {
    const response = await axiosInstance.put(endPoints.utility.update+id,{
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

export const UtilityDeleteFunc = async (id: string) => {
  const token = cookies.get("token")
  try {
    const response = await axiosInstance.delete(endPoints.utility.delete+id,{
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