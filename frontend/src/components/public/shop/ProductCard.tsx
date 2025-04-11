import { ProductCardProps } from "@/types/productTypes";

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
    // Usamos tu imagen encargo.jpg como placeholder
    const productImage = product.image || '/images/encargo.jpg';
  
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full transition-transform hover:scale-[1.02]">
        {/* Imagen del producto */}
        <div className="h-45 bg-gray-50 overflow-hidden flex items-center justify-center">
          <img 
            src={productImage} 
            alt={product.name}
            className="w-full h-full object-cover hover:opacity-90 transition-opacity"
          />
        </div>
  
        {/* Detalles del producto */}
        <div className="p-3 flex flex-col flex-grow">
            <p className="text-sm font-bold mb-2 line-clamp-2">{product.name}</p>
            <p className="text-md mt-auto mb-2">{product?.price?.toFixed(2)} €</p>
            {product.prescription ? (
              <div className="w-full bg-gray-400 text-white py-1.5 px-2 rounded text-sm text-center cursor-not-allowed">
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