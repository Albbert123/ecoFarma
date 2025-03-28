import { UserRole } from "./userTypes";

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  userRole: UserRole | null;
  userCorreo: string | null;
  userImagen: string | null;
  setUser: (token: string, role: UserRole, correo: string, imagen: string) => void;
  logout: () => void;
  isTokenExpired: () => boolean;
}