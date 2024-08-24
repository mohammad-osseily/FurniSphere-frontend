"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "../../store/store";
import { registerUser } from "../../store/slices/authSlice";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const Register: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();
  const { user, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

