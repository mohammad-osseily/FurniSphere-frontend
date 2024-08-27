// app/products/[id].tsx

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchCategoryById } from "../../services/productService";
import { Category } from "@/types";
import Modal from "react-modal";

const CategoryPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (id) {
      const loadCategory = async () => {
        try {
          const categoryData = await fetchCategoryById(parseInt(id as string));
          setCategory(categoryData);
        } catch (err) {
          setError("Failed to load category");
        } finally {
          setLoading(false);
        }
      };

      loadCategory();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="container mx-auto">
      {category ? (
        <>
          <h1 className="text-3xl font-bold mb-8">{category.name}</h1>
          <div className="grid grid-cols-3 gap-4">
            {category.products?.map((product) => (
              <div
                key={product.id}
                className="p-4 bg-white shadow rounded cursor-pointer"
                onClick={() => openModal(product)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-32 object-cover"
                />
                <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
                <p className="text-gray-500">${product.price}</p>
