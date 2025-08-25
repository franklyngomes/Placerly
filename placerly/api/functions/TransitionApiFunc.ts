import axios from "axios";
import { axiosInstance } from "../axios/axiosInstance";
import { endPoints } from "../endpoints/endPoints";
import { Cookies } from "react-cookie";
const cookies = new Cookies()

export const CreateTransitionFunc = async (Data) => {
  const token = cookies.get("token")
  try {
    const response = await axiosInstance.post(endPoints.transition.create, Data,{
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
export const GetAllTransitionFunc = async (Data) => {
  const token = cookies.get("token")
  try {
    const response = await axiosInstance.get(endPoints.transition.get_transition,{
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
export const TransitionDetailsFunc = async (id: string) => {
  const token = cookies.get("token")
  try {
    const response = await axiosInstance.get(endPoints.transition.details+ id,{
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
export const TransitionUpdateFunc = async (id: string) => {
  const token = cookies.get("token")
  try {
    const response = await axiosInstance.put(endPoints.transition.update+id,{
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

export const TransitionDeleteFunc = async (id: string) => {
  const token = cookies.get("token")
  try {
    const response = await axiosInstance.delete(endPoints.transition.delete+id,{
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