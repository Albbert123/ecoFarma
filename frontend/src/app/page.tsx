"use client";

import React from "react";
import { useAuthStore } from "@/stores/authStore";
import Footer from "@/components/home/Footer";
import Welcome from "@/components/home/Welcome";
import WelcomeFarm from "@/components/home/WelcomeFarm";
import WelcomeAdmin from "@/components/home/WelcomeAdmin";
import Service from "@/components/home/Service";
import { useBootstrap } from "@/hooks/useBootstrap";
import Schedule from "@/components/home/Schedule";
import Ubication from "@/components/home/Ubication";

export default function Home() {
  useBootstrap();

  const { isAuthenticated, userRole } = useAuthStore(); // Obtener usuario autenticado

  // Determinar Welcome según el rol
  let WelcomeComponent = Welcome;
  let showExtraSections = true;

  if (isAuthenticated) {
    if (userRole === "farmaceutico") {
      WelcomeComponent = WelcomeFarm;
      showExtraSections = false;
    }
    if (userRole === "admin") {
      WelcomeComponent = WelcomeAdmin;
      showExtraSections = false;
    }
  }
  
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Welcome según rol */}
      <WelcomeComponent />

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
