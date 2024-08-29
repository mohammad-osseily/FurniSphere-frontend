// app/components/CartPage.tsx
'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCartProducts, removeProductFromCart } from "../services/orderServices";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const products = await getCartProducts();
        setCartItems(products);
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemoveFromCart = async (id : any) => {
    try {
      await removeProductFromCart(id);
      setCartItems(cartItems.filter((item :any) => item.id !== id));
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    }
  };

  const handleCheckout = () => {
    router.push("/checkout");
  };


