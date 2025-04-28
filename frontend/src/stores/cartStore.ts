import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types/productTypes";
import { CartState } from "@/types/orderTypes";

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (product: Product) => {
        const existingCart = get().cart;
        const productIndex = existingCart.findIndex((item) => item.nregistro === product.nregistro);

        if (productIndex !== -1) {
          // Ya existe en carrito -> aumentar cantidad
          const updatedCart = [...existingCart];
          updatedCart[productIndex].quantity += 1;
          set({ cart: updatedCart });
        } else {
          // No existe -> agregarlo con cantidad 1
          set({ cart: [...existingCart, { ...product, quantity: 1 }] });
        }
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
