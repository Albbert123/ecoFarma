// /components/dashboard/ProfileForm.tsx
"use client";

import { useState } from "react";

export default function ProfileForm() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Updated profile:", formData);
    };

    return (
        <>
        <div className="bg-gray-800 text-white rounded-lg p-6 shadow-lg text-center">
            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-white">
                <img src="/profile-placeholder.png" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-2xl mt-4">Albert Comas Pacheco</h1>
        </div>
        <form onSubmit={handleSubmit} className="mt-6 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Información personal</h2>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-md" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Apellido</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-md" />
                </div>
            </div>
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Correo</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border rounded-md" />
            </div>
            <div className="mt-6 flex justify-end space-x-4">
                <button type="reset" className="px-4 py-2 border rounded-md text-gray-700">Descartar</button>
                <button type="submit" className="px-4 py-2 bg-gray-800 text-white rounded-md">Actualizar información</button>
            </div>
        </form>
        </>
    );
}
