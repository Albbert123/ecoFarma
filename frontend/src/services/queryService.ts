import { api } from "./api";

export const getConsultationsByUser = async (user: string) => {
  try {
    const response = await api.get(`/queries/${user}`);
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.detail || "Error al obtener las consultas";
    throw new Error(errorMessage);
  }
}