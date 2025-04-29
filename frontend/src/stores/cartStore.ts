import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types/productTypes";
import { CartItem, CartState } from "@/types/orderTypes";

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
        cart: [],
        addToCart: (product) => {
            set((state) => {
              const existingCart = state.cart;
              const productIndex = existingCart.findIndex((item) => item.nregistro === product.nregistro);
          
              if (productIndex !== -1) {
                const updatedCart = [...existingCart];
                updatedCart[productIndex].quantity =
                  (updatedCart[productIndex]?.quantity || 1) + ("quantity" in product ? product.quantity ?? 1 : 1);
          
                return { cart: updatedCart };
              } else {
                // Convertimos a CartItem explícitamente
                const cartItem: CartItem = { ...product, quantity: "quantity" in product ? product.quantity ?? 1 : 1 };
                return { cart: [...existingCart, cartItem] };
              }
            });
          },
      removeFromCart: (nregistro: string) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.nregistro !== nregistro),
        }));
      },
      updateQuantity: (nregistro: string, quantity: number) => {
        set((state) => {
          if (quantity <= 0) {
            // Si la cantidad es 0 o menos, eliminamos el producto
            return {
              cart: state.cart.filter((item) => item.nregistro !== nregistro),
            };
          } else {
            // Si es mayor que 0, actualizamos la cantidad
            const updatedCart = state.cart.map((item) =>
              item.nregistro === nregistro ? { ...item, quantity } : item
            );
            return { cart: updatedCart };
          }
        });
      },
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage", // nombre en localStorage
    }
  )
);
