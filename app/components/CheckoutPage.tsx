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

  const handleOrderSubmit = async (e : any) => {
    e.preventDefault();
    try {
      await createOrder(addressLine, city, comment);
      alert("Order placed successfully!");
      router.push("/profile"); // Navigate to the profile page after order
    } catch (error) {
      console.error("Failed to place order:", error);
      alert("Failed to place the order.");
    }
  };

