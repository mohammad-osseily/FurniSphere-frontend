// app/products/page.tsx
"use client";
import { useEffect, useState } from "react";
import { fetchCategoriesWithProducts } from "../services/productService";
import { Category } from "@/types";
import ProductModal from "../components/ProductModal"; // Import ProductModal

const ProductsPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null); // For modal
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

