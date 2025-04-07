// stores/productStore.ts
import { create } from "zustand";
import { ProductStoreState, ProductSummary } from "@/types/productTypes";

export const useProductStore = create<ProductStoreState>((set) => ({
  products: typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("products") || "[]")
    : [],

  setProductsStore: (products: ProductSummary[]) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("products", JSON.stringify(products));
    }
    set({ products });
  },

  clearProducts: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("products");
    }
    set({ products: [] });
  }
}));
