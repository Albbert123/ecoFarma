"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/LoginForm";
import { useAuthStore } from "@/stores/authStore";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [error, setError] = useState("");

  const handleLogin = async (formData: any) => {
    // Logica para enviar al backend

    //guardar en el store
    const success = await login(formData.email, formData.password);
    if (!success) {
      setError("Correo o contraseña incorrectos");
    } else {
      router.push("/dashboard/profile");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <LoginForm onSubmit={handleLogin} error={error} />
    </div>
  );
}
