"use client";

import React, { useState } from "react";
import { FaTrash, FaChevronUp } from "react-icons/fa";
import { PharmCardData, UserCardData } from "@/types/userTypes";

type PharmCardProps = {
    pharm: PharmCardData;
    onDelete: (correo: string) => void;
};

const PharmacistCard: React.FC<PharmCardProps> = ({ pharm, onDelete }) => {
  const [expanded, setExpanded] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="relative flex items-start gap-2">
        {/* Tarjeta de usuario */}
        <div
            className={`border rounded-lg p-3 mb-4 w-full bg-gray-100 transition-all ${
            expanded ? "pb-4" : "h-12 flex items-center"
        }`}
        >
            <div
                className="flex justify-between items-center w-full h-full cursor-pointer p-2"
                onClick={() => setExpanded(!expanded)}
            >
                {/* Contenido centrado con alineación fija del apellido */}
                <div className="flex-1 grid grid-cols-[auto_500px] items-center">
                    <span className="min-w-[100px]">
                    <strong>Nombre:</strong> {pharm?.nombre}
                    </span>
                    <span>
                    <strong>Apellido:</strong> {pharm?.apellido}
                    </span>
                </div>

                {/* Flecha centrada */}
                <div className="flex items-center justify-center h-full">
                    <FaChevronUp
                    className={`transition-transform ${expanded ? "rotate-180" : ""}`}
                    />
                </div>
            </div>

            {expanded && (
            <div className="mt-2 bg-gray-100 p-2 rounded">
                <p>
                    <strong>Correo:</strong> {pharm?.correo}
                </p>
            </div>
            )}
        </div>

        {/* Botón eliminar */}
        {!showConfirm ? (
            <button 
                className="text-red-600 h-12 flex items-center justify-center"
                onClick={() => setShowConfirm(true)} // Mostrar confirmación
            >
                <FaTrash />
            </button>
        ) : (
            <div className="flex items-center gap-2">
                <button 
                    className="text-green-600 h-12 flex items-center justify-center"
                    onClick={() => onDelete(pharm.correo)} // Confirmar eliminación
                >
                    ✅
                </button>
                <button 
                    className="text-gray-600 h-12 flex items-center justify-center"
                    onClick={() => setShowConfirm(false)} // Cancelar eliminación
                >
                    ❌
                </button>
            </div>
        )}
    </div>
  );
};

export default PharmacistCard;
