"use client";

import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import Footer from "@/components/home/Footer";
import Welcome from "@/components/home/Welcome";
import Service from "@/components/home/Service";
import { useBootstrap } from "@/hooks/useBootstrap";
import Schedule from "@/components/home/Schedule";
import Ubication from "@/components/home/Ubication";

export default function Home() {
  useBootstrap();
  // ⛔ Evitar problemas de hidratación con un estado que solo se activa en el cliente
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

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
