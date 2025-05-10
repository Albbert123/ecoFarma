"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/auth/LoginForm";
import { useAuthStore } from "@/stores/authStore";
import { LoginFormData, UserRole } from "@/types/userTypes";
import axios from "axios";
import { loginUser } from "@/services/userService";
import { useBootstrap } from "@/hooks/useBootstrap";
import toast from "react-hot-toast";

export default function LoginPage() {
  useBootstrap();
  const router = useRouter();
  const [error, setError] = useState<string | undefined>();
  const setUser = useAuthStore((state) => state.setUser);
  
  const handleLogin = async (formData: LoginFormData) => {
    try {
      const userData = await loginUser(formData);
      setUser(userData?.token, userData?.rol, userData?.correo, userData?.imagen, userData?.nombre, userData?.apellido, userData?.fromGoogle); // Guardar en authStore
      toast.success("Inicio de sesión exitoso 🎉");
      const params = new URLSearchParams(window.location.search);
      const returnTo = params.get("returnTo") || "/";
      router.push(returnTo);
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Manejar el login con Google (cuando vuelve del backend)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const nombre = params.get("nombre");
    const apellido = params.get("apellido") ?? "";
    const correo = params.get("correo");
    const imagen = params.get("imagen") ?? "";
    const role = params.get("rol") ?? "";
    const fromGoogle = params.get("fromGoogle") === "true";
    const returnTo = params.get("returnTo") || "/";
    console.log("params.get('returnTo')", params.get("returnTo"));

    if (token && correo && nombre && role) {
      setUser(token, role as UserRole, correo, imagen, nombre, apellido, fromGoogle);
      toast.success("Inicio de sesión exitoso con Google 🎉");
      router.push(returnTo);
    }
  }, []);


  return (
      <LoginForm onSubmit={handleLogin} error={error} />
  );
}
