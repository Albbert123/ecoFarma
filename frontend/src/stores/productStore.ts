// stores/productStore.ts
import { create } from "zustand";
import { Product, ProductStoreState, SearchFormData } from "@/types/productTypes";

export const useProductStore = create<ProductStoreState>((set) => ({
  productsStore: [],
  searchBaseProducts: [],
  searchQueryStore: {searchTerm: null, date: null, user: null},

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
  },

  setSearchBaseProducts: (searchBaseProducts: Product[]) => {
    set({ searchBaseProducts });
  },

  clearSearchBaseProducts: () => {
    set({ searchBaseProducts: [] });
  },

  setSearchQuery: (searchQueryStore: SearchFormData) => {
    set({ searchQueryStore });
  },

  clearSearchQuery: () => set({ searchQueryStore: { searchTerm: null, date: null, user: null }})
}));
