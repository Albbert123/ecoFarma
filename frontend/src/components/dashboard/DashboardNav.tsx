"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChevronDown } from "react-icons/fa";

const DashboardNav = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const getLinkClass = (path: string) =>
        pathname === path 
            ? "text-gray-900 border-b-2 border-blue-700"
            : "text-gray-600 hover:text-gray-900";

    return (
        <div className="mt-6 pb-2 md:block">
            {/* Versión desktop (siempre visible) */}
            <nav className="hidden md:flex justify-center space-x-6">
                {[
                    { href: "/myPrescriptions", text: "Mis recetas" },
                    { href: "/myOrders", text: "Mis encargos" },
                    { href: "/myReminders", text: "Recordatorios" },
                    { href: "/mySearchHistory", text: "Historial" },
                    { href: "/profile", text: "Mi cuenta" }
                ].map((link) => (
                    <Link 
                        key={link.href}
                        href={link.href}
                        className={`px-2 py-1 text-sm ${getLinkClass(link.href)}`}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        {link.text}
                    </Link>
                ))}
            </nav>

            {/* Versión móvil (desplegable) */}
            <div className="md:hidden">
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-between w-full px-4 py-2 bg-gray-100 rounded"
                >
                    <span className="text-sm font-medium">
                        {[
                            { href: "/myPrescriptions", text: "Mis recetas" },
                            { href: "/myOrders", text: "Mis encargos" },
                            { href: "/myReminders", text: "Recordatorios" },
                            { href: "/mySearchHistory", text: "Historial" },
                            { href: "/profile", text: "Mi cuenta" }
                        ].find(link => pathname === link.href)?.text || "Menú"}
                    </span>
                    <FaChevronDown className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>

                {isOpen && (
                    <div className="mt-1 bg-white border rounded shadow-lg">
                        {[
                            { href: "/myPrescriptions", text: "Mis recetas" },
                            { href: "/myOrders", text: "Mis encargos" },
                            { href: "/myReminders", text: "Recordatorios" },
                            { href: "/mySearchHistory", text: "Historial" },
                            { href: "/profile", text: "Mi cuenta" }
                        ].map((link) => (
                            <Link 
                                key={link.href}
                                href={link.href}
                                className={`block px-4 py-2 text-sm ${getLinkClass(link.href)}`}
                                style={{ textDecoration: 'none', color: 'inherit' }}
                                onClick={() => setIsOpen(false)}
                            >
                                {link.text}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardNav;