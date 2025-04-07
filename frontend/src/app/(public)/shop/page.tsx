"use client";

import { useState, useEffect } from 'react';
import ShopForm from '@/components/public/shop/ShopForm';
import { useBootstrap } from '@/hooks/useBootstrap';
import { laboratories, categories } from '@/constants/constants';
import { Filters, Product, ProductSummary } from '@/types/productTypes';
import { getProducts } from '@/services/productService';
import { useProductStore } from "@/stores/productStore";

export default function ShopPage() {
    useBootstrap();

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const setProductsStore = useProductStore((state) => state.setProductsStore);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const fetchedProducts = await getProducts();
                setProducts(fetchedProducts);

                const summarized = fetchedProducts.map((p: ProductSummary) => ({
                    nregistro: p.nregistro,
                    name: p.name,
                    price: p.price,
                    stock: p.stock,
                    image: p.image,
                    principleAct: p.principleAct
                }));
                setProductsStore(summarized);
            } catch (error) {
                console.error('Error al obtener los productos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const recommendations = [
        {
            nregistro: '12345',
            name: 'Ibuprofeno 400mg',
            price: 5.99,
            image: '/images/encargo.jpg',
            laboratory: 'Normon',
            category: 'Analgésicos y Antiinflamatorios'
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
        console.log('Producto agregado:', product);
    };

    const handleSearch = (searchTerm: string) => {
        console.log('Buscando:', searchTerm);
    };

    const handleFilterChange = (newFilters: Filters) => {
        console.log('Filtros actualizados:', newFilters);
    };

    if (loading) {
        return <p></p>;
    }

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
