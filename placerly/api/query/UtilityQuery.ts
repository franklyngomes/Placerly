"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import {UtilityDeleteFunc,UtilityDetailsFunc,UtilityUpdateFunc,CreateUtilityFunc,GetAllUtilityFunc} from "../functions/UtilityApiFunc"
import { queryClient } from "@/app/provider";

export const UtilityListQuery = () => {
  return useQuery({
    queryKey: ["UtilityList"],
    queryFn: GetAllUtilityFunc
  })
}
export const CreateUtilityQuery = () => {
  return useMutation({
    mutationFn: (payload) => CreateUtilityFunc(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["UtilityList"] })
    },
  });
};
export const UtilityDetailsQuery = (id: string, enabled: boolean) => {
  return useQuery({
    queryKey: ['UtilityDetails', id],
    queryFn: () => UtilityDetailsFunc(id),
    enabled
  })
}
export const UtilityUpdateQuery = () => {
  return useMutation({
    mutationFn: ({ editId, payload }: { editId: string; payload}) => UtilityUpdateFunc({ editId, payload }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["UtilityList"] })
      queryClient.invalidateQueries({ queryKey: ["UtilityDetails"] })
    }
  })
}
export const UtilityDeleteQuery = () => {
  return useMutation({
    mutationFn: (id: string) => UtilityDeleteFunc(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["UtilityList"] })
    }
  })
}
