interface ProductCardProps {
    product: {
      name: string;
      price: number;
      laboratory?: string;
      category?: string;
    };
    onAddToCart: (product: any) => void;
  }
  
  export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
    return (
      <div className="bg-white p-4 rounded shadow mb-4">
        <h4 className="text-lg font-medium">{product.name}</h4>
        <p className="text-xl font-bold">{product.price} €</p>
        <button
          onClick={() => onAddToCart(product)}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Agregar al carrito
        </button>
      </div>
    );
  }