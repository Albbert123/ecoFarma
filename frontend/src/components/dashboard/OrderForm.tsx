"use client";

import { Order } from "@/types/orderTypes";
import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { OrderCard } from "./OrderCard";

type Props = {
  orders: Order[];
  loading: boolean;
};

export default function OrderForm({ orders, loading }: Props) {
  const [expandedOrders, setExpandedOrders] = useState<{ [id: string]: boolean }>({});
  const [showDelivered, setShowDelivered] = useState(false);

  const toggleExpand = (id: string) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredOrders = showDelivered
    ? orders
    : orders.filter((order) => order.status.toLowerCase() !== "entregado");

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-4" />
        <p className="text-lg text-gray-600">Cargando tus encargos...</p>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No tienes encargos</h3>
        <p className="text-gray-500 max-w-md mx-auto">
          Parece que aún no has realizado ningún encargo. Cuando lo hagas, aparecerán aquí.
        </p>
      </div>
    );
  }

  const sortedOrders = [...filteredOrders].sort((a, b) =>
    a.status === "Pendiente" && b.status !== "Pendiente" ? -1 : 1
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Mis Encargos</h2>
        <p className="text-lg text-gray-600">
          Revisa el estado de tus encargos y su historial
        </p>
      </div>

      {/* Checkbox para mostrar entregados */}
      <div className="mb-6 flex items-center">
        <input
          type="checkbox"
          checked={showDelivered}
          onChange={() => setShowDelivered((prev) => !prev)}
          className="form-checkbox h-4 w-4 text-blue-600 mr-2"
        />
        <label className="text-sm text-gray-700">Mostrar encargos entregados</label>
      </div>

      <div className="space-y-4">
        {sortedOrders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            isExpanded={order.id ? expandedOrders[order.id] ?? false : false}
            toggleExpand={toggleExpand}
          />
        ))}
      </div>
    </div>
  );
}