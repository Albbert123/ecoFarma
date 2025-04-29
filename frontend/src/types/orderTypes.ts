import { Product } from "./productTypes";

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (nregistro: string) => void;
  updateQuantity: (nregistro: string, quantity: number) => void;
  clearCart: () => void;
}