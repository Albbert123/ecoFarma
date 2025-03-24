"use client";

import React from "react";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import Welcome from "@/components/home/Welcome";
import Service from "@/components/home/Service";
import { useBootstrap } from "@/hooks/useBootstrap";

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
      <section className="bg-gray-100 py-4 text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 py-6">HORARIO LABORAL</h2>
        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-12 text-lg">
          <div>
            <p className="font-medium">Lunes - Viernes</p>
            <p className="text-gray-600">7:00 - 22:00</p>
          </div>
          <div>
            <p className="font-medium">Sábado</p>
            <p className="text-gray-600">8:00 - 22:00</p>
          </div>
          <div>
            <p className="font-medium">Domingo</p>
            <p className="text-gray-600">8:00 - 22:00</p>
          </div>
        </div>
      </section>

      {/* Ubicación */}
      <section className="py-12 text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">UBICACIÓN</h2>
        <p className="text-gray-600 mb-8">Calle Dolores 10, Mataró, Barcelona 08350</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-0 py-4">
          <img src="/images/interior.jpg" alt="Interior farmacia" className="w-full h-64 object-cover rounded-lg shadow-md" />
          <img src="/images/exterior.jpg" alt="Exterior farmacia" className="w-full h-64 object-cover rounded-lg shadow-md" />
        </div>
      </section>

       {/* Footer */}
       <Footer />

    </div>
  );
}
