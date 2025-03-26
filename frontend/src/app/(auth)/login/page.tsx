"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/auth/LoginForm";
import { useAuthStore } from "@/stores/authStore";
import { LoginFormData } from "@/types/userTypes";
import { loginUser, createOrUpdateGoogleUser } from "@/services/authService";
import { useBootstrap } from "@/hooks/useBootstrap";
import toast from "react-hot-toast";
import { signOut, useSession } from "next-auth/react";

export default function LoginPage() {
  useBootstrap();
  const router = useRouter();
  const [error, setError] = useState<string | undefined>();
  const { data: session } = useSession();
  const setUser = useAuthStore((state) => state.setUser);

  // Manejar inicio de sesión con Google
  useEffect(() => {
    if (session?.user?.googleData) {
      const googleUser = session.user.googleData;
      createOrUpdateGoogleUser(googleUser)
        .then((dbUser) => {
          setUser(dbUser.token, dbUser.rol, dbUser.correo);
          toast.success("Inicio de sesión exitoso 🎉");
          router.push("/");
        })
        .catch((err) => {
          console.error("Error al registrar usuario de Google:", err);
          setError("Error al iniciar sesión con Google.");
          signOut()
        });
    }
  }, [session, setUser, router]);
  
  const handleLogin = async (formData: LoginFormData) => {
    try {
      const userData = await loginUser(formData);
      setUser(userData.token, userData.rol, userData.correo);
      toast.success("Inicio de sesión exitoso 🎉");
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    }
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <LoginForm onSubmit={handleLogin} error={error} />
    </div>
  );
}
