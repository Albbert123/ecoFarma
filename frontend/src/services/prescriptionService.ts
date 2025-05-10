import { api } from "./api";
import { Prescription, PrescriptionType } from "../types/prescriptionTypes";

export const getPrescriptions = async (user: string) => {
    try {
        const response = await api.get(`/prescriptions/${user}`);
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.detail || "Error al obtener las recetas";
        throw new Error(errorMessage);
    }
};

export const uploadPrescription = async (user: string, type: PrescriptionType, file: File) => {
    const formData = new FormData();
    formData.append("type", type);
    formData.append("file", file);

    try {
        const response = await api.post(`/prescriptions/upload/${user}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        });
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.detail || "Error al subir la receta";
        throw new Error(errorMessage);
    }
};

export const deletePrescription = async (prescriptionId: string) => {
  try {
    const response = await api.delete(`/prescriptions/${prescriptionId}`);
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.detail || "Error al eliminar la receta";
    throw new Error(errorMessage);
  }
};
