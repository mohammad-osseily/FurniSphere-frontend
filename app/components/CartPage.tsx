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


