import { useCartStore } from "@/stores/cartStore";

export default function CartBadge() {
  const cart = useCartStore((state) => state.cart);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  if (totalItems === 0) return null;

  return (
    <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center shadow-md">
      {totalItems}
    </span>
  );
}

  