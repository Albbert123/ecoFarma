import { useState, useEffect, useRef } from 'react';
import FiltersForm from './FiltersForm';
import ProductCard from './ProductCard';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Filters, ShopFormProps } from '@/types/productTypes';
import { useRouter, useSearchParams } from 'next/navigation';
import { useProductStore } from "@/stores/productStore";

export default function ShopForm({
  products,
  recommendations = [],
  laboratories,
  categories,
  initialSearchTerm,
  onAddToCart,
  onSearch,
  onFilterChange,
  onSortChange
}: ShopFormProps) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm || '');
  const [activeTab, setActiveTab] = useState<'products' | 'recommendations'>('products');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [rating, setRating] = useState<'up' | 'down' | null>(null);
  const [filters, setFilters] = useState<Filters>({
    laboratory: [],
    category: [],
    prescription: [],
    priceRange: []
  });
  const filtersRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { sortOption } = useProductStore();


  // Cálculo de productos visibles en la página actual
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Total de páginas
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Resetear a la página 1 cuando cambie la búsqueda o los productos
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, products]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

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

  useEffect(() => {
    const newFilters: Filters = {
      laboratory: searchParams.getAll("laboratory"),
      category: searchParams.getAll("category"),
      prescription: searchParams.getAll("prescription"),
      priceRange: searchParams.getAll("priceRange"),
    };
  
    const filtersChanged = JSON.stringify(filters) !== JSON.stringify(newFilters);
    if (filtersChanged) {
      setFilters(newFilters);
      onFilterChange(newFilters);
    }
  }, [searchParams]);  

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  // Añade esta función:
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(searchTerm);
    }
  };

  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
    onFilterChange(newFilters); // Pasamos los filtros al componente padre si es necesario

    const query = new URLSearchParams();

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        if (Array.isArray(value)) {
          value.forEach((val) => query.append(key, val));
        } else {
          query.append(key, value.toString());
        }
      }
    });

    // // Puedes añadir otros params si los necesitas, como paginación o límite
    // query.set('limit', '30');

    router.replace(`/shop?${query.toString()}`, { scroll: false });

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
        onKeyDown={handleSearchKeyDown}
      />
      </div>

      {/* Tabs Navigation - Reorganizado para mobile */}
      <div className="flex flex-col md:flex-row border-b mb-4">
        <div className="flex flex-1">
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
        </div>

        {/* Fila para desktop - Ordenación y Valoración */}
        <div className="hidden md:flex items-center gap-4">
          {/* Ordenacion */}
          <div className="flex items-center">
            <select 
              onChange={(e) => onSortChange(e.target.value)}
              className="p-1 border rounded text-sm"
              defaultValue={sortOption}
            >
              <option value="sin-prescripcion">Sin prescripción primero</option>
              <option value="con-prescripcion">Con prescripción primero</option>
              <option value="mas-baratos">Más baratos primero</option>
              <option value="mas-caros">Más caros primero</option>
              <option value="a-z">A-Z</option>
              <option value="z-a">Z-A</option>
            </select>
          </div>

          {/* Valoración */}
          <div className="flex items-center gap-2">
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
      </div>

      {/* Fila para móviles - Filtros y Ordenación */}
      <div className="flex md:hidden items-center justify-between mt-2 mb-3">
          <button
            onClick={toggleMobileFilters}
            className="flex items-center gap-1 text-gray-600 hover:text-gray-800 text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filtros
          </button>

          <div className="flex items-center">
            <select 
              onChange={(e) => onSortChange(e.target.value)}
              className="p-1 border rounded text-sm"
              defaultValue="sin-prescripcion"
            >
              <option value="sin-prescripcion">Sin prescripción primero</option>
              <option value="con-prescripcion">Con prescripción primero</option>
              <option value="mas-baratos">Más baratos primero</option>
              <option value="mas-caros">Más caros primero</option>
              <option value="a-z">A-Z</option>
              <option value="z-a">Z-A</option>
            </select>
          </div>
        </div>


      {/* Valoración para móviles (debajo de todo) */}
      <div className="md:hidden flex items-center justify-center gap-2 mt-4 mb-10">
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

      <div className="flex flex-col md:flex-row gap-6">
        {/* Popup de filtros para móvil */}
        {showMobileFilters && (
          <div className="fixed inset-0 bg-black bg-opacity-50 md:hidden">
            <div 
              ref={filtersRef}
              className="absolute right-0 top-16 h-[calc(100%-4rem)] w-4/5 max-w-md bg-white shadow-xl overflow-y-auto"
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
                currentProducts.map((product) => (
                  <ProductCard 
                    key={`product-${product.nregistro || product.name}`}
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
                    key={`recommendation-${product.nregistro || product.name}`}
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

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-3 space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Anterior
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}