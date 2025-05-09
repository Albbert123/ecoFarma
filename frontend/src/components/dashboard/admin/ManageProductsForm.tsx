"use client";

import { Product } from "@/types/productTypes";
import React, { useState } from "react";

interface ManageProductsFormProps {
  onAdd: (product: Product) => Promise<void>;
  onUpdate: (product: Product) => Promise<void>;
  onDelete: (nregistro: string) => Promise<void>;
  onSearch: (nregistro: string) => Promise<void>;
  selectedProduct: Product | null;
}

const ManageProductsForm: React.FC<ManageProductsFormProps> = ({ onAdd, onUpdate, onDelete, onSearch, selectedProduct }) => {
  const [activeTab, setActiveTab] = useState<"add" | "edit">("add");
  const [product, setProduct] = useState<Partial<Product>>({});
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchId, setSearchId] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value === "" ? null : Number(value)
    }));
  };

  const handleSubmitAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    await onAdd(product as Product);
    setProduct({});
  };

  const handleSubmitUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      await onUpdate({
        ...editingProduct,
        name: product.name || editingProduct.name,
        price: product.price !== undefined ? product.price : editingProduct.price,
        description: product.description || editingProduct.description
      });
      setEditingProduct(null);
      setProduct({});
      setSearchId("");
    }
  };

  const handleSearchProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    try {
      await onSearch(searchId);
      setEditingProduct(selectedProduct);
    } finally {
      setIsSearching(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (editingProduct?.nregistro && window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      await onDelete(editingProduct.nregistro);
      setEditingProduct(null);
      setProduct({});
      setSearchId("");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === "add" ? "active bg-white text-primary" : "text-white"}`}
                onClick={() => {
                  setActiveTab("add");
                  setEditingProduct(null);
                  setSearchId("");
                }}
              >
                <i className="bi bi-plus-circle me-2"></i>Añadir Producto
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === "edit" ? "active bg-white text-primary" : "text-white"}`}
                onClick={() => setActiveTab("edit")}
              >
                <i className="bi bi-pencil-square me-2"></i>Editar Producto
              </button>
            </li>
          </ul>
        </div>

        <div className="card-body p-4">
          {activeTab === "add" ? (
            <form onSubmit={handleSubmitAdd}>
              <h4 className="mb-4 text-primary">
                <i className="bi bi-plus-circle me-2"></i>Añadir nuevo producto
              </h4>
              
              <div className="row mb-3">
                <div className="col-md-6 mb-3">
                  <label htmlFor="name" className="form-label fw-bold">Nombre *</label>
                  <input
                    type="text"
                    className="form-control border-primary"
                    id="name"
                    name="name"
                    value={product.name || ""}
                    onChange={handleInputChange}
                    placeholder="Ingresa el nombre"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="price" className="form-label fw-bold">Precio *</label>
                  <div className="input-group">
                    <span className="input-group-text">$</span>
                    <input
                      type="number"
                      className="form-control border-primary"
                      id="price"
                      name="price"
                      value={product.price !== undefined && product.price !== null ? product.price : ""}
                      onChange={handleNumberInputChange}
                      placeholder="0.00"
                      required
                      step="0.01"
                      min="0"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="nregistro" className="form-label fw-bold">Identificador *</label>
                <input
                  type="text"
                  className="form-control border-primary"
                  id="nregistro"
                  name="nregistro"
                  value={product.nregistro || ""}
                  onChange={handleInputChange}
                  placeholder="Ingresa el identificador"
                  required
                  pattern="\d{5}"
                  title="Debe ser un número de 5 dígitos"
                />
                <div className="form-text text-muted">Ha de ser un número de 5 dígitos.</div>
              </div>

              <div className="mb-3">
                <label htmlFor="principleAct" className="form-label fw-bold">Principios activos *</label>
                <input
                  type="text"
                  className="form-control border-primary"
                  id="principleAct"
                  name="principleAct"
                  value={product.principleAct || ""}
                  onChange={handleInputChange}
                  placeholder="Ingresa los principios activos del producto"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label fw-bold">Descripción *</label>
                <textarea
                  className="form-control border-primary"
                  id="description"
                  name="description"
                  value={product.description || ""}
                  onChange={handleInputChange}
                  placeholder="Describe el producto"
                  required
                  rows={3}
                />
              </div>

              <div className="row mb-4">
                <div className="col-md-6 mb-3">
                  <label htmlFor="laboratory" className="form-label fw-bold">Laboratorio</label>
                  <input
                    type="text"
                    className="form-control border-primary"
                    id="laboratory"
                    name="laboratory"
                    value={product.laboratory || ""}
                    onChange={handleInputChange}
                    placeholder="Ingresa el laboratorio"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="category" className="form-label fw-bold">Categoría</label>
                  <input
                    type="text"
                    className="form-control border-primary"
                    id="category"
                    name="category"
                    value={product.category || ""}
                    onChange={handleInputChange}
                    placeholder="Ingresa la categoría"
                  />
                </div>
              </div>

              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary btn-lg">
                  <i className="bi bi-check-circle me-2"></i>Confirmar
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSubmitUpdate}>
              <h4 className="mb-4 text-primary">
                <i className="bi bi-pencil-square me-2"></i>Editar producto
              </h4>
              
              {!editingProduct ? (
                <div className="mb-4">
                  <label htmlFor="searchId" className="form-label fw-bold">Buscar producto por ID *</label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control border-primary"
                      id="searchId"
                      value={searchId}
                      onChange={(e) => setSearchId(e.target.value)}
                      placeholder="Ingresa el identificador del producto (5 dígitos)"
                      required
                      pattern="\d{5}"
                    />
                    <button 
                      className="btn btn-primary" 
                      type="button"
                      onClick={handleSearchProduct}
                      disabled={isSearching || !searchId.match(/^\d{5}$/)}
                    >
                      {isSearching ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Buscando...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-search me-2"></i>Buscar
                        </>
                      )}
                    </button>
                  </div>
                  <div className="form-text text-muted">Ingresa el ID de 5 dígitos del producto que deseas editar.</div>
                </div>
              ) : (
                <>
                  <div className="alert alert-info d-flex justify-content-between align-items-center">
                    <span>
                      <i className="bi bi-info-circle me-2"></i>
                      Editando producto: <strong>{editingProduct.name}</strong> (ID: {editingProduct.nregistro})
                    </span>
                    <button 
                      type="button" 
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => {
                        setEditingProduct(null);
                        setProduct({});
                        setSearchId("");
                      }}
                    >
                      <i className="bi bi-x-lg"></i> Cancelar
                    </button>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="editName" className="form-label fw-bold">Nombre *</label>
                      <input
                        type="text"
                        className="form-control border-primary"
                        id="editName"
                        name="name"
                        value={product.name || editingProduct.name || ""}
                        onChange={handleInputChange}
                        placeholder="Ingresa el nombre"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="editPrice" className="form-label fw-bold">Precio *</label>
                      <div className="input-group">
                        <span className="input-group-text">$</span>
                        <input
                          type="number"
                          className="form-control border-primary"
                          id="editPrice"
                          name="price"
                          value={product.price !== undefined && product.price !== null ? product.price : editingProduct.price || ""}
                          onChange={handleNumberInputChange}
                          placeholder="0.00"
                          required
                          step="0.01"
                          min="0"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="editDescription" className="form-label fw-bold">Descripción *</label>
                    <textarea
                      className="form-control border-primary"
                      id="editDescription"
                      name="description"
                      value={product.description || editingProduct.description || ""}
                      onChange={handleInputChange}
                      placeholder="Describe el producto"
                      required
                      rows={3}
                    />
                  </div>

                  <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                    <button 
                      type="button" 
                      className="btn btn-danger me-md-2"
                      onClick={handleDeleteProduct}
                    >
                      <i className="bi bi-trash me-2"></i>Eliminar
                    </button>
                    <button type="submit" className="btn btn-primary">
                      <i className="bi bi-save me-2"></i>Guardar cambios
                    </button>
                  </div>
                </>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageProductsForm;