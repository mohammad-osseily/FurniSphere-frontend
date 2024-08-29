// app/components/CheckoutPage.tsx
'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createOrder } from "../services/orderServices";

const CheckoutPage = () => {
  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("");
  const [comment, setComment] = useState("");
  const router = useRouter();

