"use client";

import React, { useEffect, useState } from "react";
import UserCard from "@/components/dashboard/admin/UserCard";
import { useBootstrap } from "@/hooks/useBootstrap";
import { FaSearch } from "react-icons/fa";
import withAuth from "@/components/withAuth";
import { UserCardData } from "@/types/userTypes";
import { getUsers } from "@/services/userService";
import { getUserOrders } from "@/services/orderService";

function ConsultUsersPage() {
  useBootstrap();
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<UserCardData[]>([]); // Estado para los usuarios
  const [loading, setLoading] = useState(true); // Estado para manejar el loading
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores

  // Función para obtener usuarios de la base de datos
  const fetchUsers = async () => {
    try {
      setLoading(true); // Mostrar loading mientras se obtienen los datos
      const usersDB = await getUsers();
      const filteredUsers = usersDB.filter((user: UserCardData) => user.rol === "usuario");
      
      const usersWithOrders = await Promise.all(
        filteredUsers.map(async (user: { correo: string; }) => {
          try {
            const orders = await getUserOrders(user.correo);
            const orderIds = orders.map((order: any) => order.id); // extraer solo los IDs
            return { ...user, encargos: orderIds };
          } catch (err) {
            console.error(`Error al obtener encargos de ${user.correo}:`, err);
            return { ...user, encargos: [] };
          }
        })
      );
  
      setUsers(usersWithOrders);
    } catch (err: any) {
      setError(err.message || "Error al obtener los usuarios"); // Manejar errores
    } finally {
      setLoading(false); // Ocultar loading
    }
  };

  // Llamar a fetchUsers cuando el componente se monte
  useEffect(() => {
    fetchUsers();
  }, []);

  const normalizeText = (text: string) =>
    text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "").toLowerCase();
  
  const filteredUsers = users.filter((user) => {
    const fullName = normalizeText(`${user?.nombre} ${user?.apellido}`);
    const searchQuery = normalizeText(search);
    return fullName.includes(searchQuery);
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-10 py-4">CONSULTAR USUARIOS</h1>

      {/* Contenedor de búsqueda - Icono a la derecha sin solapamiento */}
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
      </div>

      {/* Lista de usuarios */}
      {loading && <p>Cargando usuarios...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div>
        {filteredUsers.map((user) => (
          <UserCard key={user?.correo} user={user} />
        ))}
      </div>
    </div>
  );
}

export default withAuth(ConsultUsersPage, ["farmaceutico"]);
