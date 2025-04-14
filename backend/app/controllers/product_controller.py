from typing import Any, List, Optional
from fastapi import APIRouter, HTTPException, Depends, Body, Query
from app.models.product_model import Product, SearchData
from app.services.product_service import ProductService

router = APIRouter()


@router.get("/", response_model=List[Product])
async def get_all_products(product_service: ProductService = Depends()):
    return product_service.get_products(200)


@router.get("/semantic-search", response_model=Any)
async def semantic_search(
    query: str = Query(..., description="Texto de búsqueda"),
    limit: int = 30,
    product_service: ProductService = Depends()
):
    result = product_service.semantic_search(query, limit)
    if not result["products"]:
        raise HTTPException(
            status_code=404, detail="No se encontraron productos"
        )
    return result


@router.get("/filter", response_model=List[Product])
async def filter_products(
    prescription: Optional[bool] = Query(None),
    laboratory: Optional[List[str]] = Query(None),
    category: Optional[List[str]] = Query(None),
    min_price: Optional[float] = Query(None),
    max_price: Optional[float] = Query(None),
    limit: int = Query(30),
    product_service: ProductService = Depends()
):
    filters = {
        "prescription": prescription,
        "laboratory": laboratory,
        "category": category,
        "min_price": min_price,
        "max_price": max_price,
    }
    return product_service.get_products_by_filters(filters, limit)


@router.post("/search-data", response_model=SearchData)
async def search_data(
    search_data: SearchData,
    product_service: ProductService = Depends()
):
    # Verificar si ya existe un registro con el mismo usuario y fecha
    existing_entry = product_service.get_search_history_by_user_and_date(
        user=search_data.user,
        date=search_data.date
    )
    if existing_entry:
        raise HTTPException(
            status_code=400,
            detail="Ya existe un registro para este usuario en esta fecha"
        )

    # Si no existe, llama al servicio para guardar el registro
    return product_service.save_search_data(search_data)


@router.post("/", response_model=Product)
async def create_product(
    product: Product, product_service: ProductService = Depends()
):
    created_product = product_service.create_product(product)
    return created_product


@router.get("/search-history/{userCorreo}", response_model=List[SearchData])
async def get_search_history(
    userCorreo: str,
    product_service: ProductService = Depends()
):
    print(userCorreo)
    search_history = product_service.get_search_history_by_user(userCorreo)
    if not search_history:
        raise HTTPException(
            status_code=404,
            detail="No se encontró el historial de búsqueda para este usuario"
        )
    return search_history


@router.get("/{nregistro}", response_model=Product)
async def get_product(
    nregistro: str, product_service: ProductService = Depends()
):
    product = product_service.get_product_by_nregistro(nregistro)
    if not product:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return product


@router.put("/{nregistro}", response_model=Product)
async def update_product(
    nregistro: str,
    updated_fields: dict = Body(...),
    product_service: ProductService = Depends()
):
    updated_product = product_service.update_product(
        nregistro, updated_fields
    )
    if not updated_product:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return updated_product


@router.delete("/{nregistro}")
async def delete_product(
    nregistro: str, product_service: ProductService = Depends()
):
    deleted = product_service.delete_product(nregistro)
    if not deleted:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return {"message": "Producto eliminado correctamente"}
