"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImCross } from "react-icons/im";
import { FaGoogle } from "react-icons/fa";
import { LoginFormData } from "@/types/userTypes";
import { loginWithGoogle } from "@/services/googleService";

interface LoginFormProps {
  onSubmit: (formData: LoginFormData) => void;
  error?: string;
}

export default function LoginForm({ onSubmit, error }: LoginFormProps) {
  const [formData, setFormData] = useState({
     correo: "", 
     contraseña: "" 
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
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg relative">
 
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
        <h2 className="text-3xl font-semibold text-center mt-2">Iniciar sesión</h2>
        
        {/*Link to register*/}
        <p className="text-center text-gray-600 py-3">
          ¿Es tu primera vez?{" "}
          <Link href="/register" className="font-semibold" style={{ textDecoration: 'none'}}>
            Regístrate
          </Link>
        </p>

        {/*Form*/}
        <form onSubmit={handleSubmit} className="mt-6">
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

          <div className="mb-6">
            <input
              type="password"
              name="contraseña"
              placeholder="Contraseña *"
              className="w-full px-3 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-black text-base"
              value={formData.contraseña}
              onChange={handleChange}
              required
            />
          </div>

          {/*Link to forgot password*/}
          <div className="mb-6">
            <Link href="/forgot-password" className="font-semibold" style={{ textDecoration: 'none'}}>
              ¿Olvidaste la contraseña?
            </Link>
          </div>

          {/*Error message*/}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          
          {/*Login button*/}
          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded mt-4"
          >
            Iniciar sesión
          </button>

           {/*Google login button*/}
           <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">O</span>
            </div>
          </div>

          <button
            type="button"
            onClick={loginWithGoogle}
            className="w-full flex items-center justify-center bg-red-600 text-white p-2 rounded mt-4"
          >
            <FaGoogle className="mr-2" />
            Iniciar sesión con Google
          </button>
        </form>
      </div>
    </div>
  );
}
