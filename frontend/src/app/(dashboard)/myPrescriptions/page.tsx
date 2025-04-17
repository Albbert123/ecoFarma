"use client";

import DashboardNav from "@/components/dashboard/DashboardNav";
import { useBootstrap } from "@/hooks/useBootstrap";
import withAuth from "@/components/withAuth";
import PrescriptionForm from "@/components/dashboard/PrescriptionForm";
import { useEffect, useRef, useState } from "react";
import { Prescription, PrescriptionStatus, PrescriptionType } from "@/types/prescriptionTypes";
import toast from "react-hot-toast";
import { getPrescriptions, uploadPrescription } from "@/services/prescriptionService";
import { useAuthStore } from "@/stores/authStore";

function PrescriptionPage() {
  useBootstrap();

//   const [prescriptions, setPrescriptions] = useState<Prescription[]>([
//     {
//       id: "Receta_2024554",
//       user: "usuario",
//       type: PrescriptionType.ELECTRONICA,
//       status: PrescriptionStatus.ACTIVA,
//       validFrom: "07/03/2025",
//       validTo: "11/05/2025",
//       doctor: "Dr. Ruíz",
//       products: [
//         { name: "Ibuprofeno 600mg", price: 4.67 },
//         { name: "Lexema 60g crema", price: 6.76 },
//       ],
//     },
//     {
//         id: "Receta_2024555",
//         user: "usuario",
//         type: PrescriptionType.PRIVADA,
//         status: PrescriptionStatus.CADUCADA,
//         validFrom: "07/03/2025",
//         validTo: "11/05/2025",
//         doctor: "Dr. Ruíz",
//         products: [
//           { name: "Ibuprofeno 600mg", price: 4.67 },
//           { name: "Lexema 60g crema", price: 6.76 },
//         ],
//       },
//   ]);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [currentType, setCurrentType] = useState<PrescriptionType | null>(null);
  const { userCorreo } = useAuthStore();

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const prescriptions = await getPrescriptions(userCorreo ?? "");
        setPrescriptions(prescriptions);
      } catch (error) {
        toast.error("Hubo un problema al obtener las recetas.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchPrescriptions();
  }, [userCorreo]);

  const handleUpload = (type: PrescriptionType) => {
    setCurrentType(type);
    fileInputRef.current?.click(); // abre el selector de archivos
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentType) return;
    if (file.size > 5 * 1024 * 1024) {
        toast.error("El archivo es demasiado grande. Máximo 5MB.");
        return;
    }

    const validTypes = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
        toast.error("Formato no válido. Usa .pdf, .jpg, .jpeg o .png");
        return;
    }

    try {
        const user = userCorreo ?? "";
        const newPrescription = await uploadPrescription(user, currentType, file);
        console.log("Receta subida:", newPrescription);
        toast.success("Receta subida correctamente.");
        setPrescriptions((prev) => [...prev, newPrescription]);
    } catch (error) {
        toast.error("Hubo un problema subiendo la receta.");
    } finally {
        // limpiar input para permitir subir el mismo archivo otra vez
        if (fileInputRef.current) fileInputRef.current.value = "";
        setCurrentType(null);
    }
  };

  const handleDelete = (id: string) => {
    setPrescriptions((prev) => prev.filter((p) => p.id !== id));
  };

  const handleAddToCart = (product: string) => {
    console.log(`Agregado al carrito: ${product}`);
    // Lógica real para añadir al carrito
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <DashboardNav />
      {loading ? (
        <p>Cargando recetas...</p> // Mensaje mientras se cargan las recetas
      ) : (
        <PrescriptionForm
          prescriptions={prescriptions}
          onUpload={handleUpload}
          onDelete={handleDelete}
          onAddToCart={handleAddToCart}
        />
      )}
      {/* Input oculto */}
      <input
        type="file"
        accept=".pdf, .jpg, .jpeg, .png"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
}

export default withAuth(PrescriptionPage, ["usuario"]);
