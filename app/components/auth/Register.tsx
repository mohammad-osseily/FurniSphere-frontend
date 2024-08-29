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
