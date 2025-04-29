"use client";

import { useCartStore } from "@/stores/cartStore";
import { useState } from "react";
import { Trash2, Plus, Minus, Info, Tag, Edit3, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function CartForm() {
  const { cart, removeFromCart, updateQuantity } = useCartStore();
  const [pickupDate, setPickupDate] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<"store" | "online">("store");
  const [showPromoCode, setShowPromoCode] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [showNote, setShowNote] = useState(false);
  const [note, setNote] = useState("");
  
  const total = cart.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);

  if (cart.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <div className="max-w-md mx-auto p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Tu carrito está vacío</h2>
          <p className="text-gray-500 mb-4">Agrega productos para continuar</p>
          <button 
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            onClick={() => window.history.back()}
          >
            Volver a la tienda
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Columna izquierda - Productos */}
      <div className="lg:col-span-2 space-y-4">

        <div className="space-y-4">
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div
                key={item.nregistro}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Imagen del producto */}
                  <div className="flex-shrink-0">
                    <img
                      src={item.image || "/images/encargo.jpg"}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  </div>
                  
                  {/* Información del producto */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <Link
                        href={`/shop/${item.nregistro}`}
                        className="font-medium text-gray-900 line-clamp-2 hover:underline"
                        style={{ textDecoration: 'none', color: 'inherit'}}
                        >
                        {item.name}
                        </Link>
                        <p className="text-gray-600 mt-1">{(item.price || 0).toFixed(2)} €</p>
                    </div>
                  
                  {/* Controles de cantidad y precio */}
                    <div className="flex flex-col justify-between items-end gap-2">
                        <div className="flex items-center gap-2">
                        <button
                            onClick={() => updateQuantity(item.nregistro, (item.quantity || 1) - 1)}
                            disabled={(item.quantity || 1) <= 1}
                            className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50"
                        >
                            <Minus size={16} />
                        </button>

                        <span className="px-3 py-1 bg-gray-50 rounded-md text-center min-w-[40px]">
                            {item.quantity || 1}
                        </span>

                        <button
                            onClick={() => updateQuantity(item.nregistro, (item.quantity || 1) + 1)}
                            className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                            <Plus size={16} />
                        </button>
                        </div>

                        <div className="flex items-center gap-3">
                        <p className="font-medium text-gray-900 text-right min-w-[80px]">
                            {((item.price || 0) * (item.quantity || 1)).toFixed(2)} €
                        </p>

                        <button
                            onClick={() => removeFromCart(item.nregistro)}
                            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                            aria-label="Eliminar producto"
                        >
                            <Trash2 size={18} />
                        </button>
                        </div>
                    </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Código promocional y nota */}
        <div className="space-y-3 mt-6">
          <div className="bg-white p-4 rounded-lg border border-gray-100">
            <button 
              onClick={() => setShowPromoCode(!showPromoCode)}
              className="flex items-center text-sm text-blue-600 hover:text-blue-700 transition-colors w-full justify-between"
            >
              <span className="flex items-center">
                <Tag size={16} className="mr-2" />
                {showPromoCode ? "Ocultar código promocional" : "Ingresar código promocional"}
              </span>
              <span>{showPromoCode ? "−" : "+"}</span>
            </button>
            
            {showPromoCode && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 overflow-hidden"
              >
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Introduce tu código"
                    className="flex-1 border rounded-md px-3 py-2 text-sm"
                  />
                  <button className="px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors">
                    Aplicar
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-100">
            <button 
              onClick={() => setShowNote(!showNote)}
              className="flex items-center text-sm text-blue-600 hover:text-blue-700 transition-colors w-full justify-between"
            >
              <span className="flex items-center">
                <Edit3 size={16} className="mr-2" />
                {showNote ? "Ocultar nota" : "Agregar una nota"}
              </span>
              <span>{showNote ? "−" : "+"}</span>
            </button>
            
            {showNote && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 overflow-hidden"
              >
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Notas adicionales para tu encargo..."
                  rows={3}
                  className="w-full border rounded-md px-3 py-2 text-sm"
                />
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Columna derecha - Resumen */}
      <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm sticky top-4 h-fit">
        <motion.h2 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-xl font-bold text-gray-800 pb-3 border-b border-gray-200"
        >
          Resumen del Encargo
        </motion.h2>

        {/* Fecha de recogida */}
        <div className="space-y-2 mt-4">
          <label className="text-sm font-medium text-gray-700">Fecha de recogida</label>
          <div className="relative">
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

       {/* Método de pago */}
        <div className="space-y-3 mt-6">
            <label className="text-sm font-medium text-gray-700">Método de pago</label>
            <div className="grid grid-cols-2 gap-2">
                <motion.label 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center justify-center p-3 border rounded-md cursor-pointer transition-colors ${
                    paymentMethod === "store" ? "border-blue-500 bg-blue-50" : "border-gray-300"
                }`}
                >
                <input
                    type="radio"
                    className="text-blue-500 focus:ring-blue-500 mr-2"
                    checked={paymentMethod === "store"}
                    onChange={() => setPaymentMethod("store")}
                />
                <span> En tienda</span>
                </motion.label>
                
                <motion.label 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center justify-center p-3 border rounded-md cursor-not-allowed transition-colors bg-gray-100`}
                >
                <input
                    type="radio"
                    className="text-gray-400 focus:ring-gray-400 mr-2"
                    disabled
                />
                <span className="text-gray-400"> Online</span>
                </motion.label>
            </div>
            <p className="text-sm text-gray-500 mt-2">
                El pago online estará disponible próximamente.
            </p>
        </div>

        {/* Resumen de precios */}
        <div className="mt-6 space-y-3">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Subtotal</span>
            <span>{total.toFixed(2)} €</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Impuestos</span>
            <span>0,00 €</span>
          </div>
          
          <div className="border-t border-gray-200 pt-3 mt-3 mb-3">
            <div className="flex justify-between font-bold text-gray-900">
              <span>Total</span>
              <span>{total.toFixed(2)} €</span>
            </div>
          </div>
        </div>

        {/* Botón de finalizar */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="w-full mt-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition-all"
        >
          Finalizar Encargo
        </motion.button>

        {/* Pago seguro */}
        <div className="flex items-center justify-center mt-4 text-xs text-gray-500">
          <Lock size={14} className="mr-1" />
          <span>Pago 100% seguro</span>
        </div>
      </div>
    </div>
  );
}