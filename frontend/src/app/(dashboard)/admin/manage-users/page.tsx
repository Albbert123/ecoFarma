"use client";

import React, { useState } from "react";
import UserCard from "@/components/dashboard/admin/UserCard";
import { useBootstrap } from "@/hooks/useBootstrap";
import { FaSearch } from "react-icons/fa";
import withAuth from "@/components/withAuth";

const users = [
  {
    id: 1,
    nombre: "User",
    apellido: "Test",
    correo: "user@gmail.com",
    encargos: ["Encargo n°442"],
    consultas: ["Consulta n°121"],
  },
  {
    id: 2,
    nombre: "Miguel",
    apellido: "Díaz",
    correo: "miguel@gmail.com",
    encargos: [],
    consultas: [],
  },
];

function ManageUsersPage() {
  useBootstrap();
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.nombre.toLowerCase().includes(search.toLowerCase()) ||
      user.apellido.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-10 py-4">GESTIONAR USUARIOS</h1>

      {/* Contenedor de búsqueda y botón - Icono a la derecha sin solapamiento */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-2/5">
          <input
            type="text"
            placeholder="Buscar usuario..."
            className="border-b-2 w-full py-2 pl-3 pr-10 outline-none focus:ring-0 focus:border-gray-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <FaSearch className="text-gray-400 text-lg" />
          </div>
        </div>
        <button className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-900 transition">
          Añadir usuario
        </button>
      </div>

      {/* Lista de usuarios */}
      <div>
        {filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

export default withAuth(ManageUsersPage, ["admin"]);
