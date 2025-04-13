from fastapi import HTTPException
from app.repositories.product_repository import ProductRepository
from app.models.product_model import Product
from typing import List
from app.constants.product_constants import LAB_MAPPING, CATEGORIES_MAPPING
from app.services.AI_service import generate_embedding  # o como se llame


class ProductService:
    def __init__(self):
        self.product_repo = ProductRepository()

    def get_product_by_nregistro(self, nregistro: str):
        product = self.product_repo.get_product_by_nregistro(nregistro)
        if not product:
            raise HTTPException(
                status_code=404, detail="Producto no encontrado"
            )
        return product

    def get_products(self, limit: int = 25):
        return self.product_repo.get_products(limit)

    def get_products_by_filters(self, filters: dict, limit: int = 30):
        query = {}

        # Mapear laboratorios
        if filters.get("laboratory"):
            mapped_labs = [
                LAB_MAPPING.get(lab)
                for lab in filters["laboratory"]
                if LAB_MAPPING.get(lab)
            ]
            if mapped_labs:
                query["laboratory"] = {"$in": mapped_labs}

        # Mapear categorías simplificadas (front) a categorías reales (backend)
        if filters.get("category"):
            mapped_categories = []
            for cat in filters["category"]:
                mapped = CATEGORIES_MAPPING.get(cat)
                if mapped:
                    mapped_categories.extend(mapped)

            if mapped_categories:
                query["category"] = {"$in": mapped_categories}

        # Filtrar por prescripción
        if filters.get("prescription") is not None:
            query["prescription"] = filters["prescription"]

        # Filtrar por precio
        price_filter = {}
        if filters.get("min_price") is not None:
            price_filter["$gte"] = filters["min_price"]
        if filters.get("max_price") is not None:
            price_filter["$lte"] = filters["max_price"]
        if price_filter:
            query["price"] = price_filter

        return self.product_repo.get_products_by_advanced_query(query, limit)

    def create_product(self, product: Product):
        existing = self.product_repo.get_product_by_nregistro(
            product.nregistro
        )
        if existing:
            raise HTTPException(
                status_code=400, detail="El producto ya existe"
            )

        return self.product_repo.create_product(product)

    def delete_product(self, nregistro: str):
        result = self.product_repo.delete_product(nregistro)
        if result.deleted_count == 0:
            raise HTTPException(
                status_code=404, detail="Producto no encontrado"
            )
        return {"message": "Producto eliminado correctamente"}

    def update_product(self, nregistro: str, product_data: dict):
        updated = self.product_repo.update_product(nregistro, product_data)
        return updated

    def semantic_search(self, query: str, limit: int = 30) -> List[dict]:
        embedding = generate_embedding(query)
        return self.product_repo.search_by_vector(embedding, limit)

    def get_all_nregistros(self) -> List[str]:
        return self.product_repo.get_all_nregistros()
