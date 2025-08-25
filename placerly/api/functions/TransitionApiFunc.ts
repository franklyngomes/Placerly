import axios from "axios";
import { axiosInstance } from "../axios/axiosInstance";
import { endPoints } from "../endpoints/endPoints";

export const CreateTransitionFunc = async (Data) => {
  try {
    const response = await axiosInstance.post(endPoints.transition.create, Data);
    return response?.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: true, message: error.response?.data?.message || "Something went wrong" };
    }
    return { error: true, message: "Unexpected error" };
  }
}
export const GetAllTransitionFunc = async (Data) => {
  try {
    const response = await axiosInstance.get(endPoints.transition.get_transition);
    return response?.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: true, message: error.response?.data?.message || "Something went wrong" };
    }
    return { error: true, message: "Unexpected error" };
  }
}
export const TransitionDetailsFunc = async (id: string) => {
  try {
    const response = await axiosInstance.get(endPoints.transition.details+ id);
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: true, message: error.response?.data?.message || "Something went wrong" };
    }
    return { error: true, message: "Unexpected error" };
  }
}
export const TransitionUpdateFunc = async (id: string) => {
  try {
    const response = await axiosInstance.put(endPoints.transition.update+id);
    return response?.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: true, message: error.response?.data?.message || "Something went wrong" };
    }
    return { error: true, message: "Unexpected error" };
  }
}

export const TransitionDeleteFunc = async (id: string) => {
  try {
    const response = await axiosInstance.post(endPoints.transition.delete+id);
    return response?.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: true, message: error.response?.data?.message || "Something went wrong" };
    }
    return { error: true, message: "Unexpected error" };
  }
}