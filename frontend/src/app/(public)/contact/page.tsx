'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import ContactPageForm from '@/components/public/contact/ContactPageForm';
import { Query } from '@/types/contactTypes';
import { useBootstrap } from '@/hooks/useBootstrap';

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

  useEffect(() => {
    if (isAuthenticated) {
      // Simula carga desde back-end
      setConsultations(mockConsultations);
    }
  }, [isAuthenticated]);

  const handleSubmit = async (subject: string, message: string) => {
    if (!subject || !message) return;
    // Aquí se llamaría a una función del service para enviar la consulta
    // Por ejemplo:
    // await sendConsultation({ subject, message });
    // Luego podrías actualizar el estado de las consultas
    // setConsultations((prev) => [...prev, { id: 'newId', user: userCorreo, subject, message }]);
  };

//   useEffect(() => {
//     if (isAuthenticated && userCorreo) {
//       getConsultationsByUser(userCorreo).then((data) => {
//         setConsultations(data);
//       });
//     }
//   }, [isAuthenticated, userCorreo]);

  return (
    <ContactPageForm isAuthenticated={isAuthenticated} consultations={consultations} onSubmit={handleSubmit} />
  );
}
