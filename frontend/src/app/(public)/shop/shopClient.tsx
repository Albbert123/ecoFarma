'use client';

import { useState, useEffect } from 'react';
import ShopForm from '@/components/public/shop/ShopForm';
import { useBootstrap } from '@/hooks/useBootstrap';
import { LABORATORIES, CATEGORIES } from '@/constants/constants';
import { Filters, Product } from '@/types/productTypes';
import { getFilteredProducts, getRecommendations, getSearchResults, setSearchData } from '@/services/productService';
import { useProductStore } from "@/stores/productStore";
import { useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { useCartStore } from "@/stores/cartStore";
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { CartItem } from '@/types/orderTypes';

export default function ShopClient() {
    useBootstrap();

    const [products, setProducts] = useState<Product[]>([]);
    const [recommendations, setRecommendations] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [hasSearched, setHasSearched] = useState(false);
    const { productsStore, searchQueryStore, sortOption, recommendationsStore, setSortOption, setProductsStore, setSearchBaseProducts, setSearchQuery, clearProducts, clearSearchQuery, setRecommendationsStore, clearRecommendationsStore } = useProductStore();
    const { userCorreo, isAuthenticated } = useAuthStore();
    // const { addToCart } = useCartStore();
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('search') || '';
    const storedSearchQuery = useProductStore((state) => state.searchQueryStore.searchTerm) || searchQuery;
    const router = useRouter();

    const handleAddToCart = (product: CartItem) => {
        // addToCart(product);
        useCartStore.getState().addToCart(product)
        toast.success('Producto añadido al carrito');
    };

    // Función para obtener productos predeterminados
    const fetchProducts = async () => {
        try {
            const filteredProducts = await getFilteredProducts({prescription: false, limit: 30});
            setProducts(filteredProducts);
            handleSortChange('sin-prescripcion', filteredProducts);
            clearProducts();
            clearSearchQuery();
        } catch (error) {
            toast.error('Error al obtener los productos');
        } finally {
            setLoading(false);
        }
    };

    const handleRecommendations = async () => {
        try {
            if (!userCorreo) return;
            const recommendationsData = await getRecommendations(userCorreo);
            setRecommendations(recommendationsData);
            clearRecommendationsStore();
            setRecommendationsStore(recommendationsData);
        } catch (error) {
            toast.error('Error al obtener recomendaciones');
        }
    };

    const handleSearch = async (searchTerm: string) => {
        try {
            if (!hasSearched) {
                setHasSearched(true); // Marca que la búsqueda ya se realizó
                router.replace(`/shop?search=${encodeURIComponent(searchTerm)}`);
                const { products, embedding } = await getSearchResults(searchTerm);
                setProducts(products);
                handleSortChange("sin-prescripcion", products);
    
                if (userCorreo && isAuthenticated && searchTerm !== '') {
                    setSearchData({
                        searchTerm: searchTerm,
                        date: new Date(),
                        user: userCorreo,
                        embedding: embedding ?? null
                    });
                }
    
                clearProducts();
                setProductsStore(products);
                setSearchBaseProducts(products);
                handleSortChange(sortOption, products);
                setSearchQuery({
                    searchTerm: searchTerm,
                    date: new Date(),
                    user: userCorreo ?? null,
                    embedding: embedding ?? null
                });
                clearSearchQuery();
            }
        } catch (error) {
            toast.error("Error al buscar productos");
        } finally {
            setLoading(false);
            setHasSearched(false); // Restablece el estado para permitir futuras búsquedas
        }
    };

    // Lógica para decidir qué función llamar
    useEffect(() => {
        setLoading(true);
        if (searchQuery) {
            handleSearch(searchQuery); // Si hay una búsqueda, llama a handleSearch
        } else if (productsStore.length > 0 && searchQueryStore.searchTerm !== '') {
            // Restaurar del store
            setProducts(productsStore);
            handleSortChange(sortOption, productsStore);
            setLoading(false);
            clearSearchQuery();
        } else {
            fetchProducts(); // Si no hay búsqueda, llama a fetchProducts
        }
    }, [searchQuery]);

    useEffect(() => {
        if (!isAuthenticated) return;
    
        if (searchQueryStore.searchTerm !== null) {
            // Ha habido una búsqueda → actualizamos recomendaciones
            handleRecommendations();
        } else if (recommendationsStore.length > 0) {
            // No ha habido búsqueda pero sí hay recomendaciones guardadas → usamos el store
            setRecommendations(recommendationsStore);
        } else {
            // No hay nada → pedimos recomendaciones
            handleRecommendations();
        }
    }, [isAuthenticated, searchQueryStore.searchTerm]);

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
        const { productsStore } = useProductStore.getState();

        const noFiltersSelected =
        (!newFilters.laboratory || newFilters.laboratory.length === 0) &&
        (!newFilters.category || newFilters.category.length === 0) &&
        (!newFilters.prescription || newFilters.prescription.length === 0) &&
        (!newFilters.priceRange || newFilters.priceRange.length === 0);

        if (noFiltersSelected) {
            try {
              const { searchBaseProducts } = useProductStore.getState();
          
              if (searchBaseProducts.length > 0) {
                // Volver a productos originales de la búsqueda
                setProducts(searchBaseProducts);
                handleSortChange("sin-prescripcion", searchBaseProducts);
                setProductsStore(searchBaseProducts); // <- vuelve a sincronizar la store de trabajo
              } else {
                await fetchProducts(); // no hay búsqueda activa, cargar por defecto
              }
            } catch (error) {
              toast.error("Error al resetear productos");
            }
            return;
        }
   
        try {
            const filtersQuery = buildFiltersQuery(newFilters);
            if (Object.keys(filtersQuery).length === 0) return;

            // si hay productos en el store, aplica filtros localmente
            const filteredProducts = await getFilteredProducts(
                filtersQuery,
                productsStore.length > 0 ? productsStore : undefined
            );

            setProducts(filteredProducts);
            handleSortChange('sin-prescripcion', filteredProducts);
    
            clearProducts();
            setProductsStore(filteredProducts);

        } catch (error) {
            toast.error("Error al aplicar filtros");
        }
    };

    const handleSortChange = (sortOption: string, productsToSort = products) => {
        let sortedProducts = [...productsToSort];
        
        switch(sortOption) {
          case 'sin-prescripcion':
            sortedProducts.sort((a, b) => (a.prescription === b.prescription) ? 0 : a.prescription ? 1 : -1);
            break;
          case 'con-prescripcion':
            sortedProducts.sort((a, b) => (a.prescription === b.prescription) ? 0 : a.prescription ? -1 : 1);
            break;
          case 'mas-baratos':
            sortedProducts.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
            break;
          case 'mas-caros':
            sortedProducts.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
            break;
          case 'a-z':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
          case 'z-a':
            sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
          default:
            // No hacer nada o resetear al orden original
            return;
        }
      
        setProducts(sortedProducts);
        setSortOption(sortOption);
      };
    

    return (
        <ShopForm 
            products={products}
            recommendations={recommendations}
            laboratories={LABORATORIES}
            categories={CATEGORIES}
            onAddToCart={handleAddToCart}
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
            initialSearchTerm={storedSearchQuery}
            isLoading={loading}
        />
    );
}
