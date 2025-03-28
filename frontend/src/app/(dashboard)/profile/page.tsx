// /app/profile/page.tsx
"use client";
import DashboardNav from "@/components/dashboard/DashboardNav";
import ProfileForm from "@/components/dashboard/ProfileForm";
import { useBootstrap } from "@/hooks/useBootstrap";
import withAuth from "@/components/withAuth";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { deleteUser } from "@/services/authService";

function ProfilePage() {
    useBootstrap();
    const router = useRouter();
    const { logout, userCorreo } = useAuthStore();

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
            console.error("Delete account error:", error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Sub-navbar de perfil */}
            <DashboardNav />

            <ProfileForm onDeleteAccount={handleDeleteAccount} />
        </div>
    );
}

export default withAuth(ProfilePage);
