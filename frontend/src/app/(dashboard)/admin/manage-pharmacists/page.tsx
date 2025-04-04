"use client";

import React, { useEffect, useState } from "react";
import PharmacistCard from "@/components/dashboard/admin/PharmacistCard";
import { useBootstrap } from "@/hooks/useBootstrap";
import { FaSearch } from "react-icons/fa";
import withAuth from "@/components/withAuth";
import { PharmCardData, RegisterFormData } from "@/types/userTypes";
import { deleteUser, getUsers, registerUser } from "@/services/userService";
import toast from "react-hot-toast";
import AddPharmForm from "@/components/dashboard/admin/AddPharmForm";

function ManagePharmacistsPage() {
    useBootstrap();
    const [search, setSearch] = useState("");
    const [pharm, setPharm] = useState<PharmCardData[]>([]); // Estado para los farmaceuticos
    const [loading, setLoading] = useState(true); // Estado para manejar el loading
    const [error, setError] = useState<string | null>(null); // Estado para manejar errores
    const [showForm, setShowForm] = useState(false); // Estado para mostrar/ocultar el formulario

    // Función para obtener farmaceuticos de la base de datos
    const fetchUsers = async () => {
        try {
        setLoading(true); // Mostrar loading mientras se obtienen los datos
        const usersDB = await getUsers(); // Llamada a la función asíncrona
        const filteredUsers = usersDB.filter((pharm: PharmCardData) => pharm.rol === "farmaceutico");
        setPharm(filteredUsers); // Guardar los farmaceuticos en el estado
        } catch (err: any) {
        setError(err.message || "Error al obtener los farmaceuticos"); // Manejar errores
        } finally {
        setLoading(false); // Ocultar loading
        }
    };

    // Llamar a fetchUsers cuando el componente se monte
    useEffect(() => {
        fetchUsers();
    }, []);

    const normalizeText = (text: string) =>
        text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "").toLowerCase();
    
    const filteredUsers = pharm.filter((pharm) => {
        const fullName = normalizeText(`${pharm?.nombre} ${pharm?.apellido}`);
        const searchQuery = normalizeText(search);
        return fullName.includes(searchQuery);
    });

    const handleDeleteAccount = async (correo: string) => {
        try {
            await deleteUser(correo);
            setPharm((prevPharms) => prevPharms.filter((pharm) => pharm.correo !== correo));
            toast.success("Cuenta eliminada correctamente");
        } catch (error) {
            toast.error("Error al eliminar la cuenta");
            // console.error("Delete account error:", error);
        }
    };

    const handleAddPharmacist = async (formData: RegisterFormData) => {
        try {
            const newPharm = await registerUser(formData);
            setPharm((prevPharms) => [...prevPharms, newPharm]);
            toast.success("Farmacéutico añadido correctamente");
            setShowForm(false); // Ocultar el formulario después de añadir
        } catch (error) {
            toast.error("Error al añadir el farmacéutico");
            // console.error("Add pharmacist error:", error);
        }
    };

    return (
    <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-10 py-4">GESTIONAR FARMACÉUTICOS</h1>

        {/* Contenedor de búsqueda y botón - Icono a la derecha sin solapamiento */}
        <div className="flex justify-between items-center mb-6">
            <div className="relative w-2/5">
            <input
                type="text"
                placeholder="Buscar farmacéutico..."
                className="border-b-2 w-full py-2 pl-3 pr-10 outline-none focus:ring-0 focus:border-gray-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <FaSearch className="text-gray-400 text-lg" />
            </div>
            </div>
            <button 
                className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-900 transition"
                onClick={() => setShowForm(!showForm)} // Mostrar el formulario
            >
                Añadir farmacéutico
            </button>
        </div>

        {/* Formulario para añadir farmacéutico */}
        {showForm && (
            <AddPharmForm
            onAddPharmacist={handleAddPharmacist}
            onCancel={() => setShowForm(false)}
            />
        )}

        {/* Lista de farmaceuticos */}
        {loading && <p>Cargando farmacéuticos...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <div>
            {filteredUsers.map((pharm) => (
            <PharmacistCard key={pharm?.correo} pharm={pharm} onDelete={handleDeleteAccount}/>
            ))}
        </div>
    </div>
  );
}

export default withAuth(ManagePharmacistsPage, ["admin"]);
