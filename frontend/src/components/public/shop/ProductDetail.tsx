"use client";

import { Product } from "@/types/productTypes";
import { useEffect, useState } from "react";
import { FiChevronDown, FiChevronUp, FiExternalLink, FiLock } from "react-icons/fi";
import ProductCard from "./ProductCard";
import { CartItem } from "@/types/orderTypes";

interface Props {
  product: Product;
  onAddToCart: (product: CartItem) => void;
  similarProducts?: Product[];
}

export default function ProductDetail({ product, onAddToCart, similarProducts }: Props) {
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        descripcion: true,
        composicion: false,
        informacion: false
    });

    const [quantity, setQuantity] = useState(1);

    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({
        ...prev,
        [section]: !prev[section]
        }));
    };

    const handleAddToCart = () => {
        const productWithQuantity = { ...product, quantity };
        onAddToCart(productWithQuantity);
    };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Primera fila: Imagen + Info alineados en altura */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {/* Columna imagen - misma altura que el contenido */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden flex">
          {product.image && (
            <img
              src={product.image}
              alt={product.name}
              width={600}
              height={400}
              className="w-full h-auto object-cover self-center"
            />
          )}
        </div>

        {/* Columna info del producto */}
        <div className="bg-white p-5 rounded-lg shadow-sm flex flex-col justify-between h-full">
          <div>
            <h5 className="text-lg font-semibold text-gray-800">{product.name}</h5>
            <p className="text-sm text-gray-500 mt-3">Nº registro: {product.nregistro}</p>
            <p className="text-sm text-gray-500 mt-1">Laboratorio: {product.laboratory}</p>
            <p className="text-2xl font-bold text-green-600 mt-3">
              {product.price?.toFixed(2)} €
            </p>
          </div>

          <div className="mt-1">
            <div className="flex items-center gap-3 mb-4">
              <label htmlFor="qty" className="text-gray-700 text-sm">Cantidad</label>
              <input
                id="qty"
                type="number"
                value={quantity}
                min={1}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-16 border border-gray-200 rounded-md px-3 py-2 text-center focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-2">
              {product.prescription ? (
                <>
                  <div className="flex-1 bg-gray-400 text-white py-2.5 px-6 rounded-md text-sm flex items-center justify-center gap-2 cursor-not-allowed">
                    <FiLock className="text-base" />
                    Requiere receta
                  </div>
                  <button
                    disabled
                    className="bg-gray-300 text-gray-500 py-2.5 px-4 rounded-md cursor-not-allowed text-sm"
                  >
                    Recordatorio
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 px-6 rounded-md transition duration-200"
                  >
                    Añadir al carrito
                  </button>
                  <button
                    onClick={() => typeof window !== 'undefined' && window.dispatchEvent(new CustomEvent("openReminder"))}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black py-2.5 px-4 rounded-md text-sm"
                  >
                    Recordatorio
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Secciones de información */}
      <div className="space-y-3">
        {/* Descripción */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div 
            className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50 transition"
            onClick={() => toggleSection("descripcion")}
          >
            <h5 className="text-lg font-medium text-gray-800">Descripción</h5>
            {expandedSections.descripcion ? <FiChevronUp className="text-gray-500" /> : <FiChevronDown className="text-gray-500" />}
          </div>
          {expandedSections.descripcion && (
            <div className="px-4 pb-4">
              <p className="text-gray-700 text-md">{product.description}</p>
            </div>
          )}
        </div>

        {/* Composición */}
        {product.composition && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div 
              className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50 transition"
              onClick={() => toggleSection("composicion")}
            >
              <h5 className="text-lg font-medium text-gray-800">Composición</h5>
              {expandedSections.composicion ? <FiChevronUp className="text-gray-500" /> : <FiChevronDown className="text-gray-500" />}
            </div>
            {expandedSections.composicion && (
              <div className="px-4 pb-4">
                <p className="text-gray-700 text-md">{product.composition}</p>
              </div>
            )}
          </div>
        )}

        {/* Información adicional */}
        {product.AdditionalInfo && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div 
              className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50 transition"
              onClick={() => toggleSection("informacion")}
            >
              <h5 className="text-lg font-medium text-gray-800">Más información</h5>
              {expandedSections.informacion ? <FiChevronUp className="text-gray-500" /> : <FiChevronDown className="text-gray-500" />}
            </div>
            {expandedSections.informacion && (
              <div className="px-4 pb-4">
                <a
                  href={product.AdditionalInfo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 no-underline text-md"
                >
                  Ver prospecto <FiExternalLink className="ml-1.5 text-lg" />
                </a>
              </div>
            )}
          </div>
        )}

        {/* Productos similares */}
        {similarProducts && similarProducts.length > 0 && (
                <div className="mt-12 mb-12">
                    <h3 className="text-2xl font-semibold text-center mb-12">También podría interesarte</h3>
                    <div className="flex flex-wrap justify-center gap-6 mt-6">
                        {similarProducts.map((similarProduct) => (
                            <div key={similarProduct.nregistro} className="w-[300px]">
                                <ProductCard product={similarProduct} onAddToCart={handleAddToCart} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
      </div>
    </div>
  );
}