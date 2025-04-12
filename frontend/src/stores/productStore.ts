// stores/productStore.ts
import { create } from "zustand";
import { Product, ProductStoreState } from "@/types/productTypes";

export const useProductStore = create<ProductStoreState>((set) => ({
  productsStore: typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("products") || "[]")
    : [],

  setProductsStore: (productsStore: Product[]) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("products", JSON.stringify(productsStore));
    }
    set({ productsStore });
  },

  clearProducts: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("products");
    }
    set({ productsStore: [] });
  }
}));
