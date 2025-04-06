"use client";

import ShopForm from '@/components/public/shop/ShopForm';
import { useBootstrap } from '@/hooks/useBootstrap';
import { laboratories, categories } from '@/constants/constants'
import { Filters, Product } from '@/types/productTypes';

export default function ShopPage() {
    useBootstrap();
    // Datos de ejemplo (deberías reemplazarlos con tus datos reales o llamadas a API)
    const products = [
        {
            nregistro: '123456789',
            name: 'Paracetamol 100mg',
            price: 8.99,
            image: '/images/encargo.jpg',
            laboratory: 'Pfizer',
            category: 'Analgésicos y Antilinflamatorios',
            prescription: 'Sin Prescripción',
            commercialization: 'Comercializados',
            authorization: 'Autorizados'
        },
        {
            nregistro: '12345678',
            name: 'Paracetamol 2',
            price: 8.99,
            image: '/images/encargo.jpg',
            laboratory: 'Pfizer',
            category: 'Analgésicos y Antilinflamatorios',
            prescription: 'Sin Prescripción',
            commercialization: 'Comercializados',
            authorization: 'Autorizados'
        },
        {
            nregistro: '1234567',
            name: 'Paracetamol 3',
            price: 8.99,
            image: '/images/encargo.jpg',
            laboratory: 'Pfizer',
            category: 'Analgésicos y Antilinflamatorios',
            prescription: 'Sin Prescripción',
            commercialization: 'Comercializados',
            authorization: 'Autorizados'
        },
        {
            nregistro: '123456',
            name: 'Paracetamol 4',
            price: 8.99,
            image: '/images/encargo.jpg',
            laboratory: 'Pfizer',
            category: 'Analgésicos y Antilinflamatorios',
            prescription: 'Sin Prescripción',
            commercialization: 'Comercializados',
            authorization: 'Autorizados'
        }
    ];

    const recommendations = [
        {
            nregistro: '12345',
            name: 'Ibuprofeno 400mg',
            price: 5.99,
            image: '/images/encargo.jpg',
            laboratory: 'Normon',
            category: 'Analgésicos y Antilinflamatorios'
        },
        {
            nregistro: '1234',
            name: 'Vitamina C',
            price: 12.50,
            image: '/images/encargo.jpg',
            laboratory: 'Cinfa',
            category: 'Suplementos'
        }
    ];

    const handleAddToCart = (product: Product) => {
        // Lógica para agregar al carrito
        console.log('Producto agregado:', product);
    };

    const handleSearch = (searchTerm: string) => {
        // Lógica de búsqueda
        console.log('Buscando:', searchTerm);
    };

    const handleFilterChange = (newFilters: Filters) => {
        console.log('Filtros actualizados:', newFilters);
        // Aquí implementarías la lógica para filtrar los productos
        // basado en los arrays de filtros recibidos
        
        // Ejemplo básico:
        // const filteredProducts = allProducts.filter(product => {
        //   // Filtro por laboratorio
        //   if (newFilters.laboratory.length > 0 && 
        //       !newFilters.laboratory.includes(product.laboratory)) {
        //     return false;
        //   }
          
        //   // Filtro por categoría
        //   if (newFilters.category.length > 0 && 
        //       !newFilters.category.includes(product.category)) {
        //     return false;
        //   }
          
        //   // ... otros filtros
          
        //   return true;
        // });
        
        // setProducts(filteredProducts);
      };

    return (
        <ShopForm 
        products={products}
        recommendations={recommendations}
        laboratories={laboratories}
        categories={categories}
        onAddToCart={handleAddToCart}
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        />
    );
}