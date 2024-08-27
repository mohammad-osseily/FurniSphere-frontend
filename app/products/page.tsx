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

    loadCategories();
  }, []);

  const handleAddToCart = (product: {
    id: number;
    name: string;
    price: number;
    image: string;
  }) => {
    // Implement your add to cart functionality here
    console.log("Adding to cart:", product);
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
    <div className="container mx-auto">
      {categories.length > 0 ? (
        categories.map((category) => (
          <div key={category.id} className="mb-10">
            <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
            <div className="grid grid-cols-3 gap-4">
              {category.products?.map((product) => (
                <div
                  key={product.id}
                  className="p-4 bg-white shadow rounded cursor-pointer"
                  onClick={() => openModal(product)} // Open modal when the product card is clicked
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-32 object-cover"
                  />
                  <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-gray-500">${product.price}</p>
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent modal from opening when the button is clicked
                        handleAddToCart(product);
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div>No categories found.</div>
      )}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeModal}
        onAddToCart={handleAddToCart} // Pass the add to cart handler to the modal
      />
    </div>
  );
};

export default ProductsPage;
