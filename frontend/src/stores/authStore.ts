import { UserRole } from "@/types/userTypes";
import { create } from "zustand";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  userRole: UserRole | null;
  userCorreo: string | null;
  userImagen: string | null;
  setUser: (token: string, role: UserRole, correo: string, imagen: string) => void;
  logout: () => void;
  isTokenExpired: () => boolean;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  isAuthenticated: typeof window !== "undefined" ? !!localStorage.getItem("token") : false,
  userRole: typeof window !== "undefined" ? (JSON.parse(localStorage.getItem("userRole") || "null") as UserRole | null) : null,
  userCorreo: typeof window !== "undefined" ? localStorage.getItem("userCorreo") : null,
  userImagen: typeof window !== "undefined" ? localStorage.getItem("userImagen") : null,

  setUser: (token, role, correo, imagen) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
      localStorage.setItem("userRole", JSON.stringify(role));
      localStorage.setItem("userCorreo", correo);
      localStorage.setItem("userImagen", imagen);
    }
    set({ token, isAuthenticated: true, userRole: role, userCorreo: correo, userImagen: imagen });
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userCorreo");
      localStorage.removeItem("userImagen");
    }
    set({ token: null, isAuthenticated: false, userRole: null, userCorreo: null, userImagen: null });
  },

  isTokenExpired: () => {
    if (typeof window === "undefined") return true; // Si está en SSR, asumir que expiró

    const token = localStorage.getItem("token");
    if (!token) return true; // Si no hay token, ya expiró

    try {
      const payload = JSON.parse(atob(token.split(".")[1])); // Decodificar el JWT
      const exp = payload.exp * 1000; // Convertir a milisegundos
      return Date.now() > exp; // Comparar con la fecha actual
    } catch (error) {
      return true; // Si hay error al decodificar, asumir que expiró
    }
  },
}));
