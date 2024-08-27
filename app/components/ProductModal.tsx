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

