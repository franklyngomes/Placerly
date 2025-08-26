import axios from "axios";
import { axiosInstance } from "../axios/axiosInstance";
import { endPoints } from "../endpoints/endPoints";
import { Cookies } from "react-cookie";
import { DebtFormProps, DebtResponse } from "@/types/types";
const cookies = new Cookies()

export const CreateDebtFunc = async (Data : DebtFormProps) => {
  const token = cookies.get("token")
  try {
    const response = await axiosInstance.post(endPoints.debts.create, Data, {
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
export const GetAllDebtFunc = async () : Promise<DebtResponse> => {
  const token = cookies.get("token")
  try {
    const response = await axiosInstance.get(endPoints.debts.get_debt, {
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
export const DebtDetailsFunc = async (id: string) => {
  const token = cookies.get("token")
  try {
    const response = await axiosInstance.get(endPoints.debts.details + id, {
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
export const DebtUpdateFunc = async (id: string, payload : DebtFormProps) => {
  const token = cookies.get("token")
  try {
    const response = await axiosInstance.put(endPoints.debts.update + id, {
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

export const DebtDeleteFunc = async (id: string) => {
  const token = cookies.get("token")
  try {
    const response = await axiosInstance.delete(endPoints.debts.delete + id, {
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