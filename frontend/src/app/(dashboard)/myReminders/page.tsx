"use client";

import DashboardNav from "@/components/dashboard/DashboardNav";
import { useBootstrap } from "@/hooks/useBootstrap";
import withAuth from "@/components/withAuth";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import { Reminder } from "@/types/productTypes";
import { getUserReminders } from "@/services/productService";
import RemindersForm from "@/components/dashboard/RemindersForm";

function RemindersPage() {
    useBootstrap();
    const { userCorreo } = useAuthStore();
    const [reminders, setReminders] = useState<Reminder[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        if (userCorreo) {
          getUserReminders(userCorreo)
            .then(setReminders)
            .catch((err) => setError(err.message));
        }
      }, [userCorreo]);

    const handleDelete = (id: string) => {
        setReminders((prevReminders) => prevReminders.filter((reminder) => reminder.id !== id));
        try {
            // Aquí puedes llamar a una función para eliminar el recordatorio del backend
            // await deleteReminder(id);
        }
        catch (error) {
            setError("Error al eliminar el recordatorio");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Sub-navbar de perfil */}
            <DashboardNav />
            <RemindersForm reminders={reminders} error={error} onDelete={handleDelete} />
        </div>
    );
}

export default withAuth(RemindersPage, ["usuario"]);
