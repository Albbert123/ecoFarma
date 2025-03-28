"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/auth/LoginForm";
import { useAuthStore } from "@/stores/authStore";
import { LoginFormData } from "@/types/userTypes";
import axios from "axios";
import { loginUser } from "@/services/authService";
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
      setUser(userData.token, userData.rol, userData.correo, userData.imagen); // Guardar en authStore
      toast.success("Inicio de sesión exitoso 🎉");
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
      <LoginForm onSubmit={handleLogin} error={error} />
  );
}
