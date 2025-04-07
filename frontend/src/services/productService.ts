import { api } from "./api";
import { ProductFormData, UpdateProductData } from "@/types/productTypes";

export const getProducts = async () => {
  try {
    const response = await api.get("/products/");
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.detail || "Error al obtener los productos";
    throw new Error(errorMessage);
  }
};

export const getProduct = async (nregistro: string) => {
  try {
    const response = await api.get(`/products/${nregistro}`);
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.detail || "Error al obtener el producto";
    throw new Error(errorMessage);
  }
};

export const createProduct = async (formData: ProductFormData) => {
  try {
    const response = await api.post("/products/", formData);
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.detail || "Error al crear el producto";
    throw new Error(errorMessage);
  }
};

export const updateProduct = async (nregistro: string, updatedFields: UpdateProductData) => {
  try {
    const response = await api.put(`/products/${nregistro}`, updatedFields);
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.detail || "Error al actualizar el producto";
    throw new Error(errorMessage);
  }
};

export const deleteProduct = async (nregistro: string) => {
  try {
    await api.delete(`/products/${nregistro}`);
  } catch (error: any) {
    const errorMessage = error.response?.data?.detail || "Error al eliminar el producto";
    throw new Error(errorMessage);
  }
};
