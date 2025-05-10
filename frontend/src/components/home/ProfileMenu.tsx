"use client";

import { useAuthStore } from "@/stores/authStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { FaUser, FaSignOutAlt, FaFilePrescription, FaHistory, FaBell, FaUserCog } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";

export default function ProfileMenu() {
    const { isAuthenticated, userRole, userImagen, userNombre, logout } = useAuthStore();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
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

    const closeMenu = () => setMenuOpen(false);

    const profileImage = isAuthenticated && userImagen && userImagen?.trim() !== "" 
        ? userImagen 
        : "/images/default-profile.png";

    if (!isClient) return null;

    return (
        <div className="relative" ref={menuRef}>
            {/* Botón del perfil */}
            <button
                onClick={handleProfileClick}
                className="flex items-center gap-1 p-1 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                aria-label="Menú de perfil"
                aria-expanded={menuOpen}
            >
                {isAuthenticated ? (
                    <>
                        <img 
                            src={profileImage} 
                            alt="Perfil del usuario"
                            className="w-8 h-8 rounded-full border-2 border-blue-100 object-cover"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = "/images/default-profile.png";
                            }}
                        />
                        <span className="text-gray-500 text-xs ml-1 hidden md:inline">▼</span>
                    </>
                ) : (
                    <div className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100">
                        <FaUser className="text-lg" />
                    </div>
                )}
            </button>

            {/* Menú desplegable */}
            {menuOpen && isAuthenticated && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg z-50 overflow-hidden border border-gray-100 animate-fade-in">
                    {/* Encabezado del menú */}
                    <div className="px-3 py-3 bg-gradient-to-r from-blue-50 to-blue-100 border-b border-gray-200">
                        <p className="text-sm font-medium text-gray-700">Hola, {userNombre}</p>
                    </div>

                    {/* Opciones del menú */}
                    <div className="py-1">
                        {userRole === "usuario" && (
                            <>
                                <MenuItem 
                                    href="/myPrescriptions" 
                                    icon={<FaFilePrescription className="text-blue-500" />}
                                    onClick={closeMenu}
                                >
                                    Mis recetas
                                </MenuItem>
                                <MenuItem 
                                    href="/myOrders" 
                                    icon={<IoMdCart className="text-blue-500" />}
                                    onClick={closeMenu}
                                >
                                    Mis encargos
                                </MenuItem>
                                <MenuItem 
                                    href="/myReminders" 
                                    icon={<FaBell className="text-blue-500" />}
                                    onClick={closeMenu}
                                >
                                    Mis recordatorios
                                </MenuItem>
                                <MenuItem 
                                    href="/mySearchHistory" 
                                    icon={<FaHistory className="text-blue-500" />}
                                    onClick={closeMenu}
                                >
                                    Historial de búsqueda
                                </MenuItem>
                                <div className="border-t border-gray-100 my-1"></div>
                            </>
                        )}
                        
                        <MenuItem 
                            href="/profile" 
                            icon={<FaUserCog className="text-blue-500" />}
                            onClick={closeMenu}
                        >
                            Mi cuenta
                        </MenuItem>

                        {/* Cerrar sesión */}
                        <button 
                            onClick={() => {
                                logout();
                                toast.success("Has cerrado sesión correctamente", {
                                    icon: '👋',
                                    style: {
                                        background: '#f0fdf4',
                                        color: '#15803d'
                                    }
                                });
                                closeMenu();
                                setTimeout(() => router.replace("/"), 8);
                            }} 
                            className="flex items-center w-full px-4 py-2.5 text-sm text-left text-red-600 hover:bg-red-50 transition-colors"
                        >
                            <FaSignOutAlt className="mr-2 text-red-500" />
                            Cerrar sesión
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

// Componente auxiliar para items del menú
const MenuItem = ({ 
    href, 
    icon, 
    children, 
    onClick 
}: { 
    href: string; 
    icon: React.ReactNode; 
    children: React.ReactNode;
    onClick: () => void;
}) => (
    <Link 
        href={href} 
        className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
        style={{ textDecoration: 'none', color: 'inherit'}}
        onClick={onClick}
    >
        <span className="mr-3">{icon}</span>
        {children}
    </Link>
);