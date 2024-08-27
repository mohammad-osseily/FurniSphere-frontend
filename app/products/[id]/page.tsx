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

