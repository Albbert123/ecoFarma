import { useCartStore } from "@/stores/cartStore";

export default function CartBadge() {
    const cart = useCartStore((state) => state.cart);
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  
    if (totalItems === 0) return null; // Si no hay productos, no mostramos nada
  
    return (
      <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
        {totalItems}
      </span>
    );
  }
  