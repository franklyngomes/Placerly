import axios from "axios";
import { axiosInstance } from "../axios/axiosInstance";
import { endPoints } from "../endpoints/endPoints";

export const CreateUtilityFunc = async (Data) => {
  try {
    const response = await axiosInstance.post(endPoints.utility.create, Data);
    return response?.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: true, message: error.response?.data?.message || "Something went wrong" };
    }
    return { error: true, message: "Unexpected error" };
  }
}
export const GetAllUtilityFunc = async (Data) => {
  try {
    const response = await axiosInstance.get(endPoints.utility.get_utility);
    return response?.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: true, message: error.response?.data?.message || "Something went wrong" };
    }
    return { error: true, message: "Unexpected error" };
  }
}
export const UtilityDetailsFunc = async (id: string) => {
  try {
    const response = await axiosInstance.get(endPoints.utility.details+ id);
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: true, message: error.response?.data?.message || "Something went wrong" };
    }
    return { error: true, message: "Unexpected error" };
  }
}
export const UtilityUpdateFunc = async (id: string) => {
  try {
    const response = await axiosInstance.put(endPoints.utility.update+id);
    return response?.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: true, message: error.response?.data?.message || "Something went wrong" };
    }
    return { error: true, message: "Unexpected error" };
  }
}

export const UtilityDeleteFunc = async (id: string) => {
  try {
    const response = await axiosInstance.post(endPoints.utility.delete+id);
    return response?.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: true, message: error.response?.data?.message || "Something went wrong" };
    }
    return { error: true, message: "Unexpected error" };
  }
}