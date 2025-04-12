// stores/productStore.ts
import { create } from "zustand";
import { Product, ProductStoreState } from "@/types/productTypes";

export const useProductStore = create<ProductStoreState>((set) => ({
  productsStore: [],

  setProductsStore: (productsStore: Product[]) => {
    set({ productsStore });
  },

  clearProducts: () => {
    set({ productsStore: [] });
  },

  addProduct: (product: Product) => {
    set((state) => ({
      productsStore: [...state.productsStore, product],
    }));
  }
}));
