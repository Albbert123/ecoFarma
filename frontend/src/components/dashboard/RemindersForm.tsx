import { Reminder } from "@/types/productTypes";
import { Trash2, Bell, Plus } from "lucide-react";

interface RemindersFormProps {
  reminders: Reminder[];
  error: string;
  onAddNew?: () => void; // Función opcional para añadir nuevo recordatorio
  onDelete?: (id: string) => void; // Función opcional para eliminar
}

export default function RemindersForm({ 
  reminders, 
  error, 
  onAddNew,
  onDelete 
}: RemindersFormProps) {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      {/* Encabezado */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Mis Recordatorios</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Administra los recordatorios para tus productos y nunca olvides una fecha importante.
        </p>
      </div>

      {/* Mensaje de error */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Botón para añadir nuevo (si existe la función) */}
      {onAddNew && (
        <div className="flex justify-end mb-6">
          <button
            onClick={onAddNew}
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus size={16} />
            Nuevo Recordatorio
          </button>
        </div>
      )}

      {/* Estado vacío */}
      {reminders.length === 0 ? (
        <div className="p-8 text-center border-2 border-dashed border-gray-300 rounded-lg">
          <div className="flex flex-col items-center justify-center space-y-4">
            <Bell className="w-12 h-12 text-gray-400" />
            <h3 className="text-xl font-medium text-gray-500">No tienes recordatorios</h3>
            <p className="text-gray-400">Comienza agregando tu primer recordatorio</p>
            {onAddNew && (
              <button 
                onClick={onAddNew} 
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Crear Recordatorio
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {reminders.map((reminder) => (
            <div 
              key={reminder.id} 
              className="p-4 border rounded-lg hover:shadow-md transition-shadow bg-white"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Bell className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-lg text-gray-800">
                      {reminder.productName || reminder.productNregistro}
                    </h3>
                  </div>
                  
                  <div className="ml-11">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Fecha: </span>
                      <span>
                        {new Date(reminder.date).toLocaleDateString("es-ES", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                {onDelete && (
                  <button
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full"
                    title="Eliminar recordatorio"
                    onClick={() => reminder.id && onDelete(reminder.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}