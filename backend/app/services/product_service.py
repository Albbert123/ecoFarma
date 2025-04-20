from fastapi import HTTPException
from app.repositories.product_repository import ProductRepository
from app.models.product_model import Product, SearchData
from typing import List
from app.constants.product_constants import LAB_MAPPING, CATEGORIES_MAPPING
from app.services.AI_service import generate_embedding_modelProduct


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

        # Mapear categorías
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

    def get_search_history_by_user_and_date(self, user: str, date: str):
        return self.product_repo.get_search_history_by_user_and_date(
            user, date
        )

    def get_search_history_by_user(self, user: str) -> List[dict]:
        return self.product_repo.get_search_history_by_user(user)

    def delete_search_history_entry(self, user: str, date: str):
        self.product_repo.delete_search_history_entry_by_user_and_date(
            user, date
        )

    def save_search_data(self, search_data: SearchData):
        # Convertir el modelo Pydantic a un diccionario
        search_data_dict = search_data.dict()

        # Obtener el historial de búsqueda del usuario
        user = search_data_dict["user"]
        user_search_history = self.get_search_history_by_user(user)

        # Si el historial tiene más de 10 registros, eliminar el más antiguo
        if len(user_search_history) >= 10:
            oldest_entry = user_search_history[0]  # El primer mas antiguo
            self.delete_search_history_entry(
                oldest_entry["user"], oldest_entry["date"]
            )

        # Guardar en la colección
        self.product_repo.save_search_data(search_data_dict)
        return search_data_dict

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

    def semantic_search(self, query: str, limit: int = 30) -> dict:
        embedding = generate_embedding_modelProduct(query)
        products = self.product_repo.search_by_vector(embedding, limit)
        # Suponiendo que tienes los resultados ordenados
        productos_filtrados = [
            p for p in products
            if p["name"] not in ["LINITUL CICATRIZANTE POMADA", "LINITUL CICATRIZANTE APOSITO IMPREGNADO", "ICTIOMEN POLVO"]
        ]

        return {
            "products": productos_filtrados,
            "embedding": embedding
        }

    def get_all_nregistros(self) -> List[str]:
        return self.product_repo.get_all_nregistros()
