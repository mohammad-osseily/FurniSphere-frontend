"use client";
import React, { useState } from "react";
import ProductModal from "./ProductModal";
import { Category, Product } from "@/types";

interface ProductPageProps {
  categories: Category[];
}

const ProductPage: React.FC<ProductPageProps> = ({ categories }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="container mx-auto p-4">
      {categories?.map((category) => (
        <div key={category.id} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {category.products?.map((product: any) => (
              <div
                key={product.id}
                className="border rounded-lg p-4 cursor-pointer hover:shadow-lg"
                onClick={() => handleProductClick(product)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto mb-4"
                />
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-primary font-bold">{product.price} $</p>
              </div>
            ))}
          </div>
        </div>
      ))}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onRequestClose={closeModal}
      />
    </div>
  );
};

export default ProductPage;
