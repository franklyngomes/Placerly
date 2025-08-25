"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import {InsuranceDeleteFunc, InsuranceDetailsFunc,InsuranceUpdateFunc,CreateInsuranceFunc,GetAllInsuranceFunc} from "../functions/InsuranceApiFunc"
import { queryClient } from "@/app/provider";

export const InsuranceListQuery = () => {
  return useQuery({
    queryKey: ["InsuranceList"],
    queryFn: GetAllInsuranceFunc
  })
}
export const CreateInsuranceQuery = () => {
  return useMutation({
    mutationFn: (payload) => CreateInsuranceFunc(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["InsuranceList"] })
    },
  });
};
export const InsuranceDetailsQuery = (id: string, enabled: boolean) => {
  return useQuery({
    queryKey: ['InsuranceDetails', id],
    queryFn: () => InsuranceDetailsFunc(id),
    enabled
  })
}
export const InsuranceUpdateQuery = () => {
  return useMutation({
    mutationFn: ({ editId, payload }: { editId: string; payload}) => InsuranceUpdateFunc({ editId, payload }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["InsuranceList"] })
      queryClient.invalidateQueries({ queryKey: ["InsuranceDetails"] })
    }
  })
}
export const InsuranceDeleteQuery = () => {
  return useMutation({
    mutationFn: (id: string) => InsuranceDeleteFunc(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["InsuranceList"] })
    }
  })
}
