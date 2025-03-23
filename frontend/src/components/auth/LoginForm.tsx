"use client";

import Link from "next/link";
import { useState } from "react";

interface LoginFormProps {
  onSubmit: (formData: any) => void;
  error?: string;
}

export default function LoginForm({ onSubmit, error }: LoginFormProps) {
  const [formData, setFormData] = useState({ email: "", password: "" });

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
        <h2 className="text-3xl font-semibold text-center">Iniciar sesión</h2>
        <p className="text-center text-gray-600">
          ¿Es tu primera vez?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Regístrate
          </Link>
        </p>

        <form onSubmit={handleSubmit} className="mt-4">
          <label className="block text-sm font-medium">Email *</label>
          <input
            type="email"
            name="email"
            className="w-full border p-2 rounded"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label className="block text-sm font-medium mt-2">Contraseña *</label>
          <input
            type="password"
            name="password"
            className="w-full border p-2 rounded"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Link href="/forgot-password" className="text-red-500 text-sm mt-1 block">
            ¿Olvidaste la contraseña?
          </Link>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded mt-4"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}
