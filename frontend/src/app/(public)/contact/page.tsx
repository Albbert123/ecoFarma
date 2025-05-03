'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import ContactPageForm from '@/components/public/contact/ContactPageForm';
import { Query, QueryStatus } from '@/types/queryTypes';
import { useBootstrap } from '@/hooks/useBootstrap';
import { getQueriesByUser, sendConsultation } from '@/services/queryService';
import toast from 'react-hot-toast';
import { getUsers } from '@/services/userService';
import { PharmCardData } from '@/types/userTypes';

export default function ContactPage() {
  useBootstrap();
  const { userCorreo, isAuthenticated } = useAuthStore();
  const [consultations, setConsultations] = useState<Query[]>([]);
  const mockConsultations = [
    {
      id: '1',
      user: userCorreo || '',
      pharmacist: 'Dr. Juan Pérez',
      date: '2025-04-20',
      subject: 'Consulta sobre medicamento',
      question: '¿Es seguro tomar este medicamento con alcohol?',
      answer: null,
      status: 'Pendiente',
    },
    {
      id: '2',
      user: userCorreo || '',
      pharmacist: 'Dra. María López',
      date: '2025-04-22',
      subject: 'Efectos secundarios',
      question: '¿Cuáles son los efectos secundarios de este medicamento?',
      answer: 'Los efectos secundarios pueden incluir náuseas y mareos.',
      status: 'Respondida',
    },
  ];

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
    const newQuery: Query = {
      user: userCorreo || "",
      pharmacist: pharmacist,
      date: new Date().toISOString(),
      subject,
      question: message,
      answer: null,
      status: QueryStatus.PENDING,
    };
    try {
        await sendConsultation(newQuery);
        toast.success('Consulta enviada con éxito');
        setConsultations((prev) => [...prev, newQuery]);
    } catch (error) {
        toast.error('Error al enviar la consulta');
    }
  };

  useEffect(() => {
    if (isAuthenticated && userCorreo) {
      getQueriesByUser(userCorreo).then((queries) => {
        setConsultations(queries);
      });
    }
  }, [isAuthenticated, userCorreo]);

  return (
    <ContactPageForm isAuthenticated={isAuthenticated} consultations={consultations} onSubmit={handleSubmit} />
  );
}
