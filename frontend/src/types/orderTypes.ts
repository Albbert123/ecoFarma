export interface CartItem {
  nregistro: string;
  name: string;
  price?: number;
  image?: string;
  stock?: number;
  quantity: number;
}

export interface CartState {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (nregistro: string) => void;
  updateQuantity: (nregistro: string, quantity: number) => void;
  clearCart: () => void;
}

export interface Order {
  id?: string;
  user: string;
  products: CartItem[];
  pickupDate: string;
  date: string;
  paymentMethod: string;
  total: number;
  status: string;
  address: string;
  pharmacist: string;
  note?: string | null;
  promoCode?: string | null;
}

export interface CartFormProps {
  onOrder: (orderData: Order) => Promise<void>;
  isOrdering: boolean;
};

export enum OrderStatus {
  Pending = "Pendiente",
  ReadyForPickup = "Listo para Recoger",
  Delivered = "Entregado",
  Cancelled = "Cancelado",
}