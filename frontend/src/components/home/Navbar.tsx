"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import ProfileMenu from "./ProfileMenu";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false); //links para mobiles

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
                    href="/prescriptions" 
                    className="block md:inline text-gray-900 py-2" 
                    style={{ textDecoration: 'none', color: 'inherit'}}
                >
                    Gestión de recetas
                </Link>
                <Link 
                    href="/shop" 
                    className="block md:inline text-gray-900 py-2" 
                    style={{ textDecoration: 'none', color: 'inherit'}}
                    >
                    Tienda
                </Link>
                <Link 
                    href="/orders" 
                    className="block md:inline text-gray-900 py-2" 
                    style={{ textDecoration: 'none', color: 'inherit'}}
                    >
                    Encargos
                </Link>
                <Link 
                    href="/contact" 
                    className="block md:inline text-gray-900 py-2" 
                    style={{ textDecoration: 'none', color: 'inherit'}}
                >
                    Contacto
                </Link>
                <Link 
                    href="/about" 
                    className="block md:inline text-gray-900 py-2" 
                    style={{ textDecoration: 'none', color: 'inherit'}}
                    >
                    Nosotros
                </Link>
            </div>

            {/* Icons */}
            <div className="flex space-x-12">
                {/* Cart */}
                <Link href="/cart"><FaShoppingCart className="text-gray-900 text-xl cursor-pointer hover:text-blue-600" /></Link>

                {/* Perfil */}
                <ProfileMenu />
            </div>
        </nav>
    );
}
