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
