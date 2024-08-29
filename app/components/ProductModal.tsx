// app/components/ProductModal.tsx
import React from "react";
import { IoArrowBack } from "react-icons/io5";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { addToCart } from "../services/orderServices"; // Import addToCart service

const ProductModal = ({ product, isOpen, onClose }) => {
  const router = useRouter();

  if (!isOpen) return null;

  const handleAddToCart = async () => {
    try {
      await addToCart(product.id, 1); // Add to cart with quantity 1
      alert("Product added to cart successfully!");
      onClose();
    } catch (error) {
      console.error("Failed to add to cart:", error);
      alert("Failed to add product to cart.");
    }
  };

  return (
    
  );
};

export default ProductModal;
