"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "../../store/store";
import { loginUser } from "../../store/slices/authSlice";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const { user, loading, error } = useSelector(
    (state: RootState) => state.auth
  );
