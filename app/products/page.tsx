// app/products/page.tsx
"use client";
import { useEffect, useState } from "react";
import { fetchCategoriesWithProducts } from "../services/productService";
import { Category } from "@/types";

const ProductsPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto">
      {categories.length > 0 ? (
        categories.map((category) => (
          <div key={category.id} className="mb-10">
            <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
            <div className="grid grid-cols-3 gap-4">
              {category.products?.map((product) => (
                <div key={product.id} className="p-4 bg-white shadow rounded">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-32 object-cover"
                  />
                  <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
                  <p className="text-gray-500">${product.price}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div>No categories found.</div>
      )}
    </div>
  );
};

export default ProductsPage;
