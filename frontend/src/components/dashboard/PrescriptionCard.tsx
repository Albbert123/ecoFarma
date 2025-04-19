"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown, PlusCircle, Lock } from "lucide-react";
import { FaTrashAlt } from "react-icons/fa";
import { Prescription } from "@/types/prescriptionTypes";

interface Props {
  prescription: Prescription;
  onDelete: (id: string) => void;
  onAddToCart: (productName: string) => void;
}

const PrescriptionCard = ({ prescription, onDelete, onAddToCart }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedAltIndex, setSelectedAltIndex] = useState(0);
  const isExpired = prescription.status === "Caducada";
  const [showConfirm, setShowConfirm] = useState(false);
  const [prescriptionToDelete, setPrescriptionToDelete] = useState("");

  const handleDeleteClick = (id: string, e: any) => {
    e.stopPropagation();
    setPrescriptionToDelete(id);
    setShowConfirm(true);
  };
  
  const confirmDelete = () => {
    onDelete(prescriptionToDelete);
    setShowConfirm(false);
  };


  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white">
      {/* Header con efecto de gradiente */}
      <div 
        className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 flex justify-between items-start"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="space-y-1">
          <p className="font-bold text-black text-lg">{prescription.filename}</p>
          <div className="flex flex-wrap gap-2 items-center">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                prescription.type === "Electrónica"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-purple-100 text-purple-800"
              }`}
            >
              {prescription.type}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                prescription.status === "Activa"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {prescription.status}
            </span>
            <span className="text-white font-bold text-xs bg-black bg-opacity-20 px-3 py-1 rounded-full">
              <span className="font-bold">Válida:</span>{" "}
              {prescription.validFrom} - {prescription.validTo}
            </span>
            <span className="text-white font-bold text-xs bg-black bg-opacity-20 px-3 py-1 rounded-full">
              <span className="font-bold">Médico:</span> {prescription.doctor}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
            className="text-black hover:text-gray-200 transition-colors p-1"
            title={expanded ? "Ocultar detalles" : "Mostrar detalles"}
          >
            {expanded ? (
              <ChevronUp className="w-6 h-6" />
            ) : (
              <ChevronDown className="w-6 h-6" />
            )}
          </button>
          <button
            onClick={(e) => handleDeleteClick(prescription.id, e)}
            className="text-red-600 hover:text-red-200 transition-colors p-1"
            title="Eliminar receta"
          >
            <FaTrashAlt size={16} />
          </button>

          {showConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Confirmar eliminación</h3>
                <p>¿Estás seguro de que deseas eliminar esta receta?</p>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={() => setShowConfirm(false)}
                    className="px-4 py-2 border rounded"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Contenido expandible */}
      {expanded && (
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
            <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
            Medicamentos prescritos
          </h3>

          {isExpired && (
            <div className="mb-4 py-2 px-3 bg-red-50 border border-red-200 rounded-lg flex items-start">
              <span className="text-red-500 mr-2">⚠️</span>
              <p className="text-red-700 text-sm">
                Esta receta está caducada y no se pueden añadir medicamentos al carrito.
              </p>
            </div>
          )}
          
          {prescription.products?.some((prod) => "alternatives" in prod) && (
            <div className="mb-4 py-2 px-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start">
              <span className="text-yellow-500 mr-2">⚠️</span>
              <p className="text-yellow-700 text-sm">
                No se encontró un producto exacto para uno o más medicamentos. Se muestran alternativas disponibles.
              </p>
            </div>
          )}
          
          <ul className="space-y-4">
            {prescription.products?.map((prod, i) => {
              // Caso 1: Producto con alternativas
              if ("alternatives" in prod) {
                const selectedAlt = prod.alternatives[selectedAltIndex];
                return (
                  <li key={i} className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                    <div className="text-gray-700 font-medium mb-2">
                      Alternativa para{" "}
                      <span className="text-blue-600 font-semibold">{prod.original_name}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="flex-1 min-w-0"> {/* Contenedor para el select con overflow controlado */}
                        <select
                          value={selectedAltIndex}
                          onChange={(e) => setSelectedAltIndex(Number(e.target.value))}
                          className="w-full px-3 py-2 border rounded-lg text-sm font-medium bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 truncate"
                        >
                          {prod.alternatives.map((alt, j) => (
                            <option key={j} value={j} className="truncate">
                              {alt.name} (€{alt.price.toFixed(2)})
                            </option>
                          ))}
                        </select>
                      </div>
                      {isExpired ? (
                        <div className="flex-shrink-0 flex items-center justify-center gap-2 bg-gray-400 text-white px-4 py-2 text-sm rounded-lg cursor-not-allowed">
                          <Lock size={16} />
                          Añadir
                        </div>
                      ) : (
                        <button
                          onClick={() => onAddToCart(selectedAlt.name)}
                          className="flex-shrink-0 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 text-sm rounded-lg transition-all shadow-sm hover:shadow-md"
                        >
                          <PlusCircle size={16} />
                          Añadir
                        </button>
                      )}
                    </div>
                    <a
                      href={`/shop/${selectedAlt.nregistro}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-xs text-blue-600 hover:text-blue-800 hover:underline flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Ver detalles del producto
                    </a>
                  </li>
                );
              }
              // Caso 2: Producto normal
              return (
                <li key={i} className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                  <div className="text-gray-700 font-medium mb-2">
                    Medicamento prescrito
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 bg-gray-50 px-3 py-2 rounded-lg">
                      <span className="font-semibold text-gray-800">{prod.name}</span>
                      <span className="ml-2 text-md font-medium">
                        (€{prod.price.toFixed(2)})
                      </span>
                    </div>
                    {isExpired ? (
                      <div className="flex-shrink-0 flex items-center justify-center gap-2 bg-gray-400 text-white px-4 py-2 text-sm rounded-lg cursor-not-allowed">
                        <Lock size={16} />
                        Añadir
                      </div>
                    ) : (
                      <button
                        onClick={() => onAddToCart(prod.name)}
                        className="flex-shrink-0 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 text-sm rounded-lg transition-all shadow-sm hover:shadow-md"
                      >
                        <PlusCircle size={16} />
                        Añadir
                      </button>
                    )}
                  </div>
                  {"nregistro" in prod && (
                    <a
                      href={`/shop/${prod.nregistro}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-xs text-blue-600 hover:text-blue-800 hover:underline flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Ver detalles del producto
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
          
          <p className="text-xs text-gray-500 mt-4 italic">
            * Descuento de la Seguridad Social aplicado al precio, si procede.
          </p>
        </div>
      )}
    </div>
  );
};

export default PrescriptionCard;