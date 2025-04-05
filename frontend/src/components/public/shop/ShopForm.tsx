"use client";

import { useState } from 'react';

interface ShopFormProps {
  products: any[];
  laboratories: string[];
  categories: string[];
  onAddToCart: (product: any) => void;
  onSearch: (term: string) => void;
  onFilterChange: (filters: any) => void;
}

export default function ShopForm({
  products,
  laboratories,
  categories,
  onAddToCart,
  onSearch,
  onFilterChange
}: ShopFormProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    laboratory: '',
    category: '',
    prescription: '',
    commercialization: '',
    authorization: '',
    priceRange: ''
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handleFilterUpdate = (filterType: string, value: string) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Resultados de la búsqueda</h1>
      
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar productos..."
          className="w-full p-2 border rounded"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filtros */}
        <div className="w-full md:w-1/4 bg-gray-100 p-4 rounded">
          <h2 className="font-bold mb-3">Laboratorio</h2>
          <ul className="space-y-2">
            {laboratories.map((lab) => (
              <li key={lab}>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="laboratory"
                    className="mr-2"
                    onChange={() => handleFilterUpdate('laboratory', lab)}
                  />
                  {lab}
                </label>
              </li>
            ))}
          </ul>

          <h2 className="font-bold mt-4 mb-3">Categoría</h2>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li key={cat}>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    className="mr-2"
                    onChange={() => handleFilterUpdate('category', cat)}
                  />
                  {cat}
                </label>
              </li>
            ))}
          </ul>

          <h2 className="font-bold mt-4 mb-3">Prescripción</h2>
          <ul className="space-y-2">
            <li>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="prescription"
                  className="mr-2"
                  onChange={() => handleFilterUpdate('prescription', 'Con Prescripción')}
                />
                Con Prescripción
              </label>
            </li>
            <li>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="prescription"
                  className="mr-2"
                  onChange={() => handleFilterUpdate('prescription', 'Sin Prescripción')}
                />
                Sin Prescripción
              </label>
            </li>
          </ul>

          <h2 className="font-bold mt-4 mb-3">Precio</h2>
          <ul className="space-y-2">
            {['menos de €10', '€10 a €20', '€20 a €30', '€30 a €40', 'más de €40'].map((range) => (
              <li key={range}>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="priceRange"
                    className="mr-2"
                    onChange={() => handleFilterUpdate('priceRange', range)}
                  />
                  {range}
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Resultados */}
        <div className="w-full md:w-3/4">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Q. {searchTerm || 'Paracetamol'}</h2>
            <p className="text-sm text-gray-600">1 elemento encontrado para ***</p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Productos (1)</h3>
              <span className="text-sm">Recomendaciones (2)</span>
            </div>

            <div className="border-t pt-4">
              {products.map((product) => (
                <div key={product.name} className="mb-6">
                  <h4 className="text-lg font-medium">{product.name}</h4>
                  <p className="text-xl font-bold">{product.price} €</p>
                  <button
                    onClick={() => onAddToCart(product)}
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Agregar al carrito
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-4 text-sm">
              <p>¡Valora el resultado de la búsqueda!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}