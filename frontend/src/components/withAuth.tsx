"use client";

import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/*
  * withAuth is a higher-order component that checks if the user is authenticated
  * before rendering the component. If the user is not authenticated, they are
  * redirected to the login page.
*/

export default function withAuth(Component: React.FC, allowedRoles: string[]) {
  return function ProtectedRoute(props: any) {
    const { isAuthenticated, userRole } = useAuthStore();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (!isAuthenticated) {
        router.push("/login");
      } else if (!allowedRoles.includes(userRole!)) {
        router.push("/"); // Redirige a la página de inicio si no tiene permiso
      } else {
        setLoading(false);
      }
    }, [isAuthenticated]);

    if (loading) {
      return <div></div>; // Muestra un loading en lugar de cambiar la estructura
    }

    return <Component {...props} />;
  };
}
