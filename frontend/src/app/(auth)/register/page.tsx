"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RegisterForm from "@/components/auth/RegisterForm";
import { registerUser } from "@/services/authService";
import axios from "axios";
import { RegisterFormData } from "@/types/userTypes";
import { useAuthStore } from "@/stores/authStore";
import { useBootstrap } from "@/hooks/useBootstrap";

export default function RegisterPage() {
  useBootstrap();
  const router = useRouter();
  const [error, setError] = useState<string | undefined>();
  const setUser = useAuthStore((state) => state.setUser);

  const handleRegister = async (formData: RegisterFormData) => {
    try {
      const userData = await registerUser(formData);
      setUser(userData.rol, userData.correo); // Guardar en authStore
      router.push("/");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Error desconocido");
      } else {
        setError("Error inesperado. Intenta de nuevo.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <RegisterForm onSubmit={handleRegister} error={error} />
    </div>
  );
}
