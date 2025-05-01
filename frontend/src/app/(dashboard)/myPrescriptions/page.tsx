"use client";

import DashboardNav from "@/components/dashboard/DashboardNav";
import { useBootstrap } from "@/hooks/useBootstrap";
import withAuth from "@/components/withAuth";
import PrescriptionForm from "@/components/dashboard/PrescriptionForm";
import { useEffect, useRef, useState } from "react";
import { Prescription, PrescriptionStatus, PrescriptionType } from "@/types/prescriptionTypes";
import toast from "react-hot-toast";
import { deletePrescription, getPrescriptions, uploadPrescription } from "@/services/prescriptionService";
import { useAuthStore } from "@/stores/authStore";
import { useCartStore } from "@/stores/cartStore";
import { Product } from "@/types/productTypes";
import { getProduct } from "@/services/productService";
import { CartItem } from "@/types/orderTypes";

function PrescriptionPage() {
  useBootstrap();
  
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

    const validTypes = ["application/pdf"];
    if (!validTypes.includes(file.type)) {
        toast.error("Formato no válido. Usa .pdf");
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
    try {
        deletePrescription(id);
        setPrescriptions((prev) => prev.filter((prescription) => prescription.id !== id));
        toast.success("Receta eliminada correctamente.");
    } catch (error) {
        toast.error("Hubo un problema eliminando la receta.");
    }
  };

  const handleAddToCart = async (product: CartItem) => {
    try {
      // 1. Llamamos a la base de datos para obtener el producto completo
      const productFromDb = await getProduct(product.nregistro);
  
      // 2. Construimos el nuevo producto con la imagen que hemos recuperado
      const productWithImage = {
        ...product,
        quantity: product.quantity ?? 1,
        image: productFromDb?.image || product.image || "", // Prioridad: imagen de la base de datos, luego la que tenga
      };
  
      // 3. Añadimos al carrito
      useCartStore.getState().addToCart(productWithImage);
      toast.success("Producto añadido al carrito");
    } catch (error) {
      console.error("Error añadiendo al carrito:", error);
      toast.error("No se pudo añadir el producto");
    }
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
