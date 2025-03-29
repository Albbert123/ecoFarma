import { UserRole } from "./userTypes";

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  userRole: UserRole | null;
  userCorreo: string | null;
  userImagen: string | null;
  userNombre: string | null;
  userApellido: string | null;
  setUser: (token: string, role: UserRole, correo: string, imagen: string, nombre: string, apellido: string) => void;
  logout: () => void;
  isTokenExpired: () => boolean;
}