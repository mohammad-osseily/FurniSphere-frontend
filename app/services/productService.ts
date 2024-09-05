// app/services/productService.ts

import axios from "axios";
import { Category, Product3D } from "@/types";

const API_URL = "http://127.0.0.1:8000/api"; // Adjust to your backend URL

/**
 * Fetch all categories with their associated products.
 * @returns A promise that resolves to a list of categories, each with its products.
 */
export const fetchCategoriesWithProducts = async (): Promise<Category[]> => {
  try {
    const response = await axios.get(`${API_URL}/categories-with-products`);
    return response.data.categories;
  } catch (error) {
    console.error("Error fetching categories with products:", error);
    throw error;
  }
};
export const fetchProductsWith3DModels = async (): Promise<Product3D[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/3d`);
    return response.data.products;
  } catch (error) {
    console.error('Failed to fetch 3D products:', error);
    throw error;
  }
}