"use client";

import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import Footer from "@/components/home/Footer";
import Welcome from "@/components/home/Welcome";
import Service from "@/components/home/Service";
import { useBootstrap } from "@/hooks/useBootstrap";
import Schedule from "@/components/home/Schedule";
import Ubication from "@/components/home/Ubication";
import { getSearchResults } from "@/services/productService";
import { useProductStore } from "@/stores/productStore";
import { Product } from "@/types/productTypes";

export default function Home() {
  useBootstrap();
  // ⛔ Evitar problemas de hidratación con un estado que solo se activa en el cliente
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);
  const [products, setProducts] = useState<Product[]>([]);
  const setProductsStore = useProductStore((state) => state.setProductsStore);
  const clearProducts = useProductStore((state) => state.clearProducts);

  const { isAuthenticated, userRole } = useAuthStore(); // Obtener usuario autenticado

  let showExtraSections = true;

  if (isAuthenticated) {
    if (userRole === "farmaceutico" || userRole === "admin") {
      showExtraSections = false;
    }
  }

  if (!isClient) return <></>; // ⛔ Evita que se renderice en SSR
  
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Welcome */}
      <Welcome />

       {/* Mostrar secciones solo si el usuario no es admin ni farmaceutico */}
      {showExtraSections && (
        <>
          <Service />
          <Schedule />
          <Ubication />
          <Footer />
        </>
      )}
    </div>
  );
}
