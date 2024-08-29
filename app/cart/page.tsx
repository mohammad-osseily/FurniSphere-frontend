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
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-6">Your Cart</h1>
      <ul>
        {cart.cartProducts.map((product) => (
          <li key={product.id} className="mb-4">
            <div className="flex justify-between">
              <div>
                <h2 className="text-xl font-semibold">{product.product.name}</h2>
                <p>{product.quantity} x ${product.price}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded ml-4 hover:bg-red-600"
          onClick={handleClearCart}
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default CartPage;
