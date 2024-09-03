"use client";

import { useEffect, useState } from "react";
import {
  getCart,
  removeFromCart,
  updateCartQuantity,
} from "../services/orderServices";
import { Cart } from "@/types/cart";
import { CartProduct } from "@/types/cartProduct";
import Link from "next/link";

const CartPage = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [subTotal, setSubTotal] = useState<string>("0.00");
  const [taxes, setTaxes] = useState<string>("0.00");
  const [deliveryPrice, setDeliveryPrice] = useState<string>("0.00");
  const [total, setTotal] = useState<string>("0.00");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await getCart();
        setCart(cartData.cart);
        setSubTotal(cartData.sub_total);
        setTaxes(cartData.taxes);
        setDeliveryPrice(cartData.delivery_price);
        setTotal(cartData.total);
      } catch (error) {
        console.error("Failed to load cart:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleRemove = async (id: number) => {
    try {
      await removeFromCart(id);
      setCart((prevCart) => {
        if (!prevCart) return prevCart;

        return {
          ...prevCart,
          cart_products: prevCart.cart_products.filter(
            (item) => item.id !== id,
          ),
        };
      });
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  const handleQuantityChange = async (id: number, quantity: number) => {
    try {
      await updateCartQuantity(id, quantity);
      setCart((prevCart) => {
        if (!prevCart) return prevCart;

        return {
          ...prevCart,
          cart_products: prevCart.cart_products.map((item) =>
            item.id === id ? { ...item, quantity } : item,
          ),
        };
      });
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  if (!cart) return <div>Your cart is empty.</div>;

  return (
    <div className="container mx-auto py-10 px-4 space-y-10 lg:flex lg:space-x-10 lg:space-y-0">
      <div className="w-full lg:w-3/4">
        <h2 className="text-3xl font-semibold mb-6 text-center lg:text-left">
          Your Cart List
        </h2>
        {cart.cart_products.map((item: CartProduct) => (
          <div
            key={item.id}
            className="flex flex-col lg:flex-row mb-6 items-center lg:space-x-4 space-y-4 lg:space-y-0"
          >
            <img
              src={item.product.image}
              alt={item.product.name}
              className="w-32 h-32 object-cover rounded-lg mx-auto lg:mx-0"
            />
            <div className="flex-grow text-center lg:text-left">
              <h3 className="text-xl font-semibold">{item.product.name}</h3>
              <p>Category: {item.product.category_id || "N/A"}</p>
              <p>Product Color: {item.product.color}</p>
              <div className="flex items-center justify-center lg:justify-start space-x-2 mt-2">
                <button
                  className="px-2 py-1 border rounded"
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity - 1)
                  }
                  disabled={item.quantity <= 1}
                >
                  −
                </button>
                <span className="text-lg">{item.quantity}</span>
                <button
                  className="px-2 py-1 border rounded"
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity + 1)
                  }
                >
                  +
                </button>
              </div>
            </div>
            <div className="text-lg font-semibold">${item.product.price}</div>
            <button
              className="text-red-600"
              onClick={() => handleRemove(item.id)}
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
      <div className="w-full lg:w-1/4">
        <h2 className="text-3xl font-semibold mb-6 text-center lg:text-left">
          Detail Summary
        </h2>
        <div className="space-y-2 bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between">
            <span>Sub Total:</span>
            <span>${subTotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Price:</span>
            <span>${deliveryPrice}</span>
          </div>
          <div className="flex justify-between">
            <span>Taxes:</span>
            <span>${taxes}</span>
          </div>
          <hr />
          <div className="flex justify-between font-semibold">
            <span>Total:</span>
            <span>${total}</span>
          </div>
          <Link href={"/checkout"}>
            <button className="w-full py-2 mt-4 bg-primary text-white rounded-xl hover:bg-blue-700">
              Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
