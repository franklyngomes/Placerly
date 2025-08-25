import { endPoints } from "../endpoints/endPoints";
import { axiosInstance } from "../axios/axiosInstance";
import axios from "axios";
import { ForgotPasswordData, ResetPasswordData, SigninData, SignupData, UserProfile, VerifyEmailData } from "@/types/types";
import { Cookies } from "react-cookie";

export const SignupFunc = async (Data: SignupData) => {
  try {
    const response = await axiosInstance.post(endPoints.signup, Data);
    return response?.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: true, message: error.response?.data?.message || "Something went wrong" };
    }
    return { error: true, message: "Unexpected error" };
  }
}
export const SigninFunc = async (Data: SigninData) => {
  try {
    const response = await axiosInstance.post(endPoints.signin, Data);
    return response?.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: true, message: error.response?.data?.message || "Something went wrong" };
    }
    return { error: true, message: "Unexpected error" };
  }
}
export const VerifyEmailFunc = async (Data: VerifyEmailData) => {
  try {
    const response = await axiosInstance.post(endPoints.verify_email, Data);
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: true, message: error.response?.data?.message || "Something went wrong" };
    }
    return { error: true, message: "Unexpected error" };
  }
}
export const ForgotPasswordFunc = async (Data: ForgotPasswordData) => {
  try {
    const response = await axiosInstance.post(endPoints.forgot_password, Data);
    return response?.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: true, message: error.response?.data?.message || "Something went wrong" };
    }
    return { error: true, message: "Unexpected error" };
  }
}

export const ResetPasswordFunc = async (Data: ResetPasswordData) => {
  try {
    const response = await axiosInstance.post(endPoints.reset_password, Data);
    return response?.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: true, message: error.response?.data?.message || "Something went wrong" };
    }
    return { error: true, message: "Unexpected error" };
  }
}
export const ProfileApiFunc = async () => {
  const cookies = new Cookies()
  const token = cookies.get("token")
  try {
    const response = await axiosInstance.get(endPoints.profile, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response?.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: true, message: error.response?.data?.message || "Something went wrong" };
    }
    return { error: true, message: "Unexpected error" };
  }
}

