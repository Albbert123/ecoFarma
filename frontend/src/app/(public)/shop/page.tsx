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

                // const summarized = filteredProducts.map((p) => ({
                //     nregistro: p.nregistro,
                //     name: p.name,
                //     price: p.price ?? 0,
                //     stock: p.stock ?? 0,
                //     image: p.image ?? '',
                //     principleAct: p.principleAct ?? '',
                //     laboratory: p.laboratory ?? '',
                //     category: p.category ?? '',
                //     prescription: p.prescription ?? false,
                // }));
                console.log('Productos filtrados:', filteredProducts);
                // console.log('Productos resumidos:', summarized);
                clearProducts();
                // setProductsStore(summarized);
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

    const handleFilterChange = async (newFilters: Filters) => {
        console.log('Filtros actualizados:', newFilters);
    
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
            }
            else if (pres === "false") {
                filtersQuery.prescription = false;
            }
        }
    
        // Price range
        if (newFilters.priceRange?.length) {
            newFilters.priceRange.forEach((rangeStr) => {
                if (rangeStr.includes("Menos de")) {
                    filtersQuery.max_price = 10;
                } else if (rangeStr.includes("Más de")) {
                    filtersQuery.min_price = 40;
                } else {
                    // Rango como "€10 a €20"
                    const cleaned = rangeStr.replace(/[€ ]/g, "").split("a");
                    if (cleaned.length === 2) {
                        filtersQuery.min_price = cleaned[0];
                        filtersQuery.max_price = cleaned[1];
                    }
                }
            });
        }
    
        try {
            console.log("Filtros aplicados:", filtersQuery);
            if (Object.keys(filtersQuery).length === 0) {
                return;
            }
            const filteredProducts = await getFilteredProducts(filtersQuery);
            setProducts(filteredProducts);
    
            const summarized = filteredProducts.map((p) => ({
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
    
            clearProducts();
            setProductsStore(summarized);
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
