import { Query } from "@/types/queryTypes";
import { api } from "./api";

export const getAllQueries = async () => {
  try {
    const response = await api.get("/queries");
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.detail || "Error al obtener las consultas";
    throw new Error(errorMessage);
  }
}

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

export const sendQuery = async (query: Query) => {
  try {
    const response = await api.post("/queries", query);
    return response.data;
  } catch (error: any) {
    const errorMessage =
    error.response?.data?.detail || "Error al enviar la consulta";
    throw new Error(errorMessage);
  }
}

export const updateQueryStatus = async (query_id: string, answer: string, status: string) => {
  try {
    const response = await api.put(`/queries/${query_id}`, { answer, status });
    return response.data;
  } catch (error: any) {
    const errorMessage =
    error.response?.data?.detail || "Error al actualizar el estado";
    throw new Error(errorMessage);
  }
}