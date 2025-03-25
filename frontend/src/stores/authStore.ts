import { UserRole } from "@/types/userTypes";
import { create } from "zustand";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  userRole: UserRole | null;
  userCorreo: string | null;
  setUser: (token: string, role: UserRole, correo: string) => void;
  logout: () => void;
  isTokenExpired: () => boolean;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  isAuthenticated: typeof window !== "undefined" ? !!localStorage.getItem("token") : false,
  userRole: typeof window !== "undefined" ? (JSON.parse(localStorage.getItem("userRole") || "null") as UserRole | null) : null,
  userCorreo: typeof window !== "undefined" ? localStorage.getItem("userCorreo") : null,

  setUser: (token, role, correo) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
      localStorage.setItem("userRole", JSON.stringify(role));
      localStorage.setItem("userCorreo", correo);
    }
    set({ token, isAuthenticated: true, userRole: role, userCorreo: correo });
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userCorreo");
    }
    set({ token: null, isAuthenticated: false, userRole: null, userCorreo: null });
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
