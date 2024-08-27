import { Product } from "@/types";
import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api"; // Replace with your actual API base URL

export const fetchProductsByCategory = async (
  categoryId: number
): Promise<Product[]> => {
  const response = await axios.get<Product[]>(
    `${API_BASE_URL}/categories/${categoryId}/products`
  );
  return response.data;
};
