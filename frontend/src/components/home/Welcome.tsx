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
                <header className="text-center py-15 px-6"> {/* padding en y de 20 y en x de 6 */}
                    <h1 className="text-5xl font-bold">BIENVENIDOS A ECOFARMA</h1>
                    <div className="mt-8 flex justify-center"> {/* margin top de 6, centrar horizontalmente */}
                        <div className="relative w-full max-w-lg">
                            <input
                                type="text"
                                placeholder="Cuéntanos qué te ocurre, qué producto necesitas..."
                                className="w-full px-4 py-3 border rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                onKeyDown={handleSubmit}
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