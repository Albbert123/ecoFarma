"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const DashboardNav = () => {
    const pathname = usePathname();

    // Función para determinar la clase activa
    const getLinkClass = (path: string) =>
        pathname === path 
            ? "text-gray-900 border-b-2 border-blue-700"
            : "text-gray-600 hover:text-gray-900";

    return (
        <nav className="flex justify-center space-x-6 mt-6 pb-2">
            <Link 
                href="/myPrescriptions" 
                className={getLinkClass("/myPrescriptions")}
                style={{ textDecoration: 'none', color: 'inherit'}}
                >Mis recetas
            </Link>
            <Link 
                href="/myOrders" 
                className={getLinkClass("/myOrders")}
                style={{ textDecoration: 'none', color: 'inherit'}}
                >Mis encargos
            </Link>
            <Link 
                href="/myReminders" 
                className={getLinkClass("/myReminders")}
                style={{ textDecoration: 'none', color: 'inherit'}}
                >Mis recordatorios
            </Link>
            <Link 
                href="/mySearchHistory" 
                className={getLinkClass("/mySearchHistory")}
                style={{ textDecoration: 'none', color: 'inherit'}}
                >Historial de búsqueda
            </Link>
            <Link 
                href="/profile" 
                className={getLinkClass("/profile")}
                style={{ textDecoration: 'none', color: 'inherit'}}
                >Mi cuenta
            </Link>
        </nav>
    );
};

export default DashboardNav;
