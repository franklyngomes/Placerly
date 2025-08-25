"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Cookies } from "react-cookie";
import { ForgotPasswordFunc, ProfileApiFunc, ResetPasswordFunc, SigninFunc, SignupFunc, VerifyEmailFunc } from "../functions/AuthApiFunc";

export const SigninQuery = () => {
  const cookie = new Cookies();
  return useMutation({
    mutationFn: SigninFunc,
    onSuccess: (res) => {
      if (res.status === true) {
        cookie.set("token", res.token, { path: "/", secure: true });
      }
    },
    onError: (err) => {
      return err;
    },
  });
};
export const SignupQuery = () => {
  return useMutation({
    mutationFn: SignupFunc,
    onSuccess: (res) => {},
  });
};
export const VerifyEmailQuery = () => {
  return useMutation({
    mutationFn: VerifyEmailFunc,
    onSuccess: (res) => {},
    onError: (err) => {},
  });
};
export const ForgotPasswordQuery = () => {
  return useMutation({
    mutationFn: ForgotPasswordFunc,
    onSuccess: (res) => {},
  });
};
export const ResetPasswordQuery = () => {
  return useMutation({
    mutationFn: ResetPasswordFunc,
    onSuccess: (res) => {},
  });
};
export const UserProfileQuery = () => {
  return useQuery({
    queryKey: ["UserProfile"],
    queryFn: ProfileApiFunc,
  })
}
