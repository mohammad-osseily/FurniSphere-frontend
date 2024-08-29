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

  const handleSubmit = async () => {
    try {
      const orderData = {
        address_line: addressLine,
        city: city,
        comment: comment,
      };
      await placeOrder(orderData);
      alert("Order placed successfully!");
      router.push("/profile/order-history");
    } catch (err) {
      setError("Failed to place order");
    }
  };

