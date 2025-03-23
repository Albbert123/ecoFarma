"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RegisterForm from "@/components/auth/RegisterForm";
import { registerUser } from "@/services/authService";
import axios from "axios";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleRegister = async (formData: any) => {
    try {
      await registerUser(formData);
      router.push("/dashboard/profile");
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
