// app/cart/page.tsx
"use client";

import { useEffect, useState } from "react";
import { getCart, removeFromCart, updateCartQuantity } from "../services/orderServices";
import { Cart } from "@/types/cart";
import { CartProduct } from "@/types/cartProduct";

const CartPage = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await getCart();
        setCart(cartData.cart);
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
          cart_products: prevCart.cart_products.filter(item => item.id !== id),
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
          cart_products: prevCart.cart_products.map(item => 
            item.id === id ? { ...item, quantity } : item
          ),
        };
      });
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  if (!cart) return <div>Your cart is empty.</div>;

  const subTotal = cart.cart_products.reduce((total, item) => {
    const price = typeof item.product.price === 'string' ? parseFloat(item.product.price) : item.product.price;
    
    return total + price * item.quantity;
  }, 0);

  const roundedSubTotal = subTotal.toFixed(2);
  const taxes = (subTotal * 0.10).toFixed(2); // 10% tax
  const deliveryPrice = 0; // Adjust this based on your logic
  const total = (subTotal + deliveryPrice + parseFloat(taxes)).toFixed(2);

  return (
    <div className="container mx-auto py-10 flex space-x-10">
      <div className="w-3/4">
        <h2 className="text-3xl font-semibold mb-6">Your Cart List</h2>
        {cart.cart_products.map((item: CartProduct) => (
          <div key={item.id} className="flex mb-6 items-center space-x-4">
            <img src={item.product.image} alt={item.product.name} className="w-32 h-32 object-cover rounded-lg" />
            <div className="flex-grow">
              <h3 className="text-xl font-semibold">{item.product.name}</h3>
              <p>Category: {item.product.category_id || "N/A"}</p> {/* Add optional chaining */}
              <p>Product Color: {item.product.color}</p>
              <div className="flex items-center space-x-2 mt-2">
                <button
                  className="px-2 py-1 border rounded"
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  −
                </button>
                <span className="text-lg">{item.quantity}</span>
                <button
                  className="px-2 py-1 border rounded"
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="text-lg font-semibold">${item.product.price}</div>
            <button className="text-red-600" onClick={() => handleRemove(item.id)}>
              🗑️
            </button>
          </div>
        ))}
      </div>
      <div className="w-1/4">
        <h2 className="text-3xl font-semibold mb-6">Detail Summary</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Sub Total:</span>
            <span>${roundedSubTotal}</span>
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
          <button className="w-full py-2 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
