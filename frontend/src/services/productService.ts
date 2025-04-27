import { api } from "./api";
import { Product, ProductFilters, ProductFormData, UpdateProductData, SearchData, Rating } from '@/types/productTypes';
import { LAB_MAPPING, CATEGORIES_MAPPING } from '@/constants/constants';


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
    // Mapear laboratorios
    let labMatches: string[] = [];
    if (filters.laboratory && Array.isArray(filters.laboratory)) {
      labMatches = filters.laboratory
        .map((lab: keyof typeof LAB_MAPPING) => LAB_MAPPING[lab])
        .filter((mapped) => !!mapped);
    }

    // Mapear categorías
    let categoryMatches: string[] = [];
    if (filters.category && Array.isArray(filters.category)) {
      filters.category.forEach((cat) => {
        const mapped = CATEGORIES_MAPPING[cat as keyof typeof CATEGORIES_MAPPING];
        if (mapped) categoryMatches.push(...mapped);
      });
    }

    return customProducts
      .filter((product) => {
        const matchLab =
          labMatches.length === 0 ||
          (product.laboratory && labMatches.includes(product.laboratory));

        const matchCategory =
          categoryMatches.length === 0 ||
          (product.category && categoryMatches.includes(product.category));

        const matchPrescription =
          filters.prescription === undefined ||
          product.prescription === filters.prescription;

        const matchPriceMin =
          filters.min_price === undefined ||
          (product.price ?? 0) >= filters.min_price;

        const matchPriceMax =
          filters.max_price === undefined ||
          (product.price ?? 0) <= filters.max_price;

        return (
          matchLab &&
          matchCategory &&
          matchPrescription &&
          matchPriceMin &&
          matchPriceMax
        );
      })
      .slice(0, filters.limit || 30); // aplica el limit localmente también
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
  try {
    if (!query) {
      return { products: [], embedding: null };
    }
    const response = await api.get(`/products/semantic-search?query=${encodeURIComponent(query)}`);
    return response.data; // Ahora devuelve un objeto con productos y embedding
  } catch (error: any) {
    const errorMessage = error.response?.data?.detail || "Error al buscar productos";
    throw new Error(errorMessage);
  }
};

export const setSearchData = async (searchData: SearchData) => {
  try {
    const response = await api.post("/products/search-data", searchData);
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.detail || "Error al guardar los datos de búsqueda";
    throw new Error(errorMessage);
  }
};

export const getSearchHistory = async (userCorreo: string) => {
  try {
    const response = await api.get(`/products/search-history/${userCorreo}`);
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.detail || "Error al obtener el historial de búsqueda";
    throw new Error(errorMessage);
  }
};

export const getRecommendations = async (userCorreo: string) => {
  try {
    const response = await api.get(`/products/recommendations/${userCorreo}`);
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.detail || "Error al obtener las recomendaciones";
    throw new Error(errorMessage);
  }
}

export const getSimilarProducts = async (nregistro: string) => {
  try {
    const response = await api.get(`/products/similar/${nregistro}`);
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.detail || "Error al obtener productos similares";
    throw new Error(errorMessage);
  }
}

export const saveRating = async (rating: Rating) => {
  try {
    const response = await api.post(`/products/rating/`, rating);
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.detail || "Error al guardar la calificación";
    throw new Error(errorMessage);
  }
}