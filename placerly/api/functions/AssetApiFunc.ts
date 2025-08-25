import axios from "axios";
import { axiosInstance } from "../axios/axiosInstance";
import { endPoints } from "../endpoints/endPoints";
import { Cookies } from "react-cookie";
const cookies = new Cookies()

export const CreateAssetFunc = async (Data) => {
  const token = cookies.get("token")
  try {
    const response = await axiosInstance.post(endPoints.assets.create, Data,{
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
export const GetAllAssetFunc = async (Data) => {
  const token = cookies.get("token")
  try {
    const response = await axiosInstance.get(endPoints.assets.get_asset,{
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
export const AssetDetailsFunc = async (id: string) => {
  const token = cookies.get("token")
  try {
    const response = await axiosInstance.get(endPoints.assets.details+ id,{
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
export const AssetUpdateFunc = async (id: string) => {
  const token = cookies.get("token")
  try {
    const response = await axiosInstance.put(endPoints.assets.update+id, {
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

export const AssetDeleteFunc = async (id: string) => {
  const token = cookies.get("token")
  try {
    const response = await axiosInstance.delete(endPoints.assets.delete+id, {
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