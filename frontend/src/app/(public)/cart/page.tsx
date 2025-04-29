'use client';

import CartForm from "@/components/public/cart/CartForm";
import { useBootstrap } from "@/hooks/useBootstrap";

export default function CartPage() {
  useBootstrap();
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Mi carrito</h1>
      <CartForm />
    </div>
  );
}
