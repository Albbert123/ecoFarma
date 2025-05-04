"use client";

import withAuth from "@/components/withAuth";
import { useBootstrap } from "@/hooks/useBootstrap";
import { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "@/services/orderService";
import { Order } from "@/types/orderTypes";
import ManageOrdersForm from "@/components/dashboard/pharm/ManageOrdersForm";
import toast from "react-hot-toast";
import { useAuthStore } from "@/stores/authStore";

function ManageOrdersPage() {
  useBootstrap();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userCorreo } = useAuthStore();

  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await getAllOrders();
        const filteredOrders = data.filter((order: { pharmacist: string | null; }) => order.pharmacist === userCorreo); // Filtrar por farmacéutico
        setOrders(filteredOrders);
      } catch (err) {
        setError("Error al cargar los encargos");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  
    fetchOrders();
  }, [userCorreo]); // Agregar userCorreo como dependencia

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await updateOrderStatus(id, newStatus);
      toast.success("Usuario notificado correctamente");
      setOrders((prev) =>
        prev.map((order) =>
          order.id === id ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error("Error al actualizar el estado:", err);
    }
  };

  return (
    <div className="container py-4">
      <h1 className="text-2xl font-semibold mb-4 text-center">Gestión de encargos</h1>
      <ManageOrdersForm
        orders={orders}
        loading={loading}
        error={error}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}

export default withAuth(ManageOrdersPage, ["farmaceutico"]);
