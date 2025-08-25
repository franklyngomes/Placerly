"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import {DebtDetailsFunc, DebtDeleteFunc, DebtUpdateFunc, CreateDebtFunc, GetAllDebtFunc} from "../functions/DebtApiFunc"
import { queryClient } from "@/app/provider";

export const DebtListQuery = () => {
  return useQuery({
    queryKey: ["DebtList"],
    queryFn: GetAllDebtFunc
  })
}
export const CreateDebtQuery = () => {
  return useMutation({
    mutationFn: (payload) => CreateDebtFunc(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["DebtList"] })
    },
  });
};
export const DebtDetailsQuery = (id: string, enabled: boolean) => {
  return useQuery({
    queryKey: ['DebtDetails', id],
    queryFn: () => DebtDetailsFunc(id),
    enabled
  })
}
export const DebtUpdateQuery = () => {
  return useMutation({
    mutationFn: ({ editId, payload }: { editId: string; payload}) => DebtUpdateFunc({ editId, payload }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["DebtList"] })
      queryClient.invalidateQueries({ queryKey: ["DebtDetails"] })
    }
  })
}
export const DebtDeleteQuery = () => {
  return useMutation({
    mutationFn: (id: string) => DebtDeleteFunc(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["DebtList"] })
    }
  })
}
