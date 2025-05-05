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
    imagen: "",
    rol: "usuario",
    newsletter: false,
    fromAdmin: false,
    fromGoogle: false,
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
    <div className="flex justify-center items-center mt-10 p-4">
      <div className="w-full max-w-xl p-8 bg-white shadow-lg rounded-lg relative">

        {/* Botón de cierre (X) - Ahora dentro de la caja y alineado a la derecha */}
        <div className="flex justify-end"> {/* Contenedor flex para alinear a la derecha */}
          <button
            onClick={() => router.push("/")}
            className="p-1 rounded-full hover:bg-gray-200 transition"
          >
            <ImCross size={20} className="text-gray-600 hover:text-black" /> {/* Tamaño reducido */}
          </button>
        </div>

        {/*Title*/}
        <h2 className="text-4xl font-semibold text-center mt-2">Regístrate</h2>

        {/*Form*/}
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-6">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre *"
              className="w-full px-3 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-black text-base"
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
              className="w-full px-3 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-black text-base"
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
              className="w-full px-3 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-black text-base"
              value={formData.correo}
              onChange={handleChange}
              required
            />
          </div>

          <input
            type="password"
            name="contraseña"
            placeholder="Contraseña *"
            className="w-full px-3 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-black text-base"
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
