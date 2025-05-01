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
  
    if (loading) return <p>Cargando encargos...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!orders.length) return <p>No hay encargos disponibles.</p>;
  
    const sortedOrders = [...orders].sort((a, b) => {
      if (a.status === "pendiente" && b.status !== "pendiente") return -1;
      if (a.status !== "pendiente" && b.status === "pendiente") return 1;
      return 0;
    });
  
    const toggleExpand = (id: string) => {
      setExpandedId((prev: string | null) => (prev === id ? null : id));
    };
  
    return (
      <div className="space-y-4">
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