"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImCross } from "react-icons/im";

interface ForgotPasswordFormProps {
  onSubmit: (formData: any) => void;
  error?: string;
}

export default function ForgotPasswordForm({ onSubmit, error }: ForgotPasswordFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    code: "",
    newPassword: "",
  });

  const router = useRouter(); // Hook para redirección

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-xl p-8 bg-white shadow-lg rounded-lg">

        {/* Botón de cierre (X) */}
        <button
          onClick={() => router.push("/")}
          className="absolute top-10 right-45 p-2 rounded-full hover:bg-gray-200 transition flex items-center justify-center"
          style={{ width: "50px", height: "50px" }} // Tamaño más grande
        >
          <ImCross size={40} className="text-black-600 hover:text-black transition" />
        </button>

        {/*Title*/}
        <h2 className="text-4xl font-semibold text-center">Recuperar contraseña</h2>

        {/*Info*/}
        <p className="text-center text-gray-600 py-3">
          Introduce tu email para enviar el código de recuperación
        </p>

        {/*Form*/}
        <form onSubmit={handleSubmit} className="mt-1">
          <div className="mb-6">
            <input
              type="email"
              name="email"
              placeholder="Email *"
              className="w-full min-w-[400px] px-2 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-black text-lg"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/*Botón enviar codigo*/}
          <button type="submit" className="w-full bg-black text-white p-2 rounded mt-2 mb-4">Enviar</button>

          {/*Info*/}
          <p className="text-center text-gray-600 py-3">
            Revise su bandeja de entrada para introducir el código recibido
          </p>

          <div className="mb-6">
            <input
              type="text"
              name="code"
              placeholder="Código *"
              className="w-full min-w-[400px] px-2 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-black text-lg"
              value={formData.code}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6">
            <input
              type="password"
              name="newPassword"
              placeholder="Nueva Contraseña *"
              className="w-full min-w-[400px] px-2 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-black text-lg"
              value={formData.newPassword}
              onChange={handleChange}
              required
            />
          </div>

          {/* Mensaje de error */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          
          {/* Botón de registro */}
          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded mt-4"
          >
            Restablecer contraseña
          </button>
        </form>
      </div>
    </div>
  );
}
