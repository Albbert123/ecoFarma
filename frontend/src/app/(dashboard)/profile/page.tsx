"use client";

import DashboardNav from "@/components/dashboard/DashboardNav";
import ProfileForm from "@/components/dashboard/ProfileForm";
import { useBootstrap } from "@/hooks/useBootstrap";
import withAuth from "@/components/withAuth";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { deleteUser, updateUser } from "@/services/userService";
import { UpdateFormData } from "@/types/userTypes";
import { useState } from "react";

function ProfilePage() {
    useBootstrap();
    const router = useRouter();
    const [error, setError] = useState<string | undefined>();
    const { setUser, logout, userCorreo, token, userRole, userFromGoogle } = useAuthStore();

    const handleUpdateProfile = async (formData: UpdateFormData) => {
        try {
            const userData = await updateUser(formData);
            if (token && userRole) {
                setUser(token, userRole, userData?.new_correo ?? userCorreo, userData?.imagen, userData?.nombre, userData?.apellido, userFromGoogle);
            }
            toast.success("Actualizado con éxito 🎉");
            setError("");
        } catch (err: any) {
            setError(err.message); // Establecer el mensaje de error
        }
    };

    const handleDeleteAccount = async () => {
        try {
            // Aquí iría tu llamada API para eliminar la cuenta
            if (userCorreo) {
                await deleteUser(userCorreo);
            } else {
                throw new Error("User email is null");
            }
            
            // Cerrar sesión y redirigir
            logout();
            toast.success("Cuenta eliminada correctamente");
            setTimeout(() => {
                router.replace("/");
            }, 8);
        } catch (error) {
            toast.error("Error al eliminar la cuenta");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Sub-navbar de perfil */}
            <DashboardNav />

            <ProfileForm onDeleteAccount={handleDeleteAccount} onUpdateProfile={handleUpdateProfile} error={error}/>
        </div>
    );
}

export default withAuth(ProfilePage, ["usuario", "admin", "farmaceutico"]);
