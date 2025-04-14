import { AuthState } from "@/types/authTypes";
import { UserRole } from "@/types/userTypes";
import { create } from "zustand";

export const useAuthStore = create<AuthState>((set) => ({
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  isAuthenticated: typeof window !== "undefined" ? !!localStorage.getItem("token") : false,
  userRole: typeof window !== "undefined" ? (JSON.parse(localStorage.getItem("userRole") || "null") as UserRole | null) : null,
  userCorreo: typeof window !== "undefined" ? localStorage.getItem("userCorreo") : null,
  userImagen: typeof window !== "undefined" ? localStorage.getItem("userImagen") : null,
  userNombre: typeof window !== "undefined" ? localStorage.getItem("userNombre") : null,
  userApellido: typeof window !== "undefined" ? localStorage.getItem("userApellido") : null,
  userFromGoogle:
  typeof window !== "undefined"
    ? (() => {
        const raw = localStorage.getItem("userFromGoogle");
        if (raw === "true") return true;
        if (raw === "false") return false;
        return false; // fallback por si hay algo corrupto
      })()
    : false,

  setUser: (token, role, correo, imagen, nombre, apellido, fromGoogle) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
      localStorage.setItem("userRole", JSON.stringify(role));
      localStorage.setItem("userCorreo", correo);
      localStorage.setItem("userImagen", imagen);
      localStorage.setItem("userNombre", nombre);
      localStorage.setItem("userApellido", apellido);
      localStorage.setItem("userFromGoogle", JSON.stringify(!!fromGoogle));
    }
    set({ token, isAuthenticated: true, userRole: role, userCorreo: correo, userImagen: imagen, userNombre: nombre, userApellido: apellido, userFromGoogle: fromGoogle });
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userCorreo");
      localStorage.removeItem("userImagen");
      localStorage.removeItem("userNombre");
      localStorage.removeItem("userApellido");
      localStorage.removeItem("userFromGoogle");
      localStorage.clear();
    }
    set({ token: null, isAuthenticated: false, userRole: null, userCorreo: null, userImagen: null, userNombre: null, userApellido: null, userFromGoogle: false });
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
