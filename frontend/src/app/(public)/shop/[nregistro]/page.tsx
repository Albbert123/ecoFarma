"use client";

import { useEffect, useState } from "react";
import { useProductStore } from "@/stores/productStore";
import { getProduct, getSimilarProducts } from "@/services/productService";
import { notFound } from "next/navigation";
import { Product } from "@/types/productTypes";
import ProductDetail from "@/components/public/shop/ProductDetail";
import { use } from "react";
import { useBootstrap } from "@/hooks/useBootstrap";


export default function ProductPage({ params }: { params: Promise<{ nregistro: string }> }) {
  const { nregistro } = use(params);
  useBootstrap();
  const { productsStore, addProduct } = useProductStore();
  const [product, setProduct] = useState<Product | null>(() =>
    productsStore.find((p) => p.nregistro === nregistro) || null
  );
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!product) {
      getProduct(nregistro)
        .then((data) => {
          setProduct(data);
          // addProduct(data); // lo guardas también en el store
        })
        .catch(() => {
          notFound();
        });
    }
  }, [nregistro, product]);

  useEffect(() => {
    if (product) {
        getSimilarProducts(product.nregistro)
            .then((data) => {
                setSimilarProducts(data);
            })
            .catch((error) => {
                console.error("Error cargando productos similares", error);
            });
    }
  }, [product]);

  if (!product) {
    return <p className="text-center mt-10"></p>;
  }

  const handleAddToCart = (product: Product) => {
    console.log('Producto agregado:', product);
  };

  return (
    <div>
        <ProductDetail product={product} onAddToCart={handleAddToCart} similarProducts={similarProducts} />
    </div>
  );
}
