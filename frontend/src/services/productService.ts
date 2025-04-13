import { api } from "./api";
import { Product, ProductFilters, ProductFormData, UpdateProductData } from "@/types/productTypes";

export const getProducts = async () => {
  try {
    const response = await api.get("/products/");
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.detail || "Error al obtener los productos";
    throw new Error(errorMessage);
  }
};

export const getFilteredProducts = async (
  filters: ProductFilters,
  customProducts?: Product[]
): Promise<Product[]> => {
  if (customProducts) {
    return customProducts.filter((product) => {
      const matchPrescription =
        filters.prescription === undefined ||
        product.prescription === filters.prescription;

      const matchCategory =
        !filters.category || product.category?.toLowerCase().includes(filters.category.toLowerCase());

      const matchLab =
        !filters.laboratory || product.laboratory?.toLowerCase().includes(filters.laboratory.toLowerCase());

      const matchPriceMin =
        filters.min_price === undefined || (product.price ?? 0) >= filters.min_price;

      const matchPriceMax =
        filters.max_price === undefined || (product.price ?? 0) <= filters.max_price;

      return (
        matchPrescription &&
        matchCategory &&
        matchLab &&
        matchPriceMin &&
        matchPriceMax
      );
    }).slice(0, filters.limit || 30); // aplica el limit localmente también
  }

  // Si no se pasan productos, hace fetch del backend
  try {
    const queryParams = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        if (Array.isArray(value)) {
          value.forEach((val) => queryParams.append(key, val));
        } else {
          queryParams.append(key, value.toString());
        }
      }
    });

    const response = await api.get(`/products/filter?${queryParams.toString()}`);
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.detail || "Error al filtrar productos";
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

export const getSearchResults = async (query: string) => {
  console.log("Buscando productos con query:", query);
  try {
    if (!query) {
      return [];
    }
    const response = await api.get(`/products/semantic-search?query=${encodeURIComponent(query)}`);
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.detail || "Error al buscar productos";
    throw new Error(errorMessage);
  }
}
