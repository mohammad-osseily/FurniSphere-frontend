"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { registerUser } from "../../services/authServices";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import Link from "next/link";
import { BsPerson, BsLock, BsEnvelope } from "react-icons/bs";

interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const Register: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      await registerUser(data.name, data.email, data.password);

      Swal.fire({
        title: "Success!",
        text: "You have registered successfully!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        router.push("/");
      });
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: "Registration failed. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="flex justify-center bg-login-bg items-center min-h-screen bg-cover bg-center">
      <div className="w-[600px] bg-white bg-opacity-50 backdrop-blur-xl shadow-lg text-black rounded-lg p-8">
        <h1 className="text-3xl text-left">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="relative pb-5">
            <div className="pb-2">Name</div>
            <input
              type="text"
              placeholder="Name"
              {...register("name", { required: "Name is required" })}
              className="w-full h-12 bg-accent border border-primary border-opacity-20 rounded-xl px-6 text-black placeholder-neutral outline-none"
            />
            <BsPerson className="absolute right-4 top-[55%] transform -translate-y-1/2 text-xl text-black" />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div className="relative pb-5">
            <div className="pb-2">Email</div>
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
              className="w-full h-12 bg-accent border border-primary border-opacity-20 rounded-xl px-6 text-black placeholder-neutral outline-none"
            />
            <BsEnvelope className="absolute right-4 top-[55%] transform -translate-y-1/2 text-xl text-black" />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="relative pb-5">
            <div className="pb-2">Password</div>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
              className="w-full h-12 bg-accent border border-primary border-opacity-20 rounded-xl px-6 text-black placeholder-neutral outline-none"
            />
            <BsLock className="absolute right-4 top-[55%] transform-translate-y-1/2 text-xl text-black" />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div className="relative">
            <div className="pb-2">Confirm Password</div>
            <input
              type="password"
              placeholder="Confirm your password"
              {...register("password_confirmation", {
                required: "Please confirm your password",
              })}
              className="w-full h-12 bg-accent border border-primary border-opacity-20 rounded-xl px-6 text-black placeholder-neutral outline-none"
            />
            <BsLock className="absolute right-4 top-[55%] transform-translate-y-1/2 text-xl text-black" />
            {errors.password_confirmation && (
              <p className="text-red-500 text-sm">
                {errors.password_confirmation.message}
              </p>
            )}
          </div>

          <div className=" flex justify-center">
            <button
              type="submit"
              className="w-36 h-12 bg-primary text-white rounded-xl shadow-lg mt-4 hover:opacity-90 hover:text-white"
            >
              Register
            </button>
          </div>
        </form>
        <div className="text-center text-sm mt-6">
          <p>
            Already have an account?{" "}
            <Link href="/login" className=" hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
