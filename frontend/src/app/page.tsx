import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";

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

      {/* Services Section */}
      <section className="bg-white text-gray-900">
        <h2 className="text-3xl font-bold text-center mb-12 py-10">SERVICIOS</h2>

        <div className="max-w-6xl mx-auto px-6 space-y-2">
          {/* Primera fila */}
          <div className="py-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Imagen */}
            <img
              src="/images/encargo.jpg"
              alt="Encargo de productos"
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
            {/* Texto */}
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold">ENCARGO DE PRODUCTOS</h3>
              <p className="mt-2 text-gray-700">
                Realiza tus encargos desde la comodidad de tu hogar. Evita perder
                tiempo esperando en la cola. ¡Llega, coge tus productos y listo!
              </p>
              <Link
                href="/tienda"
                className="inline-block mt-4 px-6 py-2 border rounded-full hover:bg-blue-100 hover:text-white transition"
                style={{ textDecoration: 'none', color: 'inherit'}}
              >
                Ir a la tienda
              </Link>
            </div>
          </div>

          {/* Segunda fila (invertida) */}
          <div className="py-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Texto */}
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold">GESTIÓN DE RECETAS</h3>
              <p className="mt-2 text-gray-700">
                Digitaliza tus recetas médicas en segundos. Sube PDFs o imágenes,
                consulta tus recetas almacenadas y añade productos al carrito con
                un solo clic.
              </p>
              <Link
                href="/recetas"
                className="inline-block mt-4 px-6 py-2 border rounded-full hover:bg-blue-100 hover:text-white transition"
                style={{ textDecoration: 'none', color: 'inherit'}}
              >
                Gestionar recetas
              </Link>
            </div>
            {/* Imagen */}
            <img
              src="/images/recetas.jpg"
              alt="Gestión de recetas"
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Tercera fila */}
          <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Imagen */}
            <img
              src="/images/asesoramiento.jpg"
              alt="Asesoramiento farmacéutico"
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
            {/* Texto */}
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold">ASESORAMIENTO FARMACÉUTICO</h3>
              <p className="mt-2 text-gray-700">
                Resuelve tus dudas con nuestros farmacéuticos. Consulta en línea y
                recibe respuestas rápidas y confiables.
              </p>
              <Link
                href="/contacto"
                className="inline-block mt-4 px-6 py-2 border rounded-full hover:bg-blue-100 hover:text-white transition"
                style={{ textDecoration: 'none', color: 'inherit'}}
              >
                Contacto
              </Link>
            </div>
          </div>
        </div>
      </section>

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
