"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "../../store/store";
import { loginUser } from "../../store/slices/authSlice";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import Link from "next/link";
import { BsPerson, BsLock } from "react-icons/bs";

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
