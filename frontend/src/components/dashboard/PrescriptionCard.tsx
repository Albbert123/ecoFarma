"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown, PlusCircle } from "lucide-react";
import { FaTrashAlt } from "react-icons/fa";
import { Prescription } from "@/types/prescriptionTypes";

interface Props {
  prescription: Prescription;
  onDelete: (id: string) => void;
  onAddToCart: (productName: string) => void;
}

const PrescriptionCard = ({ prescription, onDelete, onAddToCart }: Props) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 flex justify-between items-start">
        <div>
          <p className="font-bold text-gray-800">{"Receta_"}{prescription.id}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm">
            <span className={`bg-blue-100 text-blue-800 px-2 py-0.5 rounded ${
                prescription.type === "Electrónica"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-purple-100 text-purple-800"
              }`}
            >
              {prescription.type}
            </span>
            <span
              className={`px-2 py-0.5 rounded ${
                prescription.status === "Activa"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {prescription.status}
            </span>
            <span className="text-gray-600">
              <span className="font-medium">Válida:</span>{" "}
              {prescription.validFrom} - {prescription.validTo}
            </span>
            <span className="text-gray-600">
              <span className="font-medium">Médico:</span> {prescription.doctor}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            title={expanded ? "Ocultar detalles" : "Mostrar detalles"}
          >
            {expanded ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
          <button
            onClick={() => onDelete(prescription.id)}
            className="text-red-500 hover:text-red-700 transition-colors"
            title="Eliminar receta"
          >
            <FaTrashAlt />
          </button>
        </div>
      </div>

      {expanded && (
        <div className="p-4 border-t">
          <h3 className="font-medium text-gray-700 mb-3">
            Medicamentos prescritos:
          </h3>
          <ul className="space-y-3">
            {prescription.products?.map((prod, i) => (
              <li key={i} className="flex items-center justify-between">
                <div>
                  <span className="font-medium">• {prod.name}</span>
                  <span className="text-sm text-gray-600 ml-2">
                    (Precio: €{prod.price.toFixed(2)})
                  </span>
                </div>
                <button
                  onClick={() => onAddToCart(prod.name)}
                  className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 text-sm rounded-lg transition-colors"
                >
                  <PlusCircle size={16} />
                  Añadir al carrito
                </button>
              </li>
            ))}
          </ul>
          <p className="text-xs text-gray-500 mt-3">
            * Descuento de la Seguridad Social aplicado al precio.
          </p>
        </div>
      )}
    </div>
  );
};

export default PrescriptionCard;
