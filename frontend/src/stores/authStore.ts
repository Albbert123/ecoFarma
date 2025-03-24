import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  userRole: "usuario" | "farmaceutico" | "admin" | null;
  userCorreo: string;
  setUser: (role: "usuario" | "farmaceutico" | "admin", correo: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  userRole: null,
  userCorreo: "",

  setUser: (role, correo) => {
    set({ isAuthenticated: true, userRole: role, userCorreo: correo });
  },

  logout: () => {
    set({ isAuthenticated: false, userRole: null, userCorreo: "" });
  },
}));
