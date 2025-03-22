import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  userRole: "usuario" | "farmaceutico" | "admin" | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: any) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  userRole: null,

  login: async (email, password) => {
    if (email === "admin@admin.com" && password === "1234") {
      set({ isAuthenticated: true, userRole: "admin" });
      return true;
    } else {
      return false;
    }
  },

  register: async (data) => {
    console.log("Registrando usuario:", data);
    set({ isAuthenticated: true, userRole: "usuario" });
    return true;
  },

  logout: () => {
    set({ isAuthenticated: false, userRole: null });
  },
}));
