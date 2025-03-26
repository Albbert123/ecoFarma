import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";

export function useAuth() {
  const { data: session } = useSession();
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    if (session?.user) {
      setUser(
        session.user.jwt ?? "",
        session.user.role ?? "",
        session.user.email ?? ""
      );
    }
  }, [session, setUser]);

  return { user: session?.user };
}
