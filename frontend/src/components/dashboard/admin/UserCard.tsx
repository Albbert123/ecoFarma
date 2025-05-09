"use client";

import React, { useState } from "react";
import { FaTrash, FaChevronDown, FaUser, FaEnvelope, FaTasks, FaQuestion } from "react-icons/fa";
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
    <div className="relative w-full mb-4 last:mb-0"> {/* Added margin between cards */}
      {/* Main Card */}
      <div 
        className={`bg-gray-50 border-b-gray-900 rounded-xl shadow-md overflow-hidden transition-all duration-300 ${expanded ? "ring-2 ring-blue-500" : "hover:shadow-lg"}`}
      >
        {/* Card Header */}
        <div 
          className="flex items-center justify-between p-4 cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <FaUser className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">{user?.nombre} {user?.apellido}</h3>
              <p className="text-sm text-gray-500">{user?.correo}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Status indicators */}
            {user?.encargos?.length > 0 && (
              <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                <FaTasks className="mr-1" /> {user.encargos.length} encargo(s)
              </span>
            )}
            
            {user?.consultas?.length > 0 && (
              <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                <FaQuestion className="mr-1" /> {user.consultas.length} consulta(s)
              </span>
            )}
            
            <FaChevronDown 
              className={`text-gray-400 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
            />
          </div>
        </div>

        {/* Expanded Content */}
        {expanded && (
          <div className="px-4 pb-4 pt-2 border-t border-gray-100 bg-gray-50">
            {/* Single column layout */}
            <div className="space-y-4">
              {/* Email */}
              <div className="flex items-center text-sm text-gray-600">
                <FaEnvelope className="mr-2 text-blue-500" />
                <span><strong>Correo:</strong> {user?.correo}</span>
              </div>
              
              {/* Active Items - now below email */}
              {user?.encargos?.length > 0 && (
                <div>
                  <h4 className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <FaTasks className="mr-2 text-orange-500" />
                    Encargos activos
                  </h4>
                  <ul className="space-y-1">
                    {user.encargos.map((encargo, index) => (
                      <li key={index} className="text-sm text-gray-600 bg-orange-50 px-3 py-1 rounded">
                        #{encargo}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {user?.consultas?.length > 0 && (
                <div>
                  <h4 className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <FaQuestion className="mr-2 text-purple-500" />
                    Consultas activas
                  </h4>
                  <ul className="space-y-1">
                    {user.consultas.map((consulta, index) => (
                      <li key={index} className="text-sm text-gray-600 bg-purple-50 px-3 py-1 rounded">
                        #{consulta}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            {/* Delete Button (for admin) */}
            {userRole === "admin" && (
              <div className={`mt-4 flex ${showConfirm ? 'justify-end space-x-2' : 'justify-end'}`}>
                {!showConfirm ? (
                  <button
                    onClick={() => setShowConfirm(true)}
                    className="flex items-center px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <FaTrash className="mr-2" />
                    Eliminar usuario
                  </button>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600 mr-2">¿Estás seguro?</span>
                    <button
                      onClick={() => setShowConfirm(false)}
                      className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => onDelete && onDelete(user.correo)}
                      className="px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Confirmar
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;