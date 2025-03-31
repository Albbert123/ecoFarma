"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImCross } from "react-icons/im";

interface ForgotPasswordFormProps {
  step: number;
  onSendCode: (correo: string) => void;
  onResetPassword: (code: string, new_contraseña: string) => void;
  error?: string;
}

export default function ForgotPasswordForm({ step, onSendCode, onResetPassword, error }: ForgotPasswordFormProps) {
  const [formData, setFormData] = useState({
    correo: "",
    code: "",
    new_contraseña: "",
  });

  const router = useRouter(); // Hook para redirección

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      onSendCode(formData.correo);
    } else {
      onResetPassword(formData.code, formData.new_contraseña);
    }
  };

  return (
    <div className="flex justify-center items-center mt-10 p-4">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        {/* Botón de cierre (X) - Ahora dentro de la caja y alineado a la derecha */}
        <div className="flex justify-end"> {/* Contenedor flex para alinear a la derecha */}
          <button
            onClick={() => router.push("/")}
            className="p-1 rounded-full hover:bg-gray-200 transition"
          >
            <ImCross size={20} className="text-gray-600 hover:text-black" /> {/* Tamaño reducido */}
          </button>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-center">
          Recuperar contraseña
        </h2>
        <p className="text-center text-gray-600 text-sm">
          {step === 1
            ? "Introduce tu email para recibir el código de recuperación"
            : "Revisa tu bandeja de entrada e introduce el código recibido"}
        </p>

        <form onSubmit={handleSubmit} className="mt-4">
          {step === 1 ? (
            // Paso 1: Ingresar correo
            <>
              <input
                type="email"
                name="correo"
                placeholder="Correo *"
                className="w-full px-3 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-black text-base"
                value={formData.correo}
                onChange={handleChange}
                required
              />
              <button type="submit" className="w-full bg-black text-white p-2 rounded mt-4">
                Enviar código
              </button>
            </>
          ) : (
            // Paso 2: Ingresar código + nueva contraseña
            <>
              <input
                type="text"
                name="code"
                placeholder="Código *"
                className="mb-3 w-full px-3 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-black text-base"
                value={formData.code}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="new_contraseña"
                placeholder="Nueva Contraseña *"
                className="mb-4 w-full px-3 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-black text-base"
                value={formData.new_contraseña}
                onChange={handleChange}
                required
              />
              <button type="submit" className="w-full bg-black text-white p-2 rounded mt-2">
                Restablecer contraseña
              </button>
            </>
          )}

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
}
