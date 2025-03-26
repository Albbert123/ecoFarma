"use client";

import { useAuthStore } from "@/stores/authStore";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { FaUser } from "react-icons/fa";

export default function ProfileMenu() {
    const { isAuthenticated, userRole, logout } = useAuthStore();
    const [menuOpen, setMenuOpen] = useState(false); // menu de perfil
    const menuRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const handleProfileClick = () => {
        if (!isAuthenticated) {
            router.push("/login");
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

    return (
        <div className="relative" ref={menuRef}>
            <FaUser 
                className="text-gray-900 text-xl cursor-pointer hover:text-blue-600"
                onClick={handleProfileClick} 
            />
            {/* Menú desplegable */}
            {menuOpen && isAuthenticated && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                    {userRole === "usuario" ? (
                        <>
                            <Link 
                                href="/orders" 
                                className="block px-4 py-2 hover:bg-gray-100" 
                                style={{ textDecoration: 'none', color: 'inherit'}}
                                >Mis encargos
                            </Link>
                            <Link 
                                href="/reminders" 
                                className="block px-4 py-2 hover:bg-gray-100" 
                                style={{ textDecoration: 'none', color: 'inherit'}}
                                >Mis recordatorios
                            </Link>
                            <Link 
                                href="/prescriptions" 
                                className="block px-4 py-2 hover:bg-gray-100"
                                style={{ textDecoration: 'none', color: 'inherit'}}
                                >Mis recetas
                            </Link>
                            <Link 
                                href="/search-history" 
                                className="block px-4 py-2 hover:bg-gray-100"
                                style={{ textDecoration: 'none', color: 'inherit'}}
                                >Historial de búsqueda
                            </Link>
                        </>
                    ) : null}
                    <Link 
                        href="/profile" 
                        className="block px-4 py-2 hover:bg-gray-100"
                        style={{ textDecoration: 'none', color: 'inherit'}}
                        >Mi cuenta
                    </Link>

                    {/* Línea separadora */}
                    <hr className="my-1 border-gray-200" />

                    <button 
                        onClick={() => {
                            logout();
                            signOut()
                            toast.success("Cierre de sesión exitoso 👋");
                            setMenuOpen(false);
                        }} 
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >Cerrar sesión
                    </button>
                </div>
            )}
        </div>
    );
}