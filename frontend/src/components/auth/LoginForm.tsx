"use client";

import Link from "next/link";
import { getSession, signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImCross } from "react-icons/im";
import { LoginFormData } from "@/types/userTypes";

interface LoginFormProps {
  onSubmit: (formData: LoginFormData) => void;
  error?: string;
}

export default function LoginForm({ onSubmit, error }: LoginFormProps) {
  const [formData, setFormData] = useState({
     correo: "", 
     contraseña: "",
     es_google: false,
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
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">

        {/* Botón de cierre (X) */}
        <button
          onClick={() => router.push("/")}
          className="absolute top-14 right-45 p-2 rounded-full hover:bg-gray-200 transition flex items-center justify-center"
          style={{ width: "50px", height: "50px" }} // Tamaño más grande
        >
          <ImCross size={40} className="text-black-600 hover:text-black transition" />
        </button>

        {/*Title*/}
        <h2 className="text-3xl font-semibold text-center">Iniciar sesión</h2>
        
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
              className="w-full min-w-[400px] px-2 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-black text-lg"
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
              className="w-full min-w-[400px] px-2 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-black text-lg"
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
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-2 rounded hover:bg-gray-50 transition"
          >
            <img 
              src="https://www.google.com/favicon.ico" 
              alt="Google" 
              className="w-5 h-5"
            />
            Continuar con Google
          </button>

          {error === "auth" && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          Error al autenticar con Google. Por favor intenta nuevamente.
        </div>
      )}
        </form>
      </div>
    </div>
  );
}
