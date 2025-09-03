import axios from "axios";

const baseURL = "https://placerly.onrender.com"
export const axiosInstance = axios.create({
  baseURL
})