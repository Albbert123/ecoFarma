import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types/productTypes";
import { CartState } from "@/types/orderTypes";

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
        cart: [],
        addToCart: (product: Product) => {
            set((state) => {
                const existingCart = state.cart;
                const productIndex = existingCart.findIndex((item) => item.nregistro === product.nregistro);

                if (productIndex !== -1) {
                // Ya existe: sumar cantidades
                const updatedCart = [...existingCart];
                updatedCart[productIndex].quantity = 
                    (updatedCart[productIndex]?.quantity || 1) + (product?.quantity || 1);

                return { cart: updatedCart };
                } else {
                // No existe: añadir nuevo
                return { cart: [...existingCart, { ...product, quantity: product?.quantity || 1 }] };
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
