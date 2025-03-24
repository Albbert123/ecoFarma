import { UserRole } from "@/types/userTypes";
import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  userRole: UserRole | null;
  userCorreo: string | null;
  setUser: (role: UserRole, correo: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  userRole: null,
  userCorreo: null,

  setUser: (role, correo) => {
    set({ isAuthenticated: true, userRole: role, userCorreo: correo });
  },

  logout: () => {
    set({ isAuthenticated: false, userRole: null, userCorreo: null });
  },
}));
