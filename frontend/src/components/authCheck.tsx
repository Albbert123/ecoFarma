"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const { isTokenExpired, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      if (isAuthenticated && isTokenExpired()) {
        logout();
        router.push("/login"); // Redirigir solo si estaba autenticado
      }
    };

    checkAuth(); // Verificar al montar

    const interval = setInterval(checkAuth, 5000); // Verificar cada 5 segundos

    return () => clearInterval(interval); // Limpiar intervalo al desmontar
  }, [isTokenExpired, isAuthenticated, logout, router]);

  return <>{children}</>;
}
