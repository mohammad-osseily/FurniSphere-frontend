"use client";

import { useEffect, useState } from "react";
import { getCart, submitOrder, clearCart } from "../services/orderServices";
import Swal from "sweetalert2";
import { Cart } from "@/types/cart";
import { CartProduct } from "@/types/cartProduct";
import { useRouter } from "next/navigation";

const CheckoutPage = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const router = useRouter();

  

    try {
      await submitOrder(orderData);
      await clearCart(); // Clear the cart after placing the order
      Swal.fire(
        "Success",
        "Your order has been placed successfully!",
        "success",
      ).then(() => {
        if (typeof window !== "undefined") {
          router.push("/"); // Redirect to homepage or orders page after successful order
        }
      });
    } catch (error) {
      Swal.fire("Error", "Failed to place order. Please try again.", "error");
      console.error("Failed to place order:", error);
    }
  };

  

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-3xl font-semibold mb-6">Checkout</h2>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Shipping Information</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Address Line"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border rounded px-4 py-2"
          />
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full border rounded px-4 py-2"
          />
          <textarea
            placeholder="Additional Comments"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border rounded px-4 py-2"
          />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Order Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Sub Total:</span>
            <span>${roundedSubTotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Taxes:</span>
            <span>${taxes}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Price:</span>
            <span>${deliveryPrice}</span>
          </div>
          <hr />
          <div className="flex justify-between font-semibold">
            <span>Total:</span>
            <span>${total}</span>
          </div>
        </div>
      </div>

      <button
        onClick={handlePlaceOrder}
        className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Place Order
      </button>
    </div>
  );
};

export default CheckoutPage;
