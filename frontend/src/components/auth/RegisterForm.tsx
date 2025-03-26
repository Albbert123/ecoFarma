"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImCross } from "react-icons/im";
import { RegisterFormData } from "@/types/userTypes";

interface RegisterFormProps {
  onSubmit: (formData: RegisterFormData) => void;
  error?: string;
}

export default function RegisterForm({ onSubmit, error }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    correo: "",
    nombre: "",
    apellido: "",
    contraseña: "",
    es_google: false,
    rol: "usuario",
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
          className="absolute top-14 right-45 p-2 rounded-full hover:bg-gray-200 transition flex items-center justify-center"
          style={{ width: "50px", height: "50px" }} // Tamaño más grande
        >
          <ImCross size={40} className="text-black-600 hover:text-black transition" />
        </button>

        {/*Title*/}
        <h2 className="text-4xl font-semibold text-center">Regístrate</h2>

        {/*Form*/}
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-6">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre *"
              className="w-full min-w-[400px] px-2 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-black text-lg"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6">
            <input
              type="text"
              name="apellido"
              placeholder="Apellido *"
              className="w-full min-w-[400px] px-2 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-black text-lg"
              value={formData.apellido}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6">
            <input
              type="email"
              name="correo"
              placeholder="Correo *"
              className="w-full min-w-[400px] px-2 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-black text-lg"
              value={formData.correo}
              onChange={handleChange}
              required
            />
          </div>

          <input
            type="password"
            name="contraseña"
            placeholder="Contraseña *"
            className="w-full min-w-[400px] px-2 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-black text-lg"
            value={formData.contraseña}
            onChange={handleChange}
            required
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$"
            title="La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, una minúscula y un número."
          />

          {/* Mensaje de error */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          
          {/* Botón de registro */}
          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded mt-4"
          >
            Registrarse
          </button>
        </form>

        {/* Link a login */}
        <p className="text-center text-sm mt-4">
          ¿Ya eres miembro?{" "}
          <Link href="/login" className="font-semibold" style={{ textDecoration: 'none'}}>
            Inicia tu sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
