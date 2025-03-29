"use client";

import React, { useState } from "react";
import { FaTrash, FaChevronUp } from "react-icons/fa";
import { PharmCardData } from "@/types/userTypes";
import { useAuthStore } from "@/stores/authStore";

type PharmCardProps = {
    pharm: PharmCardData;
    onDelete: (correo: string) => void;
};

const PharmacistCard: React.FC<PharmCardProps> = ({ pharm, onDelete }) => {
  const [expanded, setExpanded] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { userRole } = useAuthStore();

  return (
    <div className="relative flex flex-col sm:flex-row sm:items-start gap-2">
        {/* Tarjeta de farmacéutico */}
        <div className={`border rounded-lg p-3 mb-4 w-full bg-gray-100 transition-all ${expanded ? "pb-4" : "min-h-12"}`}>
            {/* Contenedor principal con posición relativa */}
            <div className="relative w-full h-full">
                {/* Contenido del farmacéutico */}
                <div 
                    className="pr-8 cursor-pointer" // Deja espacio para la flecha
                    onClick={() => setExpanded(!expanded)}
                >
                    {/* Nombre y apellido en columna en móvil, en fila en desktop */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                        <span className="whitespace-nowrap">
                            <strong>Nombre:</strong> {pharm?.nombre}
                        </span>
                        <span className="whitespace-nowrap">
                            <strong>Apellido:</strong> {pharm?.apellido}
                        </span>
                    </div>
                </div>

                {/* Flecha posicionada absolutamente en la esquina superior derecha */}
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <FaChevronUp
                        className={`transition-transform ${expanded ? "rotate-180" : ""}`}
                    />
                </div>
            </div>

            {expanded && (
                <div className="mt-4 bg-gray-100 p-2 rounded">
                    <p>
                        <strong>Correo:</strong> {pharm?.correo}
                    </p>
                </div>
            )}
        </div>

        {/* Botón eliminar (responsivo) */}
        {userRole === "admin" && (
            <div className={`flex ${showConfirm ? 'flex-row' : ''} gap-2 mb-4 sm:mb-0 sm:self-center`}>
                {!showConfirm ? (
                    <button 
                        className="text-red-600 h-12 w-12 flex items-center justify-center"
                        onClick={() => setShowConfirm(true)}
                    >
                        <FaTrash />
                    </button>
                ) : (
                    <>
                        <button 
                            className="text-green-600 h-12 w-12 flex items-center justify-center"
                            onClick={() => onDelete(pharm.correo)}
                        >
                            ✅
                        </button>
                        <button 
                            className="text-gray-600 h-12 w-12 flex items-center justify-center"
                            onClick={() => setShowConfirm(false)}
                        >
                            ❌
                        </button>
                    </>
                )}
            </div>
        )}
    </div>
  );
};

export default PharmacistCard;