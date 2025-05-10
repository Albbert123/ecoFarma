"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaShoppingCart, FaBars, FaTimes, FaUserShield, FaChartLine, FaBoxOpen, FaUsers, FaPills, FaQuestionCircle } from "react-icons/fa";
import { MdContactMail, MdHome, MdInfo } from "react-icons/md";
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

    // Estilos base con gradiente sutil y sombra mejorada
    const baseNavStyles = "flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3 shadow-sm border-b border-gray-100";

    // Menú móvil con animación suave
    const mobileMenuStyles = `
        absolute top-full left-0 w-full bg-white shadow-lg z-50
        md:hidden transition-all duration-300 ease-in-out
        ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"}
    `;

    const desktopMenuStyles = "hidden md:flex space-x-2";

    const getLinkClass = (path: string) => 
        pathname === path 
            ? "bg-blue-100 text-blue-700 font-medium" 
            : "text-gray-700 hover:bg-gray-100";

    const renderNavItem = (href: string, text: string, icon: React.ReactNode, mobile?: boolean) => (
        <Link
            href={href}
            style={{ textDecoration: 'none', color: 'inherit'}}
            className={`flex items-center px-4 py-3 rounded-lg transition-colors ${getLinkClass(href)} ${mobile ? "w-full" : ""}`}
            
            onClick={() => setIsOpen(false)}
        >
            <span className="mr-2 text-blue-600">{icon}</span>
            {text}
        </Link>
    );

    const renderNavLinks = (links: { href: string; text: string; icon: React.ReactNode }[], mobile?: boolean) => (
        <div className={mobile ? mobileMenuStyles : `${desktopMenuStyles} items-center`}>
            {links.map((link, index) => (
                <div key={index} className={mobile ? "border-b border-gray-100 last:border-b-0" : ""}>
                    {renderNavItem(link.href, link.text, link.icon, mobile)}
                </div>
            ))}
        </div>
    );

    // Componente común del logo
    const Logo = () => (
        <Link href="/" className="flex items-center"  style={{ textDecoration: 'none', color: 'inherit'}}>
            <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                ECOFARMA
            </span>
        </Link>
    );

    // Componente común de botones de acción
    const ActionButtons = () => (
        <div className="flex space-x-4 items-center">
            <div className="relative">
                <Link href="/cart" className="p-2 rounded-full transition-colors">
                    <FaShoppingCart className="text-gray-700 text-xl hover:text-blue-600 transition-colors" />
                    <CartBadge />
                </Link>
            </div>
            <div className="ml-2">
                <ProfileMenu />
            </div>
        </div>
    );

    if (userRole === "usuario" || !isAuthenticated) {
        return (
            <nav className={`${baseNavStyles} relative`}>
                <Logo />

                <button 
                    className="md:hidden p-2 rounded-full hover:bg-gray-100 text-gray-700" 
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
                </button>

                {renderNavLinks([
                    { href: "/prescriptions", text: "Recetas", icon: <FaPills /> },
                    { href: "/shop", text: "Tienda", icon: <FaBoxOpen /> },
                    { href: "/orders", text: "Encargos", icon: <FaShoppingCart /> },
                    { href: "/contact", text: "Contacto", icon: <MdContactMail /> },
                    { href: "/about", text: "Nosotros", icon: <MdInfo /> },
                    { href: "/faq", text: "FAQ", icon: <FaQuestionCircle /> }
                ], true)}

                {renderNavLinks([
                    { href: "/prescriptions", text: "Recetas", icon: <FaPills /> },
                    { href: "/shop", text: "Tienda", icon: <FaBoxOpen /> },
                    { href: "/orders", text: "Encargos", icon: <FaShoppingCart /> },
                    { href: "/contact", text: "Contacto", icon: <MdContactMail /> },
                    { href: "/about", text: "Nosotros", icon: <MdInfo /> },
                    { href: "/faq", text: "FAQ", icon: <FaQuestionCircle /> }
                ])}

                <ActionButtons />
            </nav>
        );
    } else if (userRole === "farmaceutico") {
        return (
            <nav className={`${baseNavStyles} relative`}>
                <Logo />

                <button 
                    className="md:hidden p-2 rounded-full hover:bg-gray-100 text-gray-700" 
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
                </button>

                {renderNavLinks([
                    { href: "/pharm/manage-orders", text: "Encargos", icon: <FaBoxOpen /> },
                    { href: "/pharm/manage-queries", text: "Asesoramiento", icon: <FaUserShield /> },
                    { href: "/pharm/consult-users", text: "Usuarios", icon: <FaUsers /> }
                ], true)}

                {renderNavLinks([
                    { href: "/pharm/manage-orders", text: "Encargos", icon: <FaBoxOpen /> },
                    { href: "/pharm/manage-queries", text: "Asesoramiento", icon: <FaUserShield /> },
                    { href: "/pharm/consult-users", text: "Usuarios", icon: <FaUsers /> }
                ])}

                <div className="ml-2">
                    <ProfileMenu />
                </div>
            </nav>
        );
    } else if (userRole === "admin") {
        return (
            <nav className={`${baseNavStyles} relative`}>
                <Logo />

                <button 
                    className="md:hidden p-2 rounded-full hover:bg-gray-100 text-gray-700" 
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
                </button>

                {renderNavLinks([
                    { href: "/admin/manage-products", text: "Productos", icon: <FaBoxOpen /> },
                    { href: "/admin/manage-pharmacists", text: "Farmacéuticos", icon: <FaUserShield /> },
                    { href: "/admin/manage-users", text: "Usuarios", icon: <FaUsers /> },
                    { href: "/admin/reports", text: "Estadísticas", icon: <FaChartLine /> }
                ], true)}

                {renderNavLinks([
                    { href: "/admin/manage-products", text: "Productos", icon: <FaBoxOpen /> },
                    { href: "/admin/manage-pharmacists", text: "Farmacéuticos", icon: <FaUserShield /> },
                    { href: "/admin/manage-users", text: "Usuarios", icon: <FaUsers /> },
                    { href: "/admin/reports", text: "Estadísticas", icon: <FaChartLine /> }
                ])}

                <div className="ml-2">
                    <ProfileMenu />
                </div>
            </nav>
        );
    }
}