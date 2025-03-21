import React from "react";
import Navbar from "@/components/Navbar"; // Importando Navbar
import { FaSearch } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900"> {/* el div ocupe al menos la altura completa de la pantalla, color de fondo */}
      {/* Navbar */}
      <Navbar />
      
      {/* Hero Section */}
      <header className="text-center py-15 px-6"> {/* padding en y de 20 y en x de 6 */}
        <h1 className="text-5xl font-bold">BIENVENIDOS A ECOFARMA</h1>
        <div className="mt-8 flex justify-center"> {/* margin top de 6, centrar horizontalmente */}
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="Cuéntanos qué te ocurre, qué producto necesitas..."
              className="w-full px-4 py-3 border rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <FaSearch className="absolute top-5 right-4 text-gray-500" />
          </div>
        </div>
      </header>
      
      {/* Info Section */}
      <section className="text-center px-6 py-1">
        <h2 className="text-2xl font-semibold">¡Descubre nuestro nuevo método de búsqueda!</h2>
        <p className="mt-4 text-gray-700 max-w-2xl mx-auto text-justify">
          Estamos emocionados de presentarte nuestra nueva funcionalidad de Búsqueda Semántica, diseñada para ayudarte a encontrar exactamente lo que necesitas de manera rápida y sencilla.
        </p>
        <p className="mt-4 text-gray-700 max-w-2xl mx-auto text-justify">
          Simplemente describe lo que necesitas en tus propias palabras, y nuestro sistema hará el resto. Por ejemplo, si buscas:
        </p>
        <ul className="mt-4 space-y-2">
          <li>🔍 "Algo para el dolor de cabeza"</li>
          <li>🔍 "Un jarabe para la tos seca"</li>
        </ul>
        <p className="mt-4 text-gray-700 max-w-2xl mx-auto text-justify">Nuestra búsqueda semántica te mostrará los productos más relevantes, ¡sin complicaciones!</p>
      </section>
      
      {/* Feedback Section */}
      <section className="bg-gray-100 py-12 text-center px-6">
        <h2 className="text-2xl font-semibold">¡Tu opinión cuenta!</h2>
        <p className="mt-4 text-gray-700 max-w-2xl mx-auto text-justify">
          Después de cada búsqueda, te preguntaremos si los resultados fueron útiles. Tu feedback nos ayudará a mejorar y ofrecerte siempre la mejor experiencia.
        </p>
      </section>
    </div>
  );
}
