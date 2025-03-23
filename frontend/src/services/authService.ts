import { api } from "./api";

export const registerUser = async (formData: any) => {
  try {
    const response = await api.post("/register", formData);
    return response.data; // Retorna los datos si el registro fue exitoso
  } catch (error) {
    console.error("Error en el registro:", error);
    throw new Error("Error al registrarse. Intenta de nuevo.");
  }
};
