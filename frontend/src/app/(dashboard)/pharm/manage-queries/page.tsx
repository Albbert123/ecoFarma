"use client";

import { useEffect, useState } from "react";
import withAuth from "@/components/withAuth";
import { useBootstrap } from "@/hooks/useBootstrap";
import { getAllQueries, updateQueryStatus } from "@/services/queryService";
import { useAuthStore } from "@/stores/authStore";
import toast from "react-hot-toast";
import { Query } from "@/types/queryTypes";
import ManageQueriesForm from "@/components/dashboard/pharm/ManageQueriesForm";

function ManageQueriesPage() {
    useBootstrap();
    const [queries, setQueries] = useState<Query[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { userCorreo } = useAuthStore();

    useEffect(() => {
        async function fetchQueries () {
            try {
                const data = await getAllQueries();
                const filteredQueries = data.filter((query: { pharmacist: string | null; }) => query.pharmacist === userCorreo);
                setQueries(filteredQueries);
            } catch (error) {
                setError("Error al cargar las consultas");
            } finally {
                setLoading(false);
            }
        };
        fetchQueries();
    }, [userCorreo]); 

    const handleStatusChange = async (id: string, answer: string, newStatus: string) => {
        try {
            await updateQueryStatus(id, answer, newStatus);
            toast.success("Usuario notificado correctamente");
            setQueries((prev) =>
                prev.map((query) =>
                    query.id === id ? { ...query, answer: answer, status: newStatus } : query
                )
            );
        } catch (error) {
            console.error("Error al actualizar el estado:", error);
        }
    };

    return (
        <div className="container py-4">
            <h1 className="text-2xl font-semibold mb-4 text-center">Asesoramiento en línea</h1>
            <ManageQueriesForm
                queries={queries}
                loading={loading}
                error={error}
                onStatusChange={handleStatusChange}
            />
        </div>
    )

}

export default withAuth(ManageQueriesPage, ["farmaceutico"]);