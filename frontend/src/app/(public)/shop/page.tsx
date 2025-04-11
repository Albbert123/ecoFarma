"use client";

import { useState, useEffect } from 'react';
import ShopForm from '@/components/public/shop/ShopForm';
import { useBootstrap } from '@/hooks/useBootstrap';
import { laboratories, categories } from '@/constants/constants';
import { Filters, Product, ProductSummary } from '@/types/productTypes';
import { getFilteredProducts, getProducts } from '@/services/productService';
import { useProductStore } from "@/stores/productStore";

export default function ShopPage() {
    useBootstrap();

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const setProductsStore = useProductStore((state) => state.setProductsStore);
    const clearProducts = useProductStore((state) => state.clearProducts);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const filteredProducts = await getFilteredProducts({prescription: false, limit: 30});
                setProducts(filteredProducts);
                console.log('Productos filtrados:', filteredProducts);
                clearProducts();
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

    const summarize = (products: Product[]) => products.map((p) => ({
        nregistro: p.nregistro,
        name: p.name,
        price: p.price ?? 0,
        stock: p.stock ?? 0,
        image: p.image ?? '',
        principleAct: p.principleAct ?? '',
        laboratory: p.laboratory ?? '',
        category: p.category ?? '',
        prescription: p.prescription ?? false,
    }));

    const buildFiltersQuery = (newFilters: Filters): any =>{
        const filtersQuery: any = {};
    
        // Multiple laboratories
        if (newFilters.laboratory?.length) {
            filtersQuery.laboratory = newFilters.laboratory;
        }
    
        // Multiple categories
        if (newFilters.category?.length) {
            filtersQuery.category = newFilters.category;
        }
    
        // Prescription (se permite solo un valor)
        if (newFilters.prescription?.length) {
            const pres = newFilters.prescription[0];
            if (pres === "true") {
                filtersQuery.prescription = true;
            } else if (pres === "false") {
                filtersQuery.prescription = false;
            }
        }
    
        // Price range
        if (newFilters.priceRange?.length) {
            let min = Infinity;
            let max = -Infinity;
    
            newFilters.priceRange.forEach((rangeStr: string) => {
                if (rangeStr.includes("Menos de")) {
                    min = Math.min(min, 0);
                    max = Math.max(max, 10);
                } else if (rangeStr.includes("Más de")) {
                    min = Math.min(min, 40);
                    max = Math.max(max, 1000); // suponiendo 1000 como techo
                } else {
                    // Rango como "€10 a €20"
                    const cleaned = rangeStr.replace(/[€ ]/g, "").split("a");
                    if (cleaned.length === 2) {
                        const low = parseFloat(cleaned[0]);
                        const high = parseFloat(cleaned[1]);
                        min = Math.min(min, low);
                        max = Math.max(max, high);
                    }
                }
            });
    
            if (min !== Infinity) filtersQuery.min_price = min;
            if (max !== -Infinity) filtersQuery.max_price = max;
        }
    
        return filtersQuery;
    }
    
    const handleFilterChange = async (newFilters: Filters) => {
        console.log('Filtros actualizados:', newFilters);

        const noFiltersSelected =
        (!newFilters.laboratory || newFilters.laboratory.length === 0) &&
        (!newFilters.category || newFilters.category.length === 0) &&
        (!newFilters.prescription || newFilters.prescription.length === 0) &&
        (!newFilters.priceRange || newFilters.priceRange.length === 0);

        if (noFiltersSelected) {
            try {
                const filteredProducts = await getFilteredProducts({ prescription: false, limit: 30 });
                setProducts(filteredProducts);
                clearProducts();
                setProductsStore(summarize(filteredProducts));
            } catch (error) {
                console.error("Error al resetear productos:", error);
            }
            return;
        }
   
        try {
            const filtersQuery = buildFiltersQuery(newFilters);
            console.log("Filtros aplicados:", filtersQuery);
            if (Object.keys(filtersQuery).length === 0) {
                return;
            }
            const filteredProducts = await getFilteredProducts(filtersQuery);
            setProducts(filteredProducts);
    
            clearProducts();
            setProductsStore(summarize(filteredProducts));

        } catch (error) {
            console.error("Error al aplicar filtros:", error);
        }
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
