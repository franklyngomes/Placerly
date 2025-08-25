"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import {CreateAssetFunc, AssetDetailsFunc, AssetDeleteFunc, AssetUpdateFunc, GetAllAssetFunc} from "../functions/AssetApiFunc"
import { queryClient } from "@/app/provider";

export const AssetListQuery = () => {
  return useQuery({
    queryKey: ["AssetList"],
    queryFn: GetAllAssetFunc
  })
}
export const CreateAssetQuery = () => {
  return useMutation({
    mutationFn: (payload) => CreateAssetFunc(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["AssetList"] })
    },
  });
};
export const AssetDetailsQuery = (id: string, enabled: boolean) => {
  return useQuery({
    queryKey: ['AssetDetails', id],
    queryFn: () => AssetDetailsFunc(id),
    enabled
  })
}
export const AssetUpdateQuery = () => {
  return useMutation({
    mutationFn: ({ editId, payload }: { editId: string; payload}) => AssetUpdateFunc({ editId, payload }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["AssetList"] })
      queryClient.invalidateQueries({ queryKey: ["AssetDetails"] })
    }
  })
}
export const AssetDeleteQuery = () => {
  return useMutation({
    mutationFn: (id: string) => AssetDeleteFunc(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["AssetList"] })
    }
  })
}
