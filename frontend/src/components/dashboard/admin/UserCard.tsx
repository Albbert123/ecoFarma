"use client";

import React, { useState } from "react";
import { FaTrash, FaChevronUp } from "react-icons/fa";
import { UserCardData } from "@/types/userTypes";
import { useAuthStore } from "@/stores/authStore";

type UserCardProps = {
    user: UserCardData;
    onDelete?: (correo: string) => void;
};

const UserCard: React.FC<UserCardProps> = ({ user, onDelete }) => {
  const [expanded, setExpanded] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { userRole } = useAuthStore();

  return (
    <div className="relative flex flex-col sm:flex-row sm:items-start gap-2">
        {/* Tarjeta de usuario */}
        <div className={`border rounded-lg p-3 mb-4 w-full bg-gray-100 transition-all ${expanded ? "pb-4" : "min-h-12"}`}>
            {/* Contenedor principal con posición relativa */}
            <div className="relative w-full h-full">
                {/* Contenido del usuario */}
                <div 
                    className="pr-8 cursor-pointer" // Deja espacio para la flecha
                    onClick={() => setExpanded(!expanded)}
                >
                    {/* Nombre y apellido en columna en móvil, en fila en desktop */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                        <span className="whitespace-nowrap">
                            <strong>Nombre:</strong> {user?.nombre}
                        </span>
                        <span className="whitespace-nowrap">
                            <strong>Apellido:</strong> {user?.apellido}
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
                        <strong>Correo:</strong> {user?.correo}
                    </p>

                    {user?.encargos?.length > 0 && (
                        <div className="mt-2">
                            <p><strong>Encargos activos:</strong></p>
                            <ul>
                                {user.encargos.map((encargo, index) => (
                                    <li key={index}>• #{encargo}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {user?.consultas?.length > 0 && (
                        <div className="mt-2">
                            <p><strong>Consultas activas:</strong></p>
                            <ul>
                                {user.consultas.map((consulta, index) => (
                                    <li key={index}>• {consulta}</li>
                                ))}
                            </ul>
                        </div>
                    )}
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
                            onClick={() => onDelete && onDelete(user.correo)}
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

export default UserCard;