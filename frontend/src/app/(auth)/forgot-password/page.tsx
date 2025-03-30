"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { useBootstrap } from "@/hooks/useBootstrap";
import { resetPassword, sendResetCode } from "@/services/userService";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  useBootstrap();
  const router = useRouter();
  const [error, setError] = useState("");
  const [step, setStep] = useState(1); // 1 = Enviar código, 2 = Restablecer contraseña
  const [correo, setCorreo] = useState(""); // Guardar correo ingresado
  const [token, setToken] = useState(""); // Guardar token de recuperación

  // 1️⃣ Enviar código de recuperación
  const handleSendCode = async (correo: string) => {
    try {
      const response = await sendResetCode(correo);
      setToken(response.token); // Guardar token
      setCorreo(correo); // Guardar correo
      setStep(2); // Pasar al siguiente paso
    } catch (err: any) {
      setError(err.message);
    }
  };

  // 2️⃣ Restablecer contraseña
  const handleResetPassword = async (code: string, new_contraseña: string) => {
    try {
      await resetPassword({correo, token, code, new_contraseña});
      toast.success("Cambio de contraseña exitoso 🎉");
      router.push("/login"); // Redirigir al login
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <ForgotPasswordForm
      step={step}
      onSendCode={handleSendCode}
      onResetPassword={handleResetPassword}
      error={error}
    />
  );
}