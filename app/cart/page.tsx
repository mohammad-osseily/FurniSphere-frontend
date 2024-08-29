// app/cart/page.tsx
"use client";

import { useEffect, useState } from "react";
import { getCart, clearCart } from "../services/orderServices";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const [cart, setCart] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadCart = async () => {
      try {
        const cartData = await getCart();
        setCart(cartData.cart);
      } catch (err) {
        setError("Failed to load cart");
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, []);

  const handleCheckout = () => {
    router.push("/checkout");
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
      setCart(null);
      alert("Cart cleared successfully!");
    } catch (error) {
      alert("Failed to clear cart.");
    }
  };

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  if (!cart || cart.cartProducts.length === 0)
    return <div>Your cart is empty.</div>;

  return (
    
  );
};

export default CartPage;
