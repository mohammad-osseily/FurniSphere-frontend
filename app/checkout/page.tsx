// app/checkout/page.tsx
"use client";

import { useState } from "react";
import { placeOrder } from "../services/orderServices";
import { useRouter } from "next/navigation";

const CheckoutPage = () => {
  const [addressLine, setAddressLine] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

