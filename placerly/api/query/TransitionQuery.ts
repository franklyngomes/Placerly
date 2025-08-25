"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import {TransitionDeleteFunc,TransitionDetailsFunc,TransitionUpdateFunc,CreateTransitionFunc,GetAllTransitionFunc} from "../functions/TransitionApiFunc"
import { queryClient } from "@/app/provider";

export const TransitionListQuery = () => {
  return useQuery({
    queryKey: ["TransitionList"],
    queryFn: GetAllTransitionFunc
  })
}
export const CreateTransitionQuery = () => {
  return useMutation({
    mutationFn: (payload) => CreateTransitionFunc(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["TransitionList"] })
    },
  });
};
export const TransitionDetailsQuery = (id: string, enabled: boolean) => {
  return useQuery({
    queryKey: ['TransitionDetails', id],
    queryFn: () => TransitionDetailsFunc(id),
    enabled
  })
}
export const TransitionUpdateQuery = () => {
  return useMutation({
    mutationFn: ({ editId, payload }: { editId: string; payload}) => TransitionUpdateFunc({ editId, payload }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["TransitionList"] })
      queryClient.invalidateQueries({ queryKey: ["TransitionDetails"] })
    }
  })
}
export const TransitionDeleteQuery = () => {
  return useMutation({
    mutationFn: (id: string) => TransitionDeleteFunc(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["TransitionList"] })
    }
  })
}
