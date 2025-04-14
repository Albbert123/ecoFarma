"use client";

import { SearchData } from "@/types/productTypes";
import { Info, Search, Clock, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useProductStore } from "@/stores/productStore";
import { useAuthStore } from "@/stores/authStore";

interface Props {
  history: SearchData[];
  error?: string;
}

export default function SearchHistoryForm({ history, error }: Props) {
  const router = useRouter();
  const { setSearchQuery } = useProductStore();
  const { userCorreo } = useAuthStore();

  // Invertimos el orden del historial para mostrar los más recientes primero
  const reversedHistory = [...history].reverse();

  const handleSearchClick = (searchTerm: string) => {
    if (searchTerm.trim() !== "") {
        setSearchQuery({
            searchTerm: searchTerm,
            date: new Date(),
            user: userCorreo ?? ''
        });
        router.push(`/shop?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  // Función para formatear fecha y hora
  const formatDateTime = (dateInput: string | Date) => {
    if (!dateInput) return "Fecha no disponible";
    
    const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="mt-8 max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl text-center font-bold text-gray-800">Historial de búsqueda</h2>
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
            {reversedHistory.length} {reversedHistory.length === 1 ? 'búsqueda' : 'búsquedas'}
          </span>
        </div>

        <div className="flex items-start bg-blue-50 rounded-lg p-3 mb-8">
          <Info className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-blue-800">
            A partir de tu historial de búsqueda, te recomendamos productos específicos para ti.
            <br />
            Sólo se muestran las últimas 10 búsquedas.
          </p>
        </div>

        {/* {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )} */}

        {reversedHistory.length === 0 ? (
          <div className="text-center py-12">
            <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No hay búsquedas recientes</p>
          </div>
        ) : (
          <motion.ul 
            className="space-y-3"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {reversedHistory.map((entry, index) => (
              <motion.li 
                key={index} 
                variants={itemVariants}
                className="group"
              >
                <div 
                  className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer border border-gray-100"
                  onClick={() => handleSearchClick(entry.searchTerm || "")}
                >
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-3 group-hover:bg-blue-200 transition-colors">
                      <Search className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <span className="block font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                        "{entry.searchTerm}"
                      </span>
                      <span className="text-sm text-gray-500 flex items-center mt-1">
                        <Clock className="w-3 h-3 mr-1" />
                        {entry.date ? formatDateTime(entry.date) : "Fecha no disponible"}   
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </div>
    </div>
  );
}