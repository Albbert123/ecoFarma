"use client";

import ManageProductsForm from "@/components/dashboard/admin/ManageProductsForm";
import withAuth from "@/components/withAuth";
import { useBootstrap } from "@/hooks/useBootstrap";
import { addProductAdmin, deleteProductAdmin, getProduct, updateProductAdmin } from "@/services/productService";
import { Product } from "@/types/productTypes";
import { useState } from "react";
import toast from "react-hot-toast";

function ManageProductsPage() {
  useBootstrap();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleAddProduct = async (product: Product) => {
    try {
      const response = await addProductAdmin({
        ...product,
        fromAdmin: true
      });
      toast.success("Producto agregado correctamente");
      return response;
    } catch (error) {
      toast.error("Error al agregar el producto");
      throw error;
    }
  };

  const handleUpdateProduct = async (product: Product) => {
    try {
      const response = await updateProductAdmin(product.nregistro, product);
      toast.success("Producto actualizado correctamente");
      return response;
    } catch (error) {
      toast.error("Error al actualizar el producto");
      throw error;
    }
  };

  const handleDeleteProduct = async (nregistro: string) => {
    try {
      const response = await deleteProductAdmin(nregistro);
      toast.success("Producto eliminado correctamente");
      return response;
    } catch (error) {
      toast.error("Error al eliminar el producto");
      throw error;
    }
  };

  const handleSearchProduct = async (nregistro: string) => {
    try {
      const foundProduct = await getProduct(nregistro);
  
      if (!foundProduct.fromAdmin) {
        toast.error("Este producto no puede ser editado porque no fue creado por un administrador");
        setSelectedProduct(null); // Limpiar el producto seleccionado
        return;
      }
  
      setSelectedProduct(foundProduct);
    } catch (error) {
      toast.error("Producto no encontrado");
      setSelectedProduct(null);
    }
  };

  return (
    <ManageProductsForm 
      onAdd={handleAddProduct} 
      onUpdate={handleUpdateProduct} 
      onDelete={handleDeleteProduct}
      onSearch={handleSearchProduct}
      selectedProduct={selectedProduct}
    />
  );
}

export default withAuth(ManageProductsPage, ["admin"]);