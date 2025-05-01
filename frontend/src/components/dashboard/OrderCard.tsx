// components/OrderCard.tsx
import { Order } from "@/types/orderTypes";
import { ChevronDown, ChevronUp, Clock, CheckCircle } from "lucide-react";
import Link from "next/link";

type OrderCardProps = {
  order: Order;
  isExpanded: boolean;
  toggleExpand: (id: string) => void;
};

export const OrderCard = ({ order, isExpanded, toggleExpand }: OrderCardProps) => {
  const isPending = order.status === "Pendiente";

  return (
    <div
      className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-200 ${
        isExpanded ? "ring-2 ring-blue-200" : "hover:shadow-lg"
      }`}
    >
      <button
        onClick={() => order.id && toggleExpand(order.id)}
        className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center px-6 py-5 text-left"
      >
        {/* Contenido principal - siempre visible */}
        <div className="w-full flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center">
            {isPending ? (
              <Clock className="w-5 h-5 text-yellow-500 mr-2" />
            ) : (
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            )}
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                isPending
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {order.status}
            </span>
          </div>
          
          <div className="text-left flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium text-gray-900">Encargo #{order.id}</p>
                <p className="text-sm text-gray-500">
                  {new Date(order.pickupDate).toLocaleDateString('es-ES', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              
              {/* Precio visible solo en móvil */}
              <span className="font-bold text-gray-900 mt-2 sm:hidden">
                Total: {order.total.toFixed(2)}€
              </span>
            </div>
          </div>
        </div>

        {/* Controles derecha - ocultos en móvil */}
        <div className="hidden sm:flex items-center mt-4 sm:mt-0">
          <span className="font-bold text-gray-900 mr-3">
            {order.total.toFixed(2)}€
          </span>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </div>

        {/* Chevron visible solo en móvil */}
        <div className="flex justify-end w-full sm:hidden mt-2">
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </div>
      </button>

      {isExpanded && <OrderDetails order={order} />}
    </div>
  );
};

// Componente auxiliar para los detalles del pedido
const OrderDetails = ({ order }: { order: Order }) => (
  <div className="border-t border-gray-100 px-6 py-4 animate-fadeIn">
    {/* Sección de Detalles */}
    <div className="mb-6">
      <div className="flex items-center mb-3">
        <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h4 className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
          Detalles del encargo
        </h4>
      </div>
    
      <div className="bg-blue-50 rounded-lg p-4 space-y-3">
        <div className="flex items-start">
          <svg className="w-4 h-4 text-gray-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          <div>
            <p className="text-xs font-medium text-gray-500">Fecha de recogida</p>
            <p className="text-gray-700">
              {new Date(order.pickupDate).toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <svg className="w-4 h-4 text-gray-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          <div>
            <p className="text-xs font-medium text-gray-500">Lugar de recogida</p>
            <p className="text-gray-700">{order.address}</p>
          </div>
        </div>
      </div>
    </div>

    {/* Sección de Productos */}
    <div className="mb-6">
      <div className="flex items-center mb-3">
        <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
        </svg>
        <h4 className="text-sm font-semibold text-green-600 uppercase tracking-wider">
          Productos del encargo
        </h4>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {order.products?.map((product, i) => (
          <div 
            key={i} 
            className={`flex justify-between items-center p-4 ${i !== order.products.length - 1 ? 'border-b border-gray-100' : ''}`}
          >
            <div className="flex items-start space-x-3">
              <Link 
                href={`/shop/${product.nregistro}`}
                className="bg-gray-100 rounded-md p-2 flex items-center justify-center hover:bg-gray-200 transition-colors duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                </svg>
              </Link>
              <div>
                <p className="font-medium text-gray-800">{product.name}</p>
                <p className="text-sm text-gray-500 mt-1">Cantidad: {product.quantity}</p>
              </div>
            </div>
            <p className="font-semibold text-gray-900">
              {((product.price ?? 0) * product.quantity).toFixed(2)}€
            </p>
          </div>
        ))}
      </div>
    </div>

    {/* Resumen Total */}
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">
          <span className="font-medium">{order.products?.reduce((acc, product) => acc + product.quantity, 0)}</span> productos
        </p>
        <div className="text-right">
          <p className="text-xs font-medium text-gray-500">Total a pagar</p>
          <p className="text-xl font-bold text-blue-600">
            {order.total.toFixed(2)}€
          </p>
        </div>
      </div>
    </div>
  </div>
);