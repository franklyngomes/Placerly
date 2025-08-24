"use client"
import Link from "next/link";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import  {Label}  from "@/components/ui/label";
import  {Input}  from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import EyeIcon from "@/icons/Eye";
import EyeCloseIcon from "@/icons/EyeClose";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface SignupFormProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  designation: string;
  doctorId?: string;
  role: string;
}
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const schema = yup.object({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required").min(8).max(15),
  doctorId: yup.string(),
  phone: yup.string()
    .required("Phone number required")
    .matches(phoneRegExp, 'Phone number is not valid')
    .min(10, "too short")
    .max(10, "too long"),
  designation: yup.string().required("Designation is required").max(25),
  role: yup.string().required('Role is required')
});
export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const { handleSubmit, reset, control, formState: { errors, isSubmitting } } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data : SignupFormProps) => {
    const { firstName, lastName, email, password, phone, designation, doctorId, role } = data
    const formData = new FormData()
    formData.append('firstName', firstName)
    formData.append('lastName', lastName)
    formData.append('email', email)
    formData.append('password', password)
    formData.append('phone', phone)
    formData.append('designation', designation)
    formData.append('role', role)

  }
  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full overflow-y-auto no-scrollbar">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8 flex justify-between items-center">
            <h1 className="mb-2 font-semibold text-2xl">
              Sign Up
            </h1>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* <!-- First Name --> */}
                  <div className="sm:col-span-1">
                    <Label>
                      First Name<span className="text-error-500">*</span>
                    </Label>
                    <Controller
                      control={control}
                      name="firstName"
                      render={({ field }) => (
                        <Input
                          {...field}
                          value={field.value ?? ""}
                          placeholder="Enter First Name"
                        />
                      )}
                    />
                    {
                      errors.firstName && (
                        <p style={{ color: "red", margin: "0", padding: "5px" }}>
                          {errors.firstName.message}
                        </p>
                      )
                    }
                  </div>
                  {/* <!-- Last Name --> */}
                  <div className="sm:col-span-1">
                    <Label>
                      Last Name<span className="text-error-500">*</span>
                    </Label>
                    <Controller
                      control={control}
                      name="lastName"
                      render={({ field }) => (
                        <Input
                          {...field}
                          value={field.value ?? ""}
                          placeholder="Enter Last Name"
                        />
                      )}
                    />
                    {errors.lastName && (
                      <p style={{ color: "red", margin: "0", padding: "5px" }}>
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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
                        {showPassword ? (
                          <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                        ) : (
                          <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                        )}
                      </span>
                    </div>
                    {errors.password && (
                      <p style={{ color: "red", margin: "0", padding: "5px" }}>
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label>Phone<span className="text-error-500">*</span></Label>
                    <div className="relative">
                      <Controller
                        control={control}
                        name="phone"
                        render={({ field }) => (
                          <Input {...field}
                            value={field.value ?? ""}
                            placeholder="Enter Phone No."
                          />
                        )}
                      />
                    </div>
                    {errors.phone && (
                      <p style={{ color: "red", margin: "0", padding: "5px" }}>
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>
                {/* <!-- Button --> */}
                <div>
                  <Button className="w-full text-white" type="submit">
                    {isSubmitting ? "Submitting..." : "Sign Up"}
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-900 sm:text-start">
                Already have an account?
                <Link
                  href="/signin"
                  className="text-custom-600 ml-2"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
