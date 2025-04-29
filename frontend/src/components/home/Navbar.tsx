"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import ProfileMenu from "./ProfileMenu";
import { useAuthStore } from "@/stores/authStore";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/stores/cartStore";
import CartBadge from "./CartBadge";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { userRole, isAuthenticated } = useAuthStore();
    const [isClient, setIsClient] = useState(false);
    const pathname = usePathname();

    useEffect(() => setIsClient(true), []);
    if (!isClient) return null;

    // Ajustamos la altura para desktop (py-4) y mobile (py-3)
    const baseNavStyles = "flex justify-between items-center px-8 py-3 md:py-4 bg-white shadow-md";

    const mobileMenuStyles = `
        absolute top-full left-0 w-full bg-white shadow-lg z-50
        md:hidden
        ${isOpen ? "block" : "hidden"}
    `;

    const desktopMenuStyles = "hidden md:flex space-x-6";

    const getLinkClass = (path: string) =>
        pathname === path 
            ? "border-b-2 border-blue-700"
            : null;


    const renderNavLinks = (links: { href: string; text: string }[]) => (
        <>
            {/* Menú móvil */}
            <div className={mobileMenuStyles}>
                {links.map((link, index) => (
                    <Link 
                        key={index}
                        href={link.href}
                        className={`block py-3 px-4 text-gray-900 hover:bg-gray-100 ${getLinkClass(link.href)}`}
                        style={{ textDecoration: 'none', color: 'inherit'}}
                        onClick={() => setIsOpen(false)}
                    >
                        {link.text}
                    </Link>
                ))}
            </div>

            {/* Menú desktop - Añadimos más padding vertical */}
            <div className={desktopMenuStyles}>
                {links.map((link, index) => (
                    <Link 
                        key={index}
                        href={link.href}
                        className={`py-2 md:py-3 text-gray-900 hover:text-blue-600 transition-colors ${getLinkClass(link.href)}`}
                        style={{ textDecoration: 'none', color: 'inherit'}}
                    >
                        {link.text}
                    </Link>
                ))}
            </div>
        </>
    );

    if (userRole === "usuario" || !isAuthenticated) {
        return (
            <nav className={`${baseNavStyles} relative`}>
                {/* Logo - Aumentamos tamaño en desktop */}
                <Link href="/" className="text-2xl md:text-3xl font-bold text-gray-800" style={{ textDecoration: 'none', color: 'inherit'}}>
                    ECOFARMA
                </Link>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-gray-900 text-2xl" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>

                {/* Links */}
                {renderNavLinks([
                    { href: "/prescriptions", text: "Gestión de recetas" },
                    { href: "/shop", text: "Tienda" },
                    { href: "/orders", text: "Encargos" },
                    { href: "/contact", text: "Contacto" },
                    { href: "/about", text: "Nosotros" }
                ])}

                {/* Icons - Aumentamos tamaño en desktop */}
                <div className="flex space-x-6 items-center">
                    <div className="relative">
                        <Link href="/cart">
                            <FaShoppingCart className="text-gray-900 text-xl md:text-2xl hover:text-blue-600 transition-colors" />
                            {/* Badge de cantidad */}
                            <CartBadge />
                        </Link>
                    </div>
                    
                    <div className="md:scale-110 z-50"> {/* Escalamos el ProfileMenu en desktop */}
                        <ProfileMenu />
                    </div>
                </div>
            </nav>
        );
    } else if (userRole === "farmaceutico") {
        return (
            <nav className={`${baseNavStyles} relative`}>
                {/* Logo */}
                <Link href="/" className="text-2xl md:text-3xl font-bold text-gray-800" style={{ textDecoration: 'none', color: 'inherit'}}>
                    ECOFARMA
                </Link>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-gray-900 text-2xl" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>

                {/* Links */}
                {renderNavLinks([
                    { href: "/pharm/manage-orders", text: "Gestión de encargos" },
                    { href: "/pharm/user-advice", text: "Asesoramiento a usuarios" },
                    { href: "/pharm/consult-users", text: "Consultar usuarios" }
                ])}

                {/* Perfil */}
                <div className="md:scale-110 z-50">
                    <ProfileMenu />
                </div>
            </nav>
        );
    } else if (userRole === "admin") {
        return (
            <nav className={`${baseNavStyles} relative`}>
                {/* Logo */}
                <Link href="/" className="text-2xl md:text-3xl font-bold text-gray-800" style={{ textDecoration: 'none', color: 'inherit'}}>
                    ECOFARMA
                </Link>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-gray-900 text-2xl" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>

                {/* Links */}
                {renderNavLinks([
                    { href: "/admin/manage-products", text: "Gestión de productos" },
                    { href: "/admin/manage-pharmacists", text: "Gestión de farmacéuticos" },
                    { href: "/admin/manage-users", text: "Gestión de usuarios" },
                    { href: "/admin/reports", text: "Estadísticas" }
                ])}

                {/* Perfil */}
                <div className="md:scale-110 z-50">
                    <ProfileMenu />
                </div>
            </nav>
        );
    }
}