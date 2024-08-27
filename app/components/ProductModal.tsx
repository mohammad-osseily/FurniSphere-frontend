// app/components/ProductModal.tsx
import React, { useEffect, useRef } from "react";

interface ProductModalProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: {
    id: number;
    name: string;
    price: number;
    image: string;
  }) => void; // New prop for handling Add to Cart
}

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        ref={modalRef}
        className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full mx-auto relative flex"
      >
        <button
          className="absolute top-2 right-2 text-gray-700 text-2xl"
          onClick={onClose}
        >
          ✖
        </button>
        <div className="flex-shrink-0 w-64 h-64">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded"
          />
        </div>
        <div className="ml-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
          <p className="text-gray-600 mb-6 text-lg">{product.description}</p>
          <p className="text-2xl font-semibold">${product.price}</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => onAddToCart(product)} // Call the add to cart function
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
