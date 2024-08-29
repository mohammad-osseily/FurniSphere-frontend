// app/products/page.tsx
"use client";
import { useEffect, useState } from "react";
import { fetchCategoriesWithProducts } from "../services/productService";
import { Category } from "@/types";
import ProductModal from "../components/ProductModal";
import { addToCart } from "../services/orderServices";

const ProductsPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await fetchCategoriesWithProducts();
        setCategories(categoriesData);
      } catch (err) {
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const handleAddToCart = async (product: {
    id: number;
    name: string;
    price: number;
    image: string;
  }) => {
    try {
      await addToCart(product.id, 1); // Add to cart with quantity 1
      alert("Product added to cart successfully!");
    } catch (error) {
      console.error("Failed to add to cart:", error);
      alert("Failed to add product to cart.");
    }
  };

  const openModal = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    
        ))
      ) : (
        <div>No categories found.</div>
      )}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default ProductsPage;
