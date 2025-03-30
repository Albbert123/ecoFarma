import { ForgotPasswordFormData, LoginFormData, RegisterFormData, UpdateFormData } from "@/types/userTypes";
import { api } from "./api";

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

export const deleteUser = async (correo: string) => {
  try {
    await api.delete("/users/delete", { data: { correo } });
  } catch (error: any) {
    const errorMessage = error.response?.data?.detail || "Error al eliminar la cuenta";
    throw new Error(errorMessage);
  }
} 

export const updateUser = async (formData: UpdateFormData) => {
  try {
    const response = await api.put("/users/update", formData);
    return response.data; // Retorna los datos del usuario actualizados
  } catch (error: any) {
    const errorMessage = error.response?.data?.detail || "Error al actualizar el usuario";
    throw new Error(errorMessage);
  }
}

export const sendResetCode = async (correo: string) => {
  try {
    const response = await api.post("/users/send-reset-code", {  correo  });
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.detail || "Error al enviar el código de recuperación";
    throw new Error(errorMessage);  
  }
}

export const resetPassword = async (formData: ForgotPasswordFormData) => {
  try {
    await api.post("/users/reset-password", formData);
    return true; // Retorna true si el reseteo fue exitoso
  } catch (error: any) {
    const errorMessage = error.response?.data?.detail || "Error al resetear la contraseña";
    throw new Error(errorMessage);
  }
}

export const getUser = async (correo: string) => {
  try {
    const response = await api.get("/users/user", { data: { correo } });
    return response.data; // Retorna los datos del usuario
  } catch (error: any) {
    const errorMessage = error.response?.data?.detail || "Error al obtener el usuario";
    throw new Error(errorMessage);
  }
}

export const getUsers = async () => {
  try {
    const response = await api.get("users/all");
    return response.data; // Retorna los datos de los usuarios
  } catch (error: any) {
    const errorMessage = error.response?.data?.detail || "Error al obtener los usuarios";
    throw new Error(errorMessage);
  }
}
