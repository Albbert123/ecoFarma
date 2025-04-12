import Link from "next/link";
import { ProductCardProps } from "@/types/productTypes";
import { Lock } from "lucide-react"; // Opcional

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const productImage = product.image || "/images/encargo.jpg";

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full transition-transform duration-200 hover:scale-[1.02]">
      <Link 
        href={`/shop/${product.nregistro}`} className="flex flex-col flex-grow"
        style={{ textDecoration: 'none', color: 'inherit' }}
        >
        {/* Imagen */}
        <div className="h-48 bg-gray-50 overflow-hidden flex items-center justify-center">
          <img
            src={productImage}
            alt={product.name.slice(0, 50)}
            className="w-full h-full object-cover hover:opacity-90 transition-opacity"
          />
        </div>

        {/* Detalles */}
        <div className="p-3 flex flex-col flex-grow">
          <p className="text-sm font-bold mb-2 line-clamp-2">{product.name}</p>
          <p className="text-md">{product?.price?.toFixed(2)} €</p>
        </div>
      </Link>

      {/* Botón fuera del Link */}
      <div className="px-3 pb-3 mt-auto">
        {product.prescription ? (
          <div className="w-full bg-gray-400 text-white py-1.5 px-2 rounded text-sm text-center flex items-center justify-center gap-1 cursor-not-allowed">
            <Lock size={14} />
            Requiere receta
          </div>
        ) : (
          <button
            onClick={() => onAddToCart(product)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-1.5 px-2 rounded text-sm transition-colors"
          >
            Añadir al carrito
          </button>
        )}
      </div>
    </div>
  );
}
