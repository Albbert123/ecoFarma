'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import ContactPageForm from '@/components/public/contact/ContactPageForm';
import { Query, QueryStatus } from '@/types/queryTypes';
import { useBootstrap } from '@/hooks/useBootstrap';
import { getQueriesByUser, sendQuery } from '@/services/queryService';
import toast from 'react-hot-toast';
import { getUsers } from '@/services/userService';
import { PharmCardData } from '@/types/userTypes';

export default function ContactPage() {
  useBootstrap();
  const { userCorreo, isAuthenticated } = useAuthStore();
  const [queries, setQueries] = useState<Query[]>([]);

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

  const handleSubmit = async (subject: string, message: string) => {
    if (!subject || !message) return;
    const pharmacist = await choosePharmacist();
    const query: Query = {
      user: userCorreo || "",
      pharmacist: pharmacist,
      date: new Date().toISOString(),
      subject,
      question: message,
      answer: null,
      status: QueryStatus.PENDING,
    };
    try {
      await sendQuery(query);
      const updatedQueries = await getQueriesByUser(userCorreo || "");
      setQueries(updatedQueries);
      toast.success("Consulta enviada con éxito");
    } catch (error) {
        toast.error('Error al enviar la consulta');
    }
  };

  useEffect(() => {
    if (isAuthenticated && userCorreo) {
      getQueriesByUser(userCorreo || "").then((queries) => {
        setQueries(queries);
      });
    }
  }, [isAuthenticated, userCorreo]);

  return (
    <ContactPageForm isAuthenticated={isAuthenticated} consultations={queries} onSubmit={handleSubmit} />
  );
}
