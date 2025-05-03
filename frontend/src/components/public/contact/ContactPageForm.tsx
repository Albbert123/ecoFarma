'use client';

import { ContactPageFormProps } from '@/types/contactTypes';
import { useState, useEffect, useRef } from 'react';
import { FiSend, FiPhone, FiMail, FiMapPin, FiClock, FiMessageSquare, FiAlertCircle, FiArrowDown } from 'react-icons/fi';
import Link from 'next/link';

export default function ContactPageForm({ isAuthenticated, consultations, onSubmit }: ContactPageFormProps) {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const historyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !message) return;
    
    if (!isAuthenticated) {
      setShowLoginMessage(true);
      return;
    }
    
    onSubmit(subject, message);
    setSubject('');
    setMessage('');
  };

  const scrollToHistory = () => {
    historyRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatDateSafe = (dateString: string) => {
    if (!isClient) return dateString;
    
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-emerald-700 mb-4">Contáctanos</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          ¿Necesitas ayuda? ¡Estamos aquí para ti! En EcoFarma, queremos asegurarnos de que recibas la atención que necesitas.
        </p>
      </div>

      {/* Row 1: Asesoramiento en línea */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex items-center mb-6">
          <div className="bg-emerald-100 p-3 rounded-full mr-4">
            <FiMessageSquare className="text-emerald-600 text-xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Asesoramiento en línea</h2>
        </div>
        
        <div className="text-gray-600 mb-6">
          <p>Nuestro equipo de farmacéuticos está disponible para responder tus preguntas sobre medicamentos, tratamientos o cualquier duda relacionada con tu salud.</p>
          {isClient && !isAuthenticated && (
            <p className="mt-2 text-sm text-gray-500">
              Para enviar consultas necesitas iniciar sesión.
            </p>
          )}
        </div>

        {showLoginMessage && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg flex items-start">
            <FiAlertCircle className="mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Debes iniciar sesión para enviar consultas</p>
              <Link 
                href="/login" 
                className="text-emerald-600 hover:underline inline-flex items-center mt-1"
                prefetch={false}
              >
                Ir a la página de inicio de sesión
              </Link>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Asunto*</label>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
              placeholder="Ej: Consulta sobre medicamento X"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Mensaje*</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition min-h-[120px]"
              placeholder="Describe tu consulta en detalle..."
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300 flex items-center justify-center"
            >
              <FiSend className="mr-2" />
              Enviar Consulta
            </button>

            {isClient && isAuthenticated && consultations.length > 0 && (
              <button
                type="button"
                onClick={scrollToHistory}
                className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-6 rounded-lg transition duration-300 flex items-center justify-center"
              >
                <FiArrowDown className="mr-2" />
                Ver mis consultas anteriores
              </button>
            )}
          </div>
        </form>
      </section>

      {/* Row 2: Otras formas de contacto */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Otras formas de contacto</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
            <div className="bg-emerald-100 p-3 rounded-full mb-4">
              <FiPhone className="text-emerald-600 text-xl" />
            </div>
            <h3 className="font-semibold text-lg text-gray-800">Teléfono</h3>
            <p className="text-gray-600">+34 937 832 334</p>
            <p className="text-sm text-gray-500 mt-2">Lunes a Viernes: 9:00 - 20:00</p>
          </div>

          <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
            <div className="bg-emerald-100 p-3 rounded-full mb-4">
              <FiMail className="text-emerald-600 text-xl" />
            </div>
            <h3 className="font-semibold text-lg text-gray-800">Email</h3>
            <p className="text-gray-600">infoecofarma@gmail.com</p>
            <p className="text-sm text-gray-500 mt-2">Respuesta en 24-48 horas</p>
          </div>

          <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
            <div className="bg-emerald-100 p-3 rounded-full mb-4">
              <FiMapPin className="text-emerald-600 text-xl" />
            </div>
            <h3 className="font-semibold text-lg text-gray-800">Dirección</h3>
            <p className="text-gray-600">Calle Dolores 10</p>
            <p className="text-gray-600">Mataró, Barcelona 08350</p>
            <p className="text-sm text-gray-500 mt-2">Horario tienda: 9:00 - 21:00</p>
          </div>
        </div>
      </section>

      {/* Row 3: Historial de consultas */}
      <div ref={historyRef}>
        {isClient && isAuthenticated && consultations.length > 0 && (
          <section className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-6">
              <div className="bg-emerald-100 p-3 rounded-full mr-4">
                <FiClock className="text-emerald-600 text-xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Historial de consultas</h2>
            </div>

            <div className="space-y-4">
              {consultations.map((c) => (
                <div key={c.id} className={`border-l-4 ${c.status === 'Respondida' ? 'border-emerald-500' : 'border-amber-500'} p-4 rounded-md bg-gray-50`}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 mb-2">{c.subject}</p>
                      <p className="text-gray-600 italic mb-3">"{c.question}"</p>
                      {c.answer ? (
                        <div className="bg-emerald-50 p-3 rounded-md mt-2">
                          <p className="font-medium text-emerald-800 mb-1">Respuesta:</p>
                          <p className="text-gray-700">"{c.answer}"</p>
                        </div>
                      ) : (
                        <div className="bg-amber-50 p-3 rounded-md mt-2">
                          <p className="font-medium text-amber-800 mb-1">Estado:</p>
                          <p className="text-gray-700">Nuestro farmacéutico responderá a tu consulta lo antes posible.</p>
                        </div>
                      )}
                    </div>
                    <div className="text-right ml-4">
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${c.status === 'Respondida' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                        {c.status}
                      </span>
                      <p className="text-xs text-gray-500 mt-2">{formatDateSafe(c.date)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}