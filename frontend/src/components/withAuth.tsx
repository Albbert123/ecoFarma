"use client";

import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/*
  * withAuth is a higher-order component that checks if the user is authenticated
  * before rendering the component. If the user is not authenticated, they are
  * redirected to the login page.
*/

export default function withAuth(Component: React.FC) {
  return function ProtectedRoute(props: any) {
    const { isAuthenticated } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) {
        router.push("/login");
      }
    }, [isAuthenticated]);

    return isAuthenticated ? <Component {...props} /> : null;
  };
}
