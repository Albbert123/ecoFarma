"use client";
import { useAuthStore } from "@/stores/authStore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useProductStore } from "@/stores/productStore";

export default function Welcome() {
    
    const { userCorreo, userRole, isAuthenticated } = useAuthStore();
    const { setSearchQuery } = useProductStore();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [hasSubmitted, setHasSubmitted] = useState(false);


    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (searchTerm.trim() !== "" && !hasSubmitted) {
                setHasSubmitted(true); // Marca que el submit ya se realizó
                setSearchQuery({
                    searchTerm: searchTerm,
                    date: new Date(),
                    user: userCorreo ?? ''
                });
                router.push(`/shop?search=${encodeURIComponent(searchTerm)}`);
            }
        }
    };

    // ⛔ Evitar problemas de hidratación con un estado que solo se activa en el cliente
    const [isClient, setIsClient] = useState(false);
    useEffect(() => setIsClient(true), []);
    if (!isClient) return null; // ⛔ Evita que se renderice en SSR
    
    if (userRole === "usuario" || !isAuthenticated) {
        return (
            <>
                {/* Hero Section */}
                <header className="text-center px-6 mt-14">
                    <h1 className="text-5xl font-bold text-gray-800 mb-2">
                        BIENVENIDOS A <span className="text-blue-600">ECOFARMA</span>
                    </h1>
                    <p className="text-lg text-gray-600 mb-8">Tu salud, nuestra prioridad</p>
                    
                    <div className="mt-12 mb-15 flex justify-center">
                        <div className="relative w-full max-w-lg transform transition-all duration-300 hover:scale-[1.02]">
                            <input
                                type="text"
                                placeholder="Cuéntanos qué te ocurre, qué producto necesitas..."
                                className="w-full px-4 py-3 border-3 border-blue-200 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                onKeyDown={handleSubmit}
                            />
                            <FaSearch className="absolute top-5 right-4 text-gray-500 hover:text-green-600 cursor-pointer" />
                        </div>
                    </div>
                </header>

                {/* Info Section */}
                <section className="px-6 mb-6">
                    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-semibold text-gray-800">
                                Búsqueda <span className="text-green-600">inteligente</span>, resultados <span className="text-green-600">precisos</span>
                            </h2>
                            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
                                Nuestra tecnología semántica entiende lo que necesitas, incluso si no conoces el nombre exacto del producto
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mt-6">
                            <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                                <h3 className="font-medium text-lg text-green-800 flex items-center">
                                    <span className="bg-green-100 p-2 rounded-full mr-3">
                                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                        </svg>
                                    </span>
                                    ¿Cómo funciona?
                                </h3>
                                <p className="mt-3 text-gray-700">
                                    Describe tus síntomas o necesidades en lenguaje natural. Nuestro sistema analiza tu consulta y encuentra los productos más relevantes.
                                </p>
                            </div>

                            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                                <h3 className="font-medium text-lg text-blue-800 flex items-center">
                                    <span className="bg-blue-100 p-2 rounded-full mr-3">
                                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                        </svg>
                                    </span>
                                    Ejemplos prácticos
                                </h3>
                                <ul className="mt-3 space-y-2 pl-1">
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-2">•</span>
                                        <span>"Tengo alergia y me pican los ojos"</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-2">•</span>
                                        <span>"Necesito algo para el ardor de estómago"</span>
                                    </li>
                        
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Feedback Section
                <section className="bg-gradient-to-r from-green-50 to-blue-50 py-12 px-6 border-t border-gray-200">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center justify-center bg-white rounded-full p-4 mb-6 shadow-sm">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                            </svg>
                        </div>
                        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                            Ayúdanos a <span className="text-green-600">mejorar</span> contigo
                        </h2>
                        <p className="text-gray-700 max-w-2xl mx-auto mb-6">
                            Tu experiencia es valiosa. Después de cada búsqueda, podrás valorar si los resultados fueron útiles.
                        </p>
                        <div className="bg-white p-6 rounded-lg shadow-sm inline-block max-w-lg w-full border border-gray-100">
                            <p className="text-gray-700 mb-4">
                                <span className="font-medium text-green-600">"¿Encontraste lo que buscabas?"</span><br />
                                Esta simple pregunta nos ayuda a afinar nuestros resultados para ti y para los próximos usuarios.
                            </p>
                            <div className="flex justify-center space-x-4">
                                <button className="px-4 py-2 bg-green-100 text-green-800 rounded-full hover:bg-green-200 transition-colors">
                                    Sí, perfecto
                                </button>
                                <button className="px-4 py-2 bg-red-100 text-red-800 rounded-full hover:bg-red-200 transition-colors">
                                    No exactamente
                                </button>
                            </div>
                        </div>
                    </div>
                </section> */}
            </>
        );
    } else if (userRole === "farmaceutico") {
        return (
            <header className="text-center py-15 px-6">
                <h1 className="text-5xl font-bold">BIENVENIDOS A ECOFARMA</h1>
                <h2 className="text-2xl mt-10 mb-5 py-10">Sesión de farmacéutico</h2>
    
                <p className="mt-6 mb-4 text-lg">Elige qué quieres hacer:</p>
    
                <div className="mt-15 flex flex-wrap justify-center gap-4">
                    <Link href="/pharm/manage-orders">
                        <button className="px-6 py-3 bg-gray-800 text-white rounded-md shadow-md hover:bg-gray-700">
                            Gestionar encargos
                        </button>
                    </Link>
                    <Link href="/pharm/manage-queries">
                        <button className="px-6 py-3 bg-gray-800 text-white rounded-md shadow-md hover:bg-gray-700">
                            Asesoramiento a usuarios
                        </button>
                    </Link>
                    <Link href="/pharm/consult-users">
                        <button className="px-6 py-3 bg-gray-800 text-white rounded-md shadow-md hover:bg-gray-700">
                            Consultar usuarios
                        </button>
                    </Link>
                </div>
            </header>
        );
    } else if (userRole === "admin") {
        return (
            <header className="text-center py-15 px-6">
                <h1 className="text-5xl font-bold">BIENVENIDOS A ECOFARMA</h1>
                <h2 className="text-2xl mt-10 mb-5 py-10">Sesión de administrador</h2>
    
                <p className="mt-6 mb-4 text-lg">Elige qué quieres hacer:</p>
    
                <div className="mt-15 flex flex-wrap justify-center gap-4">
                    <Link href="/admin/manage-products">
                        <button className="px-6 py-3 bg-gray-800 text-white rounded-md shadow-md hover:bg-gray-700">
                            Gestionar productos
                        </button>
                    </Link>
                    <Link href="/admin/manage-pharmacists">
                        <button className="px-6 py-3 bg-gray-800 text-white rounded-md shadow-md hover:bg-gray-700">
                            Gestionar farmacéuticos
                        </button>
                    </Link>
                    <Link href="/admin/manage-users">
                        <button className="px-6 py-3 bg-gray-800 text-white rounded-md shadow-md hover:bg-gray-700">
                            Gestionar usuarios
                        </button>
                    </Link>
                    <Link href="/admin/reports">
                        <button className="px-6 py-3 bg-gray-800 text-white rounded-md shadow-md hover:bg-gray-700">
                            Estadísticas
                        </button>
                    </Link>
                </div>
            </header>
        );
    }
}