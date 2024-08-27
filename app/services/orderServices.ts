// services/orderServices.ts
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

export const getOrderHistory = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/orders/history`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.orders;
  } catch (error) {
    console.error("Error fetching order history:", error);
    throw error;
  }
};
