import React, { useState } from "react";
import { RegisterFormData } from "@/types/userTypes";
import toast from "react-hot-toast";

interface AddPharmFormProps {
  onAddPharmacist: (formData: RegisterFormData) => Promise<void>;
  onCancel: () => void;
}

const AddPharmForm: React.FC<AddPharmFormProps> = ({ onAddPharmacist, onCancel }) => {
  const [formData, setFormData] = useState<RegisterFormData>({
    nombre: "",
    apellido: "",
    correo: "",
    contraseña: "",
    imagen: "",
    rol: "farmaceutico",
    fromAdmin: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onAddPharmacist(formData); // Llamar a la función pasada como prop
    } catch (error) {
      console.error("Add pharmacist error:", error);
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded shadow mb-6">
      <h2 className="text-4xl font-semibold text-center mt-2">Añadir Farmacéutico</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre *"
            className="w-full min-w-[400px] px-2 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-black text-lg"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-6">
          <input
            type="text"
            name="apellido"
            placeholder="Apellido *"
            className="w-full min-w-[400px] px-2 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-black text-lg"
            value={formData.apellido}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-6">
          <input
            type="email"
            name="correo"
            placeholder="Correo *"
            className="w-full min-w-[400px] px-2 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-black text-lg"
            value={formData.correo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            name="contraseña"
            placeholder="Contraseña *"
            className="w-full min-w-[400px] px-2 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-black text-lg"
            value={formData.contraseña}
            onChange={handleChange}
            required
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$"
            title="La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, una minúscula y un número."
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
            onClick={onCancel} // Llamar a la función de cancelar
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-900 transition"
          >
            Añadir
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPharmForm;