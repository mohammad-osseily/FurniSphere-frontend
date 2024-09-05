"use client";

import React from "react";
import { useForm } from "react-hook-form";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useRouter } from "next/navigation";
import { loginUser } from "../../services/authServices";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import Link from "next/link";
import { BsPerson, BsLock } from "react-icons/bs";
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await loginUser(data.email, data.password);

      Swal.fire({
        title: "Success!",
        text: "You have logged in successfully!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        router.push("/");
      });
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: "Login failed. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="flex justify-center bg-login-bg items-center min-h-screen bg-cover bg-center">
      <div className="w-[600px] bg-white bg-opacity-50 backdrop-blur-xl shadow-lg text-black rounded-lg p-8">
        <h1 className="text-3xl text-left">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="relative pb-5">
            <div className="pb-2">Email</div>
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
              className="w-full h-12 bg-accent pl-9 border border-primary border-opacity-20 rounded-xl px-6 text-black placeholder-neutral outline-none"
            />
            <PersonOutlinedIcon className="absolute  left-3 top-[55%] transform -translate-y-1/2 text-lg text-black" />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="relative">
            <div className="pb-2">Password</div>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
              className="w-full pl-9 h-12 bg-accent border border-primary border-opacity-20 rounded-xl px-6 text-black placeholder-neutral outline-none"
            />
            <LockOutlinedIcon className="absolute left-3 top-[53%] transform-translate-y-1/2 text-lg text-black" />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className=" flex justify-center">
            <button
              type="submit"
              className="w-36 h-12 bg-primary text-white rounded-xl shadow-lg mt-4 hover:opacity-90 hover:text-white"
            >
              LogIn
            </button>
          </div>
        </form>
        <div className="text-center text-sm mt-6">
          <p>
            Don't have an account?{" "}
            <Link href="/register" className=" hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
