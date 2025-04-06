import { useState, useEffect, useRef } from 'react';
import FiltersForm from './FiltersForm';
import ProductCard from './ProductCard';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface ShopFormProps {
  products: any[];
  recommendations?: any[];
  laboratories: string[];
  categories: string[];
  onAddToCart: (product: any) => void;
  onSearch: (term: string) => void;
  onFilterChange: (filters: any) => void;
}

interface Filters {
  laboratory: string[];
  category: string[];
  prescription: string[];
  commercialization: string[];
  authorization: string[];
  priceRange: string[];
}

export default function ShopForm({
  products,
  recommendations = [],
  laboratories,
  categories,
  onAddToCart,
  onSearch,
  onFilterChange
}: ShopFormProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'products' | 'recommendations'>('products');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [rating, setRating] = useState<'up' | 'down' | null>(null);
  const [filters, setFilters] = useState<Filters>({
    laboratory: [],
    category: [],
    prescription: [],
    commercialization: [],
    authorization: [],
    priceRange: []
  });
  const filtersRef = useRef<HTMLDivElement>(null);

  // Cerrar filtros al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filtersRef.current && !filtersRef.current.contains(event.target as Node)) {
        setShowMobileFilters(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
    onFilterChange(newFilters); // Pasamos los filtros al componente padre si es necesario
  };

  return (
    <div className="container mx-auto p-4 relative">
      <h1 className="text-2xl text-center font-bold mb-4 py-3">Resultados de la búsqueda</h1>
      
      {/* Barra de búsqueda */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Qué te ocurre, qué productos necesitas..."
          className="w-full p-2 border rounded"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Tabs Navigation - Modificado para incluir la valoración */}
      <div className="flex border-b mb-4">
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'products' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('products')}
        >
          Productos ({products.length})
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'recommendations' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('recommendations')}
        >
          Recomendaciones ({recommendations.length})
        </button>

        <div className="ml-auto flex items-center gap-2">
          <span className="text-sm text-gray-500">
            {activeTab === 'products' 
              ? '¡Valora el resultado de la búsqueda!' 
              : '¡Valora el resultado de la recomendación!'}
          </span>
          <button 
  onClick={() => setRating('up')}
  className={`p-1 transition-colors ${rating === 'up' ? 'text-green-600' : 'text-gray-500 hover:text-green-600'}`}
>
  <ThumbsUp className="h-5 w-5" />
</button>
<button 
  onClick={() => setRating('down')}
  className={`p-1 transition-colors ${rating === 'down' ? 'text-red-600' : 'text-gray-500 hover:text-red-600'}`}
>
  <ThumbsDown className="h-5 w-5" />
</button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Botón de filtros móvil - Más discreto */}
        {activeTab === 'products' && (
          <div className="md:hidden">
            <button
              onClick={toggleMobileFilters}
              className="mb-4 flex items-center gap-1 text-gray-600 hover:text-gray-800 text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filtros
            </button>
          </div>
        )}

        {/* Popup de filtros para móvil */}
        {showMobileFilters && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden">
            <div 
              ref={filtersRef}
              className="absolute right-0 top-0 h-full w-4/5 max-w-md bg-white shadow-xl overflow-y-auto"
            >
              <div className="p-4 sticky top-0 bg-white border-b flex justify-between items-center">
                <h2 className="text-lg font-medium">Filtros</h2>
                <button 
                  onClick={toggleMobileFilters}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="p-4">
                <FiltersForm 
                  laboratories={laboratories}
                  categories={categories}
                  filters={filters} // Pasamos los filtros actuales
                  onFilterChange={handleFilterChange} // Pasamos el handler
                />
              </div>
            </div>
          </div>
        )}

        {/* Columna de filtros para desktop - Siempre visible */}
        <div className="hidden md:block w-full md:w-1/4">
          <FiltersForm 
            laboratories={laboratories}
            categories={categories}
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Contenido principal */}
        <div className="w-full md:w-3/4">
          {activeTab === 'products' && (
           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-10"> {/* 3 columnas con menos gap */}
              {products.length > 0 ? (
                products.map((product) => (
                  <ProductCard 
                    key={`product-${product.id || product.name}`}
                    product={product}
                    onAddToCart={onAddToCart}
                  />
                ))
              ) : (
                <div className="col-span-3 text-center py-5">
                  <p className="text-gray-500 text-sm">No se encontraron productos</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'recommendations' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-10">
              {recommendations.length > 0 ? (
                recommendations.map((product) => (
                  <ProductCard 
                    key={`recommendation-${product.id || product.name}`}
                    product={product}
                    onAddToCart={onAddToCart}
                  />
                ))
              ) : (
                <div className="col-span-3 text-center py-5">
                  <p className="text-gray-500 text-sm">No hay recomendaciones disponibles</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}