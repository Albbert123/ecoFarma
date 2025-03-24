import { LoginFormData, RegisterFormData } from "@/types/userTypes";
import { api } from "./api";

export const registerUser = async (formData: RegisterFormData) => {
  try {
    const response = await api.post("/users/register", formData);
    return response.data; // Retorna los datos si el registro fue exitoso
  } catch (error) {
    console.error("Error en el registro:", error);
    throw new Error("Error al registrarse. Intenta de nuevo.");
  }
};

export const loginUser = async (formData: LoginFormData) => {
  try {
    const response = await api.post("/users/login", formData);
    return response.data; // Retorna los datos del usuario si el login es exitoso
  } catch (error) {
    throw new Error("Credenciales incorrectas");
  }
};
