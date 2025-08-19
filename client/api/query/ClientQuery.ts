"use client"
import { useQuery } from "@tanstack/react-query";
import { AboutList, BannerList } from "../functions/ClientFunc";
import { AboutResponse, BannerResponse } from "@/types/ClientTypes";

export const BannerQuery = () => {
  return useQuery<BannerResponse>({
    queryKey: ["banner"],
    queryFn: BannerList
  })
}
export const AboutQuery = () => {
  return useQuery<AboutResponse>({
    queryKey: ["About"],
    queryFn: AboutList
  })
}