"use client";

import { useAuthStore } from "@/stores/authStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { FaUser } from "react-icons/fa";

export default function ProfileMenu() {
    const { isAuthenticated, userRole, userImagen, logout } = useAuthStore();
    const [menuOpen, setMenuOpen] = useState(false); // menu de perfil
    const menuRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // ⛔ Evitar problemas de hidratación con un estado que solo se activa en el cliente
    const [isClient, setIsClient] = useState(false);
    useEffect(() => setIsClient(true), []);

    const handleProfileClick = () => {
        if (!isAuthenticated) {
            const currentPath = window.location.pathname + window.location.search;
            router.push(`/login?returnTo=${encodeURIComponent(currentPath)}`);
        } else {
            setMenuOpen(!menuOpen);
        }
    };

    // Cerrar menú al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };

        if (menuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuOpen]);

    // Función para cerrar el menú
    const closeMenu = () => {
        setMenuOpen(false);
    };

   // Determinar la imagen de perfil en la renderización
   const profileImage = isAuthenticated && userImagen && userImagen?.trim() !== "" 
   ? userImagen 
   : "/images/default-profile.png";

   if (!isClient) return null; // ⛔ Evita que se renderice en SSR

    return (
        <div className="relative" ref={menuRef}>

            {/* Icono de perfil o imagen de usuario */}
            <div 
                className="flex items-center gap-1 cursor-pointer" 
                onClick={handleProfileClick}
            >
                {isAuthenticated ? (
                    <img 
                        src={profileImage} 
                        alt="Perfil"
                        className="w-7 h-7 rounded-full border border-gray-300 object-cover mt-[-3.5px]"
                    />
                ) : (
                    <FaUser className="text-gray-900 text-xl hover:text-blue-600" />
                )}
                {isAuthenticated && <span className="text-gray-600 text-sm mt-[1px]">▼</span>}
            </div>
            {/* Menú desplegable */}
            {menuOpen && isAuthenticated && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                    {userRole === "usuario" ? (
                        <>
                            <Link 
                                href="/myPrescriptions" 
                                className="block px-4 py-2 hover:bg-gray-100"
                                style={{ textDecoration: 'none', color: 'inherit'}}
                                onClick={closeMenu}
                                >Mis recetas
                            </Link>
                            <Link 
                                href="/myOrders" 
                                className="block px-4 py-2 hover:bg-gray-100" 
                                style={{ textDecoration: 'none', color: 'inherit'}}
                                onClick={closeMenu}
                                >Mis encargos
                            </Link>
                            <Link 
                                href="/myReminders" 
                                className="block px-4 py-2 hover:bg-gray-100" 
                                style={{ textDecoration: 'none', color: 'inherit'}}
                                onClick={closeMenu}
                                >Mis recordatorios
                            </Link> 
                            <Link 
                                href="/mySearchHistory" 
                                className="block px-4 py-2 hover:bg-gray-100"
                                style={{ textDecoration: 'none', color: 'inherit'}}
                                onClick={closeMenu}
                                >Historial de búsqueda
                            </Link>
                        </>
                    ) : null}
                    <Link 
                        href="/profile" 
                        className="block px-4 py-2 hover:bg-gray-100"
                        style={{ textDecoration: 'none', color: 'inherit'}}
                        onClick={closeMenu}
                        >Mi cuenta
                    </Link>

                    {/* Línea separadora */}
                    <hr className="my-1 border-gray-200" />

                    <button 
                        onClick={() => {
                            logout();
                            toast.success("Cierre de sesión exitoso 👋");
                            closeMenu();
                            setTimeout(() => {
                                router.replace("/");
                            }, 8);
                        }} 
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >Cerrar sesión
                    </button>
                </div>
            )}
        </div>
    );
}