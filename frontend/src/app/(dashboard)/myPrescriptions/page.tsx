"use client";

import DashboardNav from "@/components/dashboard/DashboardNav";
import { useBootstrap } from "@/hooks/useBootstrap";
import withAuth from "@/components/withAuth";
import PrescriptionForm from "@/components/dashboard/PrescriptionForm";
import { useState } from "react";
import { Prescription, PrescriptionStatus, PrescriptionType } from "@/types/prescriptionTypes";

function ProfilePage() {
  useBootstrap();

  const [prescriptions, setPrescriptions] = useState<Prescription[]>([
    {
      id: "Receta_2024554",
        user: "usuario",
      type: PrescriptionType.ELECTRONICA,
      status: PrescriptionStatus.ACTIVA,
      validFrom: "07/03/2025",
      validTo: "11/05/2025",
      doctor: "Dr. Ruíz",
      products: [
        { name: "Ibuprofeno 600mg", price: 4.67 },
        { name: "Lexema 60g crema", price: 6.76 },
      ],
    },
    {
        id: "Receta_2024555",
        user: "usuario",
        type: PrescriptionType.PRIVADA,
        status: PrescriptionStatus.CADUCADA,
        validFrom: "07/03/2025",
        validTo: "11/05/2025",
        doctor: "Dr. Ruíz",
        products: [
          { name: "Ibuprofeno 600mg", price: 4.67 },
          { name: "Lexema 60g crema", price: 6.76 },
        ],
      },
  ]);

  const handleUpload = (type: PrescriptionType) => {
    console.log(`Subiendo receta tipo: ${type}`);
    // Aquí subirías el archivo y actualizarías las recetas del estado
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
      <PrescriptionForm
        prescriptions={prescriptions}
        onUpload={handleUpload}
        onDelete={handleDelete}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}

export default withAuth(ProfilePage, ["usuario"]);
