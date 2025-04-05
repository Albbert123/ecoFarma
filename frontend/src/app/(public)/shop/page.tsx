"use client";

import ShopForm from '@/components/public/shop/ShopForm';
import { useBootstrap } from '@/hooks/useBootstrap';

export default function ShopPage() {
    useBootstrap();
  // Datos de ejemplo (deberías reemplazarlos con tus datos reales o llamadas a API)
  const products = [
    {
      name: 'Paracetamol geomg',
      price: 8.99,
      laboratory: 'Pfizer',
      category: 'Analgésicos y Antilinflamatorios',
      prescription: 'Sin Prescripción',
      commercialization: 'Comercializados',
      authorization: 'Autorizados'
    }
  ];

  const laboratories = [
    'Pfizer', 'Bristol-Myers', 'Grünenthal', 'Sandoz', 'Cinfa', 
    'Normon', 'Ferrer Internacional', 'Kern', 'Otros'
  ];

  const categories = [
    'Analgésicos y Antilinflamatorios', 'Antibióticos', 'Antivirales',
    'Antifúngicos', 'Cardiovasculares', 'Antidiabéticos', 'Psicotrópicos',
    'Ectopeficientes', 'Gastrointestinales', 'Respiratorios', 'Otros'
  ];

  const handleAddToCart = (product: any) => {
    // Lógica para agregar al carrito
    console.log('Producto agregado:', product);
  };

  const handleSearch = (searchTerm: string) => {
    // Lógica de búsqueda
    console.log('Buscando:', searchTerm);
  };

  const handleFilterChange = (filters: any) => {
    // Lógica para manejar cambios en los filtros
    console.log('Filtros actualizados:', filters);
  };

  return (
    <ShopForm 
      products={products}
      laboratories={laboratories}
      categories={categories}
      onAddToCart={handleAddToCart}
      onSearch={handleSearch}
      onFilterChange={handleFilterChange}
    />
  );
}