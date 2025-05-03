import { Query } from "@/types/queryTypes";
import { api } from "./api";

export const getQueriesByUser = async (user: string) => {
  try {
    const response = await api.get(`/queries/${user}`);
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.detail || "Error al obtener las consultas";
    throw new Error(errorMessage);
  }
}

export const sendConsultation = async (query: Query) => {
  try {
    const response = await api.post("/queries", query);
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.detail || "Error al enviar la consulta";
    throw new Error(errorMessage);
  }
}