"use client";

import { FaTrashAlt, FaUpload, FaFileMedical } from "react-icons/fa";
import { PrescriptionType, PrescrptionProps } from "@/types/prescriptionTypes";
import PrescriptionCard from "./PrescriptionCard";

const PrescriptionForm = ({
  prescriptions,
  onUpload,
  onDelete,
  onAddToCart,
}: PrescrptionProps) => {
  return (
    <section className="mt-3 space-y-10 max-w-4xl mx-auto">
      {/* Upload Section */}
      <div className="space-y-6 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Subir receta médica</h2>
        
        {/* SS Prescription */}
        <div className="border border-blue-100 bg-blue-50 rounded-lg p-4 hover:bg-blue-100 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaFileMedical className="text-blue-600 text-xl" />
              <span className="text-lg font-medium text-gray-800">
                Receta electrónica de la Seguridad Social
              </span>
            </div>
            <button
              onClick={() => onUpload(PrescriptionType.ELECTRONICA)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors"
            >
              <FaUpload />
              Subir receta
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2 ml-9">
            Formatos aceptados: .pdf, .jpeg, .jpg, .png
          </p>
        </div>

        {/* Private Prescription */}
        <div className="border border-purple-100 bg-purple-50 rounded-lg p-4 hover:bg-purple-100 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaFileMedical className="text-purple-600 text-xl" />
              <span className="text-lg font-medium text-gray-800">
                Receta médica privada
              </span>
            </div>
            <button
              onClick={() => onUpload(PrescriptionType.PRIVADA)}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors"
            >
              <FaUpload />
              Subir receta
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2 ml-9">
            Formatos aceptados: .pdf, .jpeg, .jpg, .png
          </p>
        </div>
      </div>

      {/* Prescriptions List */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex justify-between items-center">
            <span>Tus recetas</span>
            <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                {prescriptions.length} {prescriptions.length === 1 ? 'receta' : 'recetas'}
            </span>
        </h2>

        {prescriptions.length === 0 ? (
            <div className="text-center py-10">
                <p className="text-gray-500">No has subido ninguna receta todavía</p>
            </div>
        ) : (
            <div className="space-y-4">
                {prescriptions.map((prescription) => (
                <PrescriptionCard
                    key={prescription.id}
                    prescription={prescription}
                    onDelete={onDelete}
                    onAddToCart={onAddToCart}
                />
                ))}
            </div>
        )}
      </div>
    </section>
  );
};

export default PrescriptionForm;