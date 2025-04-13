export interface ShopFormProps {
  products: Product[];
  recommendations?: any[];
  laboratories: string[];
  categories: string[];
  initialSearchTerm?: string;
  onAddToCart: (product: Product) => void;
  onSearch: (term: string) => void;
  onFilterChange: (filters: Filters) => void;
  onSortChange: (sortOption: string) => void;
}

export interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

export interface FiltersFormProps {
    laboratories: string[];
    categories: string[];
    filters: Filters;
    onFilterChange: (filters: Filters) => void;
}

export interface Filters {
  laboratory: string[];
  category: string[];
  prescription: string[];
  priceRange: string[];
}

export interface Product {
    nregistro: string;
    name: string;
    description?: string;
    price?: number;
    image?: string;
    laboratory?: string;
    category?: string;
    stock?: number;
    principleAct?: string;
    dosis?: string;
    prescription?: boolean;
    composition?: string;
    AdditionalInfo?: string;
    embedding?: number[];
}

export interface UpdateProductData {
    name?: string;
    description?: string;
    price?: number;
    image?: string;
    laboratory?: string;
    category?: string;
    stock?: number;
}

export interface ProductFormData {
    nregistro: string;
    name: string;
    description?: string;
    price: number;
    image?: string;
    laboratory: string;
    category: string;
    stock: number;
    principleAct?: string;
}

export interface SearchFormData {
    searchTerm: string | null;
    date: Date | null
    user?: string | null;
}
  
export interface ProductStoreState {
  productsStore: Product[];
  searchQueryStore: SearchFormData;
  setProductsStore: (products: Product[]) => void;
  clearProducts: () => void;
  addProduct: (product: Product) => void;
  setSearchQuery: (searchQuery: SearchFormData) => void;
  clearSearchQuery: () => void;
}

export type ProductFilters = {
  prescription?: boolean;
  category?: string;
  laboratory?: string;
  min_price?: number;
  max_price?: number;
  limit?: number;
};