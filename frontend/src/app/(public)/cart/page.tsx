'use client';

import CartForm from "@/components/public/cart/CartForm";
import { useBootstrap } from "@/hooks/useBootstrap";
import { useCartStore } from "@/stores/cartStore";
import { useAuthStore } from "@/stores/authStore";
import { createOrder, sendConfirmationEmail } from "@/services/orderService";
import { useState } from "react";
import toast from "react-hot-toast";
import { Order } from "@/types/orderTypes";
import { getUsers } from "@/services/userService";
import { PharmCardData } from "@/types/userTypes";
import OrderConfirmationModal from "@/components/public/cart/OrderConfirmationModal";

export default function CartPage() {
  useBootstrap();
  const { clearCart } = useCartStore();
  const [isOrdering, setIsOrdering] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const choosePharmacist = async () : Promise<string> => {
    const usersDB = await getUsers(); // Llamada a la función asíncrona
    const pharmacists = usersDB.filter((pharm: PharmCardData) => pharm.rol === "farmaceutico");

    if (pharmacists.length === 0) {
        throw new Error("No hay farmacéuticos disponibles");
    }

    // Escoger un farmacéutico al azar
    const randomIndex = Math.floor(Math.random() * pharmacists.length);
    return pharmacists[randomIndex].correo; // Devuelve el correo del farmacéutico seleccionado
  }
  
  const handleOrder = async (orderData: Order) => {
    if (!orderData.pickupDate) {
      toast.error("Por favor, selecciona una fecha de recogida.");
      return;
    }

    try {
      setIsOrdering(true);
      orderData.pharmacist = await choosePharmacist();
      orderData.pickupDate = new Date(orderData.pickupDate).toISOString();
      orderData.note = orderData.note == "" ? null : orderData.note;
      orderData.promoCode = orderData.promoCode == "" ? null : orderData.promoCode;

      await createOrder(orderData);

      toast.success("¡Encargo realizado con éxito!");
      clearCart();
      setShowModal(true);
      await sendConfirmationEmail(orderData)
    } catch (error) {
      console.error("Error al crear encargo:", error);
      toast.error("Error al realizar el encargo. Inténtalo más tarde.");
    } finally {
      setIsOrdering(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Mi carrito</h1>
      <CartForm onOrder={handleOrder} isOrdering={isOrdering} />
      <OrderConfirmationModal show={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
