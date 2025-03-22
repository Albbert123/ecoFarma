"use client";

import { useAuthStore } from "@/stores/authStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaUser } from "react-icons/fa";

export default function ProfileMenu() {
    const { isAuthenticated, userRole, logout } = useAuthStore();
    const [menuOpen, setMenuOpen] = useState(false); // menu de perfil
    const router = useRouter();

    const handleProfileClick = () => {
        if (!isAuthenticated) {
            router.push("/login");
        } else {
            setMenuOpen(!menuOpen);
        }
    };

    return (
        <div className="relative">
            <FaUser 
                className="text-gray-900 text-xl cursor-pointer hover:text-blue-600"
                onClick={handleProfileClick} 
            />
            {/* Menú desplegable */}
            {menuOpen && isAuthenticated && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                    {userRole === "usuario" ? (
                        <>
                            <Link href="/orders" className="block px-4 py-2 hover:bg-gray-100">Mis encargos</Link>
                            <Link href="/reminders" className="block px-4 py-2 hover:bg-gray-100">Mis recordatorios</Link>
                            <Link href="/prescriptions" className="block px-4 py-2 hover:bg-gray-100">Mis recetas</Link>
                            <Link href="/search-history" className="block px-4 py-2 hover:bg-gray-100">Historial de búsqueda</Link>
                        </>
                    ) : null}
                    <Link href="/(dashboard)/profile" className="block px-4 py-2 hover:bg-gray-100">Mi cuenta</Link>
                    <button onClick={logout} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Cerrar sesión</button>
                </div>
            )}
        </div>
    );
}