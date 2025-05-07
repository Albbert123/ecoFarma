"use client";

import { useEffect, useState } from "react";
import { useProductStore } from "@/stores/productStore";
import { getProduct, getSimilarProducts, saveReminder } from "@/services/productService";
import { notFound } from "next/navigation";
import { Product } from "@/types/productTypes";
import ProductDetail from "@/components/public/shop/ProductDetail";
import { use } from "react";
import { Dialog } from "@headlessui/react";
import { useBootstrap } from "@/hooks/useBootstrap";
import { useCartStore } from "@/stores/cartStore";
import toast from "react-hot-toast";
import { CartItem } from "@/types/orderTypes";
import Link from "next/link";
import { useAuthStore } from "@/stores/authStore";


export default function ProductPage({ params }: { params: Promise<{ nregistro: string }> }) {
  const { nregistro } = use(params);
  useBootstrap();
  const { productsStore, addProduct } = useProductStore();
    const { userCorreo } = useAuthStore();
  const [product, setProduct] = useState<Product | null>(() =>
    productsStore.find((p) => p.nregistro === nregistro) || null
  );
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [reminderDate, setReminderDate] = useState("");
  
  const handleOpenReminder = () => setShowReminderModal(true);
  const handleCloseReminder = () => {
    setShowReminderModal(false);
    setReminderDate("");
  };

  useEffect(() => {
    if (!product) {
      getProduct(nregistro)
        .then((data) => {
          setProduct(data);
          // addProduct(data); // lo guardas también en el store
        })
        .catch(() => {
          notFound();
        });
    }
  }, [nregistro, product]);

  useEffect(() => {
    if (product) {
        getSimilarProducts(product.nregistro)
            .then((data) => {
                setSimilarProducts(data);
            })
            .catch((error) => {
                console.error("Error cargando productos similares", error);
            });
    }
  }, [product]);

  useEffect(() => {
    const openReminder = () => setShowReminderModal(true);
    window.addEventListener("openReminder", openReminder);
    return () => window.removeEventListener("openReminder", openReminder);
  }, []);

  if (!product) {
    return <p className="text-center mt-10"></p>;
  }

  const handleAddToCart = (product: CartItem) => {
    useCartStore.getState().addToCart(product)
    toast.success('Producto añadido al carrito');
  };

  const handleSetReminder = async () => {
    if (!reminderDate) {
      toast.error("Selecciona una fecha para el recordatorio");
      return;
    }
    if (!userCorreo) {
      toast.error("Debes iniciar sesión para añadir un recordatorio");
      return;
    }
    const date = new Date(reminderDate).toISOString();
    const reminder = {
      user: userCorreo,
      productName: product.name,
      productNregistro: nregistro,
      date: date,
      sent: false,
    };

    try {
      await saveReminder(reminder);
      toast.success("Recordatorio añadido");
      handleCloseReminder();
    }
    catch (error) {
      toast.error("Error al guardar el recordatorio");
    }
  };

  return (
    <div>
        <ProductDetail product={product} onAddToCart={handleAddToCart} similarProducts={similarProducts} />
        {showReminderModal && (
          <Dialog open={showReminderModal} onClose={handleCloseReminder} className="fixed z-50 inset-0 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="bg-white rounded-lg shadow-xl p-6 z-50 max-w-md w-full mx-auto">
              <Dialog.Title className="text-lg font-semibold mb-4">Añadir recordatorio</Dialog.Title>

              <label htmlFor="reminderDate" className="block text-sm font-medium text-gray-700 mb-1">Fecha del recordatorio</label>
              <input
                type="date"
                id="reminderDate"
                value={reminderDate}
                onChange={(e) => setReminderDate(e.target.value)}
                className="w-full border px-3 py-2 rounded-md mb-4"
              />

              <p className="text-sm text-gray-600 mb-4">
                Podrás ver tus recordatorios en <Link href="/myReminders" className="text-blue-600 underline">Mis recordatorios</Link>.
              </p>

              <div className="flex justify-end gap-3 mt-4">
                <button onClick={handleCloseReminder} className="px-4 py-2 rounded-md text-gray-600 hover:bg-gray-100">Cancelar</button>
                <button onClick={handleSetReminder} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">
                  Guardar
                </button>
              </div>
            </div>
          </Dialog>
        )}
    </div>
  );
}
