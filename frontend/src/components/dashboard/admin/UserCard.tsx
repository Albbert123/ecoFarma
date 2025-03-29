"use client";

import React, { useState } from "react";
import { FaTrash, FaChevronUp } from "react-icons/fa";
import { UserCardData } from "@/types/userTypes";

type UserCardProps = {
    user: UserCardData;
};

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const [expanded, setExpanded] = useState(false);

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
                    <strong>Nombre:</strong> {user?.nombre}
                    </span>
                    <span>
                    <strong>Apellido:</strong> {user?.apellido}
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
                    <strong>Correo:</strong> {user?.correo}
                </p>

                <div>
                    <p>
                        <strong>Encargos activos:</strong>
                    </p>
                    <ul>
                        {user?.encargos?.map((encargo, index) => (
                            <li key={index}>• {encargo}</li>
                        ))}
                    </ul>
                </div>


                <div>
                    <p>
                        <strong>Consultas activas:</strong>
                    </p>
                    <ul>
                        {user?.consultas?.map((consulta, index) => (
                            <li key={index}>• {consulta}</li>
                        ))}
                    </ul>
                </div>

            </div>
            )}
        </div>

        {/* Botón eliminar */}
        <button className="text-red-600 h-12 flex items-center justify-center">
            <FaTrash />
        </button>
    </div>
  );
};

export default UserCard;
