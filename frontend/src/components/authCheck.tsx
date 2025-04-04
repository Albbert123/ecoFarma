"use client";

import { useEffect, useRef } from "react";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { refreshToken } from "@/services/userService";

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const { isTokenExpired, isAuthenticated, logout, token, setUser } = useAuthStore();
  const router = useRouter();
  const lastActivityRef = useRef(Date.now());
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const updateLastActivity = () => (lastActivityRef.current = Date.now());

    window.addEventListener("mousemove", updateLastActivity);
    window.addEventListener("keydown", updateLastActivity);
    window.addEventListener("scroll", updateLastActivity);

    return () => {
      window.removeEventListener("mousemove", updateLastActivity);
      window.removeEventListener("keydown", updateLastActivity);
      window.removeEventListener("scroll", updateLastActivity);
    };
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated) return;

      if (isTokenExpired()) {
        logout();
        router.push("/login");
        return;
      }

      const tokenExp = (() => {
        try {
          const payload = JSON.parse(atob(token!.split(".")[1]));
          return payload.exp * 1000;
        } catch (error) {
          return 0;
        }
      })();

      const timeLeft = tokenExp - Date.now();
      // Si faltan menos de 2 minutos y el usuario ha estado activo en los últimos 5 minutos
      if (timeLeft < 2 * 60 * 1000 && Date.now() - lastActivityRef.current < 5 * 60 * 1000) {
        try {
          const newToken = await refreshToken(token!);
          const payload = JSON.parse(atob(newToken.split(".")[1]));

          setUser(newToken, payload.rol, payload.correo, payload.imagen, payload.nombre, payload.apellido, payload.fromGoogle);
        } catch (err) {
          logout();
          router.push("/login");
        }
      }

      // Programar la próxima verificación
      const nextCheck = Math.max(timeLeft - 2 * 60 * 1000, 5000); // Mínimo 5s, cuando falten 2 min
      timeoutRef.current = setTimeout(checkAuth, nextCheck);
    };

    checkAuth(); // Ejecutar inmediatamente

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isAuthenticated, token, logout, router]);

  return <>{children}</>;
}
