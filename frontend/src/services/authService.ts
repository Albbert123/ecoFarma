import { GoogleUserFormData, LoginFormData, RegisterFormData } from "@/types/userTypes";
import { api } from "./api";
import { useAuthStore } from "@/stores/authStore";

export const registerUser = async (formData: RegisterFormData) => {
  try {
    const response = await api.post("/users/register", formData);
    return response.data; // Retorna los datos si el registro fue exitoso
  } catch (error: any) {
    const errorMessage = error.response?.data?.detail || "Error en el registro";
    throw new Error(errorMessage);
  }
};

export const loginUser = async (formData: LoginFormData) => {
  try {
    const response = await api.post("/users/login", formData);
    return response.data; // Retorna los datos del usuario si el login es exitoso
  } catch (error: any) {
    const errorMessage = error.response?.data?.detail || "Error en el inicio de sesión";
    throw new Error(errorMessage);
  }
};

export const createOrUpdateGoogleUser = async (formData: GoogleUserFormData) => {
  try {
    console.log(formData);
    const response = await api.post("/users/auth/google", formData);
    const { token, rol, correo } = response.data;
    console.log("Google user created/updated:", response.data);
    useAuthStore.getState().setUser(token, rol, correo);
    return response.data;
  } catch (error) {
    console.error("Error creating/updating Google user:", error);
    throw error;
  }
};
