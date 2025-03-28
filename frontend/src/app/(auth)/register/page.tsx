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
      setUser(userData.token, userData.rol, userData.correo, userData.imagen);
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
      <RegisterForm onSubmit={handleRegister} error={error} />
  );
}
