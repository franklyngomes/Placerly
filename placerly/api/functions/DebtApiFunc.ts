import axios from "axios";
import { axiosInstance } from "../axios/axiosInstance";
import { endPoints } from "../endpoints/endPoints";

export const CreateDebtFunc = async (Data) => {
  try {
    const response = await axiosInstance.post(endPoints.debts.create, Data);
    return response?.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: true, message: error.response?.data?.message || "Something went wrong" };
    }
    return { error: true, message: "Unexpected error" };
  }
}
export const GetAllDebtFunc = async (Data) => {
  try {
    const response = await axiosInstance.get(endPoints.debts.get_debt);
    return response?.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: true, message: error.response?.data?.message || "Something went wrong" };
    }
    return { error: true, message: "Unexpected error" };
  }
}
export const DebtDetailsFunc = async (id: string) => {
  try {
    const response = await axiosInstance.get(endPoints.debts.details+ id);
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: true, message: error.response?.data?.message || "Something went wrong" };
    }
    return { error: true, message: "Unexpected error" };
  }
}
export const DebtUpdateFunc = async (id: string) => {
  try {
    const response = await axiosInstance.put(endPoints.debts.update+id);
    return response?.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: true, message: error.response?.data?.message || "Something went wrong" };
    }
    return { error: true, message: "Unexpected error" };
  }
}

export const DebtDeleteFunc = async (id: string) => {
  try {
    const response = await axiosInstance.post(endPoints.debts.delete+id);
    return response?.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: true, message: error.response?.data?.message || "Something went wrong" };
    }
    return { error: true, message: "Unexpected error" };
  }
}