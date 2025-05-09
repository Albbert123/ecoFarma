"use client";

import React, { useEffect, useState } from "react";
import UserCard from "@/components/dashboard/admin/UserCard";
import { useBootstrap } from "@/hooks/useBootstrap";
import { FaSearch } from "react-icons/fa";
import withAuth from "@/components/withAuth";
import { UserCardData } from "@/types/userTypes";
import { deleteUser, getUsers } from "@/services/userService";
import toast from "react-hot-toast";
import { getUserOrders } from "@/services/orderService";
import { getQueriesByUser } from "@/services/queryService";

function ManageUsersPage() {
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

      const usersWithOrdersAndQueries = await Promise.all(
        filteredUsers.map(async (user: { correo: string; }) => {
          try {
            const orders = await getUserOrders(user.correo);
            const activeOrders = orders.filter((order: any) => order.status !== "Entregado");
            const orderIds = activeOrders.map((order: any) => order.id); // Extraer solo los IDs
            
            const queries = await getQueriesByUser(user.correo);
            const activeQueries = queries.filter((query: any) => query.status !== "Pendiente");
            const queryIds = activeQueries.map((query: any) => query.id); // Extraer solo los IDs
            return { ...user, encargos: orderIds, consultas: queryIds };
          } catch (err) {
            console.error(`Error al obtener encargos de ${user.correo}:`, err);
            return { ...user, encargos: [] };
          }
        })
      );
        
      setUsers(usersWithOrdersAndQueries);
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

  const handleDeleteAccount = async (correo: string) => {
    try {
        await deleteUser(correo);
        setUsers((prevUsers) => prevUsers.filter((user) => user.correo !== correo));
        toast.success("Cuenta eliminada correctamente");
    } catch (error) {
        toast.error("Error al eliminar la cuenta");
        // .error("Delete account error:", error);
    }
};

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
      {loading && <p>Cargando usuarios...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div>
        {filteredUsers.map((user) => (
          <UserCard key={user?.correo} user={user} onDelete={handleDeleteAccount}/>
        ))}
      </div>
    </div>
  );
}

export default withAuth(ManageUsersPage, ["admin"]);
