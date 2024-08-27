import { Product } from "@/types";
import React from "react";
import Modal from "react-modal";

// Ensure that the modal is attached to your app's root element
if (typeof window !== "undefined") {
  Modal.setAppElement("body");
}

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onRequestClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onRequestClose,
}) => {
  if (!product) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Product Details"
      className="bg-white rounded-lg p-6 w-full max-w-lg mx-auto my-16 relative"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <button
        onClick={onRequestClose}
        className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 text-xl font-bold"
      >
        &times;
      </button>
      <div className="mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-auto rounded-lg"
        />
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <p className="text-xl font-bold text-primary">{product.price} $</p>
      </div>
    </Modal>
  );
};

export default ProductModal;
