"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RegisterForm from "@/components/auth/RegisterForm";
import { useAuthStore } from "@/stores/authStore";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuthStore();
  const [error, setError] = useState("");

  const handleRegister = async (formData: any) => {
    // Logica para enviar al backend

    //guardar en el store
    const success = await register(formData);
    if (!success) {
      setError("Error al registrarse, intenta de nuevo");
    } else {
      router.push("/dashboard/profile");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <RegisterForm onSubmit={handleRegister} error={error} />
    </div>
  );
}
