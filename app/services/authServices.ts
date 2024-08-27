// services/authService.ts
import axios from "axios";
import Swal from "sweetalert2";

export interface User {
  name: string;
  email: string;
  role: string;
}

const API_URL = "http://127.0.0.1:8000/api/auth";

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    const { user, authorization } = response.data;

    // Store the token and user details in localStorage
    localStorage.setItem("token", authorization.token);
    localStorage.setItem("user", JSON.stringify(user));

    Swal.fire("Success", "You have logged in successfully!", "success");

    return { user, token: authorization.token };
  } catch (error: any) {
    Swal.fire(
      "Error",
      error.response?.data?.message || "Login failed",
      "error"
    );
    throw error;
  }
};
