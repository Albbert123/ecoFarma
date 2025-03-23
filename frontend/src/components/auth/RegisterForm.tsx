"use client";

import Link from "next/link";
import { useState } from "react";

interface RegisterFormProps {
  onSubmit: (formData: any) => void;
  error?: string;
}

export default function RegisterForm({ onSubmit, error }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-4xl font-semibold text-center">Regístrate</h2>
        
        <form onSubmit={handleSubmit} className="mt-4">
          <label className="block text-sm font-medium">Nombre</label>
          <input
            type="text"
            name="nombre"
            className="w-full border p-2 rounded"
            value={formData.nombre}
            onChange={handleChange}
            required
          />

          <label className="block text-sm font-medium mt-2">Apellido</label>
          <input
            type="text"
            name="apellido"
            className="w-full border p-2 rounded"
            value={formData.apellido}
            onChange={handleChange}
            required
          />

          <label className="block text-sm font-medium mt-2">Email</label>
          <input
            type="email"
            name="email"
            className="w-full border p-2 rounded"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label className="block text-sm font-medium mt-2">Contraseña</label>
          <input
            type="password"
            name="password"
            className="w-full border p-2 rounded"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded mt-4"
          >
            Registrarse
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          ¿Ya eres miembro?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Inicia tu sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
