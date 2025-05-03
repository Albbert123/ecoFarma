'use client';

import { ManageQueriesFormProps, Query } from '@/types/queryTypes';
import { FiClock, FiMessageSquare, FiCheckCircle, FiAlertCircle, FiEye, FiEyeOff } from 'react-icons/fi';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ManageQueriesForm({ queries, loading, error, onStatusChange }: ManageQueriesFormProps) {
  const [hideResolved, setHideResolved] = useState(false);
  const [expandedQuery, setExpandedQuery] = useState<string | null>(null);
  const [answerText, setAnswerText] = useState<Record<string, string>>({});

  // Filtrar consultas según el estado del checkbox
  const filteredQueries = hideResolved 
    ? queries.filter(q => q.status !== 'Respondida')
    : queries;

  const toggleExpand = (id: string) => {
    setExpandedQuery(expandedQuery === id ? null : id);
  };

  const handleAnswerChange = (id: string, text: string) => {
    setAnswerText(prev => ({ ...prev, [id]: text }));
  };

  const handleSubmitAnswer = (id: string) => {
    if (!answerText[id]?.trim()) {
      toast.error('Por favor escribe una respuesta');
      return;
    }

    onStatusChange(id, answerText[id], 'Respondida');
    setAnswerText(prev => ({ ...prev, [id]: '' }));
    setExpandedQuery(null);
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Cargando consultas...</p>
      </div>
    );
  }

  if (queries.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <FiMessageSquare className="mx-auto text-3xl text-gray-400 mb-3" />
        <h3 className="text-lg font-medium text-gray-700">No hay consultas asignadas</h3>
        <p className="text-gray-500">Actualmente no tienes consultas asignadas a tu perfil</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-lg text-center">
        <FiAlertCircle className="inline-block text-xl mr-2" />
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <FiMessageSquare className="text-emerald-600 mr-2" />
          Mis consultas asignadas
        </h2>

        <label className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              checked={hideResolved}
              onChange={() => setHideResolved(!hideResolved)}
              className="sr-only"
            />
          </div>
          <div className="ml-3 flex items-center text-gray-700">
            {hideResolved ? (
              <FiEyeOff className="mr-2 text-gray-500" />
            ) : (
              <FiEye className="mr-2 text-gray-500" />
            )}
            Ocultar respondidas
          </div>
        </label>
      </div>

      {filteredQueries.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <FiClock className="mx-auto text-3xl text-gray-400 mb-3" />
          <h3 className="text-lg font-medium text-gray-700">No hay consultas pendientes</h3>
          <p className="text-gray-500">No tienes consultas asignadas o todas han sido respondidas</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredQueries.map((query) => (
            <div 
              key={query.id} 
              className={`border-l-4 ${query.status === 'Respondida' ? 'border-emerald-500' : 'border-amber-500'} bg-white rounded-lg shadow-sm overflow-hidden`}
            >
              <div 
                className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => query.id && toggleExpand(query.id)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800">{query.subject}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      <span className="font-medium">Usuario:</span> {query.user}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Fecha:</span> {new Date(query.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    query.status === 'Respondida' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {query.status === 'Respondida' ? (
                      <FiCheckCircle className="mr-1" />
                    ) : (
                      <FiClock className="mr-1" />
                    )}
                    {query.status}
                  </span>
                </div>
              </div>

              {expandedQuery === query.id && (
                <div className="px-4 pb-4">
                  <div className="border-t pt-4 mb-4">
                    <h4 className="font-medium text-gray-700 mb-2">Consulta:</h4>
                    <p className="text-gray-600 whitespace-pre-line">"{query.question}"</p>
                  </div>

                  {query.status === 'Respondida' ? (
                    <div className="bg-emerald-50 p-3 rounded-md">
                      <h4 className="font-medium text-emerald-800 mb-2">Tu respuesta:</h4>
                      <p className="text-gray-700 whitespace-pre-line">"{query.answer}"</p>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Responder:</label>
                      <textarea
                        value={answerText[query.id] || ''}
                        onChange={(e) => query.id && handleAnswerChange(query.id, e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition min-h-[120px]"
                        placeholder="Escribe tu respuesta aquí..."
                      />
                      <div className="flex justify-end mt-3">
                        <button
                          onClick={() => query.id && handleSubmitAnswer(query.id)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300 flex items-center"
                        >
                          <FiCheckCircle className="mr-2" />
                          Enviar respuesta
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}