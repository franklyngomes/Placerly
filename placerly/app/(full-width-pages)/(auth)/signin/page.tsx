"use client"
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Cookies } from "react-cookie"
import { useRouter } from "next/navigation";
import EyeIcon from "@/icons/Eye";
import EyeCloseIcon from "@/icons/EyeClose";
import { Button } from "@/components/ui/button";
import { SigninQuery } from "@/api/query/query";
import { useStore } from "@/store";


interface SigninFormProps {
  email: string;
  password: string;
}
const schema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required").min(8).max(15),
})
export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const { handleSubmit, reset, control, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
  const {mutateAsync} = SigninQuery()
  const cookies = new Cookies()
  const router = useRouter()
  const {userid, setUserId, setUser, user} = useStore()

  const onSubmit = async (data: SigninFormProps) => {
    const { email, password } = data
    const payload = data
    mutateAsync(payload, {
      onSuccess: (res) => {
        if (res.error) {
          toast.error(res.message);
          return;
        }
        cookies.set("token", res?.accessToken)
        setUserId(res?.user?.id)
        setUser(res?.user)
        reset()
        toast.success(res?.message);
        router.push("/")
      },
    })
  }
  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-2xl">
              Sign In
            </h1>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-6">
                <div>
                  <div>
                    <Label>
                      Email<span className="text-error-500">*</span>
                    </Label>
                    <Controller
                      control={control}
                      name="email"
                      render={({ field }) => (
                        <Input
                          {...field}
                          value={field.value ?? ""}
                          placeholder="Enter Email"
                        />
                      )}
                    />
                    {errors.email && (
                      <p style={{ color: "red", margin: "0", padding: "5px" }}>
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <Label>
                    Password<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Controller
                      control={control}
                      name="password"
                      render={({ field }) => (
                        <Input
                          {...field}
                          value={field.value ?? ""}
                          placeholder="Enter your password"
                          type={showPassword ? "text" : "password"}
                        />
                      )}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (<EyeIcon className="fill-gray-500 dark:fill-gray-400" />) : (<EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />)}
                    </span>
                  </div>
                  {errors.password && (
                    <p style={{ color: "red", margin: "0", padding: "5px" }}>
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <Link
                    href="/forgot-password"
                    className="text-sm text-brand-500"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div>
                  <Button className="w-full text-background" type="submit">
                    Sign in
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-900  sm:text-start">
                Don&apos;t have an account? {""}
                <Link
                  href="/signup"
                  className="text-brand-500 text-custom-600 ml-2"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
