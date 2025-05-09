"use client";

import React, { useState } from "react";
import { FaTrash, FaChevronDown, FaUser, FaEnvelope, FaPills } from "react-icons/fa";
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
    <div className="relative w-full mb-4 last:mb-0">
      {/* Main Card */}
      <div 
        className={`bg-gray-50 rounded-xl shadow-md overflow-hidden transition-all duration-300 ${expanded ? "ring-2 ring-blue-500" : "hover:shadow-lg"}`}
      >
        {/* Card Header */}
        <div 
          className="flex items-center justify-between p-4 cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-2 rounded-full">
              <FaPills className="text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">{pharm?.nombre} {pharm?.apellido}</h3>
              <p className="text-sm text-gray-500">{pharm?.correo}</p>
            </div>
          </div>
          
          <div className="flex items-center">
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
                <span><strong>Correo:</strong> {pharm?.correo}</span>
              </div>
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
                    Eliminar farmacéutico
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
                      onClick={() => onDelete(pharm.correo)}
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

export default PharmacistCard;