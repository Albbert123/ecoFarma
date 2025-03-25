import axios from 'axios';
import { useAuthStore } from "@/stores/authStore";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"; // Cambiar por la URL real
//cuando tenga la real hay q ponerla en el .env.local NEXT_PUBLIC_API_URL=https://mi-backend.com/api

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptar respuestas
api.interceptors.response.use(
  (response) => response, // Si la respuesta es correcta, devolverla
  (error) => {
    if (error.response?.status === 401) {
      const errorMessage = error.response?.data?.detail || "";
      
      // Si el error es "Token expirado", hacer logout
      if (errorMessage.toLowerCase().includes("token expirado")) {
        const { logout } = useAuthStore.getState();
        logout();
      }
    }
    return Promise.reject(error);
  }
);