"use client";

import React from "react";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import Welcome from "@/components/home/Welcome";
import Service from "@/components/home/Service";
import { useBootstrap } from "@/hooks/useBootstrap";
import Schedule from "@/components/home/Schedule";
import Ubication from "@/components/home/Ubication";

export default function Home() {
  useBootstrap();
  
  return (
    <div className="min-h-screen bg-white text-gray-900"> {/* el div ocupe al menos la altura completa de la pantalla, color de fondo */}
      {/* Navbar */}
      <Navbar />
      
      {/* Welcome Section */}
      <Welcome />

      {/* Services Section */}
      <Service />
      
      {/* Horario Laboral */}
      <Schedule />

      {/* Ubicación */}
      <Ubication />

      {/* Footer */}
      <Footer />

    </div>
  );
}
