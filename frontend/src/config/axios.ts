// src/config/axios.ts
import axios from "axios";
import { useAuthStore } from "@/features/auth/store/useAuthStore";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // e.g. http://localhost:4000/api
  withCredentials: true,
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Optionally handle 401 globally
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      useAuthStore.getState().clearAuth();
    }
    return Promise.reject(err);
  }
);

export default api;
