"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { loginUser } from "../../services/authServices";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import Link from "next/link";
import { BsPerson, BsLock } from "react-icons/bs";

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


