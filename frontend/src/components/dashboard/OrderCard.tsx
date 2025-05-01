"use client";

import { Order } from "@/types/orderTypes";
import { ChevronDown, ChevronUp, Clock, CheckCircle } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { useState } from "react";
import { OrderDetails } from "./OrderDetails";
import { updateOrderStatus } from "@/services/orderService";
import { useEffect, useRef } from "react";

type OrderCardProps = {
  order: Order;
  isExpanded: boolean;
  toggleExpand: (id: string) => void;
  onStatusChange?: (id: string, newStatus: string) => void;
};

export const OrderCard = ({ order, isExpanded, toggleExpand, onStatusChange }: OrderCardProps) => {
  const { userRole } = useAuthStore();
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [status, setStatus] = useState(order.status); // Estado local del encargo
  const isPending = status === "Pendiente";
  const statusMenuRef = useRef<HTMLDivElement>(null);

  const handleStatusClick = (newStatus: string) => {
    if (!order.id || newStatus === status) return;
    setStatus(newStatus);
    setShowStatusMenu(false);
    if (onStatusChange) {
      onStatusChange(order.id, newStatus);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (statusMenuRef.current && !statusMenuRef.current.contains(event.target as Node)) {
        setShowStatusMenu(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`bg-gray-50 rounded-xl shadow-md overflow-visible transition-all duration-200 ${
        isExpanded ? "ring-2 ring-blue-200" : "hover:shadow-lg"
      }`}
    >
      <button
        onClick={() => order.id && toggleExpand(order.id)}
        className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center px-6 py-5 text-left"
      >
        {/* Contenido principal */}
        <div className="w-full flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center">
            {isPending ? (
              <Clock className="w-5 h-5 text-yellow-500 mr-2" />
            ) : (
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            )}

            <div className="relative">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  if (userRole === "farmaceutico") {
                    setShowStatusMenu(!showStatusMenu);
                  }
                }}
                role="button"
                tabIndex={0}
                className={`px-3 py-1 rounded-full text-sm font-medium focus:outline-none cursor-pointer ${
                  isPending
                    ? "bg-yellow-100 text-yellow-800"
                    : status === "Listo para recoger"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {status}
              </div>

              {showStatusMenu && userRole === "farmaceutico" && (
                <div 
                  ref={statusMenuRef}
                  className="absolute z-10 mt-2 bg-white border border-gray-200 rounded-md shadow-lg"
                >
                  {["Pendiente", "Listo para recoger", "Entregado"].map((s) => (
                    <div
                      key={s}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStatusClick(s);
                      }}
                      role="button"
                      tabIndex={0}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    >
                      {s}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="text-left flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium text-gray-900">Encargo #{order.id}</p>
                {userRole === "farmaceutico" && order.user && (
                  <p className="font-medium text-gray-900">Usuario: {order.user}</p>
                )}
                <p className="text-sm text-gray-500">
                  {new Date(order.pickupDate).toLocaleDateString("es-ES", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              <span className="font-bold text-gray-900 mt-2 sm:hidden">
                Total: {order.total.toFixed(2)}€
              </span>
            </div>
          </div>
        </div>

        <div className="hidden sm:flex items-center mt-4 sm:mt-0">
          <span className="font-bold text-gray-900 mr-3">{order.total.toFixed(2)}€</span>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </div>

        <div className="flex justify-end w-full sm:hidden mt-2">
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </div>
      </button>

      {isExpanded && <OrderDetails order={{ ...order, status }} />}
    </div>
  );
};
