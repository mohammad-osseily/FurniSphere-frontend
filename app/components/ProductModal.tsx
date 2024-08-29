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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="modal-box flex h-2/3 w-full max-w-5xl items-center bg-white   md:w-1/2">
        <div className="flex h-full w-full flex-col md:flex-row">
          <div className="flex w-full flex-row items-center justify-center md:w-1/2 md:flex-col">
            <img
              className="h-3/4 w-3/4"
              src={product.image}
              width={100}
              height={50}
              alt={product.name}
            />
          </div>

          <div className="flex h-full w-full flex-col pt-4 md:w-1/2">
            <div className="pb-4 text-4xl text-black md:text-5xl">
              {product.name}
            </div>
            <div className="pb-4 text-2xl text-black md:text-3xl">
              {product.price}$
            </div>

            <div className="pt-4 text-2xl text-black md:text-3xl">
              Description
            </div>
            <div className="pt-4 text-lg text-black md:text-2xl break-words">
              {product.description}
            </div>

            <button
              onClick={handleAddToCart}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
          <div
            className="cursor-pointer pb-6 pt-6 text-3xl md:pb-0 md:text-4xl"
            onClick={onClose} // Close modal on clicking the arrow
          >
            <IoArrowBack />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
