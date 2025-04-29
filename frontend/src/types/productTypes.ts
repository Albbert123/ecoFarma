export interface ShopFormProps {
  products: Product[];
  recommendations?: any[];
  laboratories: string[];
  categories: string[];
  initialSearchTerm?: string;
  isLoading?: boolean;
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
    quantity?: number;
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

export interface SearchData {
    searchTerm: string | null;
    date: Date | null
    user?: string | null;
    embedding?: number[] | null;
}

export interface Rating {
    type: string;
    value: number;
    date: string;
}

export interface MonthlyData {
  [month: string]: {
    positive: number;
    negative: number;
  };
}

export interface ReportData {
  search: MonthlyData;
  recommendation: MonthlyData;
}

export interface MonthlyStats {
  positive: number;
  negative: number;
}

export interface ReportDataForm {
  search: { [month: string]: MonthlyStats };
  recommendation: { [month: string]: MonthlyStats };
}

export interface ReportFormProps {
  data: ReportDataForm;
}
  
export interface ProductStoreState {
  productsStore: Product[];
  searchBaseProducts: Product[];
  searchQueryStore: SearchData;
  sortOption: string;
  recommendationsStore: Product[];
  setSortOption: (sortOption: string) => void;
  setProductsStore: (products: Product[]) => void;
  clearProducts: () => void;
  addProduct: (product: Product) => void;
  setSearchBaseProducts: (searchBaseProducts: Product[]) => void;
  clearSearchBaseProducts: () => void;
  setSearchQuery: (searchQuery: SearchData) => void;
  clearSearchQuery: () => void;
  setRecommendationsStore: (recommendations: Product[]) => void;
  clearRecommendationsStore: () => void;
}

export type ProductFilters = {
  prescription?: boolean;
  category?: string;
  laboratory?: string;
  min_price?: number;
  max_price?: number;
  limit?: number;
};