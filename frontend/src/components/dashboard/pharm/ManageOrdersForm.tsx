"use client";

import { Order } from "@/types/orderTypes";
import { OrderCard } from "../OrderCard";
import { useState } from "react";

type Props = {
    orders: Order[];
    loading: boolean;
    error: string | null;
    onStatusChange: (id: string, newStatus: string) => void;
  };

export default function ManageOrdersForm({ orders, loading, error, onStatusChange }: Props) {
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [showDelivered, setShowDelivered] = useState(false);
  
    if (loading) return <p>Cargando encargos...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!orders.length) return <p>No hay encargos disponibles.</p>;

    const filteredOrders = showDelivered
    ? orders
    : orders.filter((order) => order.status.toLowerCase() !== "entregado");
  
    const sortedOrders = [...filteredOrders].sort((a, b) => {
        if (a.status === "pendiente" && b.status !== "pendiente") return 1;
        if (a.status !== "pendiente" && b.status === "pendiente") return -1;
        return 0;
    });
  
    const toggleExpand = (id: string) => {
      setExpandedId((prev: string | null) => (prev === id ? null : id));
    };
  
    return (
      <div className="space-y-4">
        <div className="mb-6 flex items-center">
            <input
            type="checkbox"
            checked={showDelivered}
            onChange={() => setShowDelivered((prev) => !prev)}
            className="form-checkbox h-4 w-4 text-blue-600 mr-3"
            />
            <label className="text-sm text-gray-700">Mostrar encargos entregados</label>
        </div>

        {sortedOrders.map((order) => (
         <OrderCard
            key={order.id}
            order={order}
            isExpanded={expandedId === order.id}
            toggleExpand={toggleExpand}
            onStatusChange={onStatusChange}
        />
        ))}
      </div>
    );
  }