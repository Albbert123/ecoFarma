"use client";
import React, { useState } from "react";
import Link from "next/link";
import ProfileMenu from "./ProfileMenu";
import { FaBars, FaTimes } from "react-icons/fa";

export default function NavbarAdmin() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="flex justify-between items-center px-8 py-1 bg-white shadow-md">
            {/* Logo */}
            <Link 
                href="/" 
                className="text-2xl font-bold text-gray-800 cursor-pointer"
                style={{ textDecoration: 'none', color: 'inherit'}}
                >
                ECOFARMA
            </Link>

            {/* Mobile Menu Button */}
            <button 
                className="md:hidden text-gray-900 text-2xl"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Links */}
            <div className={`md:flex space-x-6 ${isOpen ? "block" : "hidden"} absolute md:static bg-white w-full md:w-auto left-0 top-16 p-4 md:p-0 shadow-md md:shadow-none`}>
                <Link 
                    href="/manage-products" 
                    className="block md:inline text-gray-900 py-2"
                    style={{ textDecoration: 'none', color: 'inherit'}}
                    >
                    Gestión de productos
                </Link>
                <Link 
                    href="/manage-pharmacists" 
                    className="block md:inline text-gray-900 py-2"
                    style={{ textDecoration: 'none', color: 'inherit'}}
                    >
                    Gestión de farmacéuticos
                </Link>
                <Link 
                    href="/manage-users" 
                    className="block md:inline text-gray-900 py-2"
                    style={{ textDecoration: 'none', color: 'inherit'}}
                    >
                    Gestión de usuarios
                </Link>
                <Link 
                    href="/statistics" 
                    className="block md:inline text-gray-900 py-2"
                    style={{ textDecoration: 'none', color: 'inherit'}}
                    >
                    Estadísticas
                </Link>
            </div>

            {/* Perfil */}
            <ProfileMenu />
        </nav>
    );
}
