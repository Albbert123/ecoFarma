export interface ShopFormProps {
  products: Product[];
  recommendations?: any[];
  laboratories: string[];
  categories: string[];
  onAddToCart: (product: Product) => void;
  onSearch: (term: string) => void;
  onFilterChange: (filters: Filters) => void;
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
  commercialization?: string[];
  authorization?: string[];
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
    advertencias?: string;
    contraindications?: string;
    comoTomar?: string;
    reacciones?: string;
    posologia?: string;
    conservacion?: string;
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

export interface ProductSummary {
    nregistro: string;
    name: string;
    price: number;
    stock: number;
    image?: string;
    principleAct: string;
    laboratory?: string;
    category?: string;
    prescription?: boolean;
  }
  
  export interface ProductStoreState {
    products: ProductSummary[];
    setProductsStore: (products: ProductSummary[]) => void;
    clearProducts: () => void;
  }

  export type ProductFilters = {
    prescription?: boolean;
    category?: string;
    principleAct?: string;
    laboratory?: string;
    min_price?: number;
    max_price?: number;
    limit?: number;
  };