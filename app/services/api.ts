// app/services/api.ts
import axios from "axios";

const API = axios.create({
  baseURL: "http://13.36.244.88/backend/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
