"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { useAuthStore } from "@/stores/authStore";
import { useBootstrap } from "@/hooks/useBootstrap";

export default function ForgotPasswordPage() {
  useBootstrap();
  const router = useRouter();
  const { resetPassword } = useAuthStore();
  const [error, setError] = useState("");

  const handleForgotPassword = async (formData: any) => {
    const success = await resetPassword(formData.email, formData.code, formData.newPassword);
    if (!success) {
      setError("Error al resetear contraseña, intenta de nuevo");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <ForgotPasswordForm onSubmit={handleForgotPassword} error={error} />
    </div>
  );
}