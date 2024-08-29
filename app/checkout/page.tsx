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

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-6">Checkout</h1>
      <div className="mb-4">
        <label className="block mb-2 text-xl">Address Line</label>
        <input
          type="text"
          value={addressLine}
          onChange={(e) => setAddressLine(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-xl">City</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-xl">Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        ></textarea>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleSubmit}
      >
        Place Order
      </button>
    </div>
  );
};

export default CheckoutPage;
