"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";

/*
  * AuthCheck is a component that checks if the user's token is expired and logs
  * them out if it is. This component is used in the layout to ensure that the
  * user is logged in before they can access the application.
*/

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const { isTokenExpired, logout } = useAuthStore();

  useEffect(() => {
    if (isTokenExpired()) {
      logout();
    }
  }, [isTokenExpired, logout]);

  return <>{children}</>;
}
