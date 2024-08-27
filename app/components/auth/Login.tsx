"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import Link from "next/link";
import { BsPerson, BsLock } from "react-icons/bs";
import { loginUser } from "../../services/authServices"; // Import the loginUser function

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

  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (data: LoginFormInputs) => {
    setLoading(true);
    try {
      // Call loginUser from authService and pass the form data
      await loginUser(data.email, data.password);

      // Navigate to the home page after successful login
      router.push("/");
    } catch (error) {
      // Error handling is already managed in the loginUser function via SweetAlert
    } finally {
      setLoading(false);
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
              className="w-full h-12 bg-accent border border-primary border-opacity-20 rounded-xl px-6 text-black placeholder-neutral outline-none"
            />
            <BsPerson className="absolute right-4 top-[55%] transform -translate-y-1/2 text-xl text-black" />
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
              className="w-full h-12 bg-accent border border-primary border-opacity-20 rounded-xl px-6 text-black placeholder-neutral outline-none"
            />
            <BsLock className="absolute right-4 top-[55%] transform-translate-y-1/2 text-xl text-black" />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-36 h-12 bg-primary text-white rounded-full shadow-lg mt-4 hover:opacity-90 hover:text-white"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </div>
        </form>
        <div className="text-center text-sm mt-6">
          <p>
            Don't have an account?{" "}
            <Link href="/register" className="hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
