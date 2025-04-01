"use client";

import { useAuthStore } from "@/stores/authStore";
import { UpdateFormData } from "@/types/userTypes";
import { useState } from "react";
import toast from "react-hot-toast";

interface ProfileFormProps {
    onDeleteAccount?: () => void;
    onUpdateProfile: (formData: UpdateFormData) => void;
    error?: string;
  }

  export default function ProfileForm({ onDeleteAccount, onUpdateProfile, error }: ProfileFormProps) {
    const { userRole, userCorreo, userImagen, userNombre, userApellido, userFromGoogle } = useAuthStore();

    const [formData, setFormData] = useState({
        nombre: userNombre || "",
        apellido: userApellido || "",
        correo: userCorreo || "",
        new_correo: userCorreo || "",
        imagen: userImagen || "",
    });

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showSaveMessage, setShowSaveMessage] = useState(false);

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
    
            // Crear FormData para enviar al backend
            const formData = new FormData();
            formData.append("file", file);
    
            try {
                const response = await fetch("http://127.0.0.1:8000/images/upload", {
                    method: "POST",
                    body: formData,
                });
    
                if (!response.ok) throw new Error("Error al subir la imagen");
    
                const data = await response.json();
                const imageUrl = data.url; // URL devuelta por el backend
    
                // Actualizar imagen en el formulario
                setFormData((prev) => ({ ...prev, imagen: imageUrl }));
    
                // Mostrar mensaje para recordar que debe actualizar
                setShowSaveMessage(true);
    
                toast.success("Imagen subida correctamente");
            } catch (error) {
                toast.error("Error al subir la imagen");
            }
        }
    };
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdateProfile(formData);
        setShowSaveMessage(false);
    };

    return (
        <>
        <div className="bg-gray-800 text-white rounded-lg p-6 shadow-lg text-center">
            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-white relative cursor-pointer">
                {/* Input oculto para seleccionar imagen */}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onError={(e) => (e.currentTarget.src = "/images/default-profile.png")}
                />
            
                {/* Imagen de perfil */}
                <img 
                    src={formData.imagen ? formData.imagen : "/images/default-profile.png"} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                />
         </div>

         {showSaveMessage && (
                    <p className="text-xs text-yellow-400 mt-2">
                        ¡No olvides pulsar "Actualizar información" para guardar los cambios!
                    </p>
                )}

        <h1 className="text-2xl mt-4">Albert Comas Pacheco</h1>
        </div>
        <form onSubmit={handleSubmit} className="mt-6 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Información personal</h2>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-md" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Apellido</label>
                    <input
                        type="text"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-md" />
                </div>
            </div>
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Correo</label>
                <input
                    type="email"
                    name="new_correo"
                    value={formData.new_correo}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border rounded-md" 
                    readOnly={userFromGoogle}
                />
                {userFromGoogle && (
                    <p className="text-sm text-gray-500 mt-1">
                        El correo no se puede editar porque está vinculado a tu cuenta de Google.
                    </p>
                )}
            </div>
            <div className="mt-6 flex justify-end gap-x-5">
                <button type="reset" className="px-4 py-2 border rounded-md text-gray-700">Descartar</button>
                <button type="submit" className="px-4 py-2 bg-gray-800 text-white rounded-md">Actualizar información</button>
            </div>
            {/* Mensaje de error */}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}   
        </form>
        {/* Sección de eliminar cuenta */}
        {userRole === "usuario" ? (
            <div className="mt-8 text-center">
                {showDeleteConfirm ? (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-red-800 mb-4">¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.</p>
                        <div className="flex justify-center gap-x-10">
                            <button 
                                onClick={() => setShowDeleteConfirm(false)}
                                className="px-4 py-2 border rounded-md text-gray-700"
                            >
                                Cancelar
                            </button>
                            <button 
                                onClick={onDeleteAccount}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                            >
                                Confirmar eliminación
                            </button>
                        </div>
                    </div>
                ) : (
                    <button 
                        onClick={() => setShowDeleteConfirm(true)}
                        className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                        Eliminar cuenta
                    </button>
                )}
            </div>
        ) : null}
        </>
    );
}
