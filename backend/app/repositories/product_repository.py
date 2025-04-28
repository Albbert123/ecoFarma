from datetime import datetime
from pymongo import ReturnDocument
from app.models.product_model import Product
from typing import List, Optional

from app.constants.product_constants import (
    HISTORIAL_DB,
    PRODUCTO_DB,
    RATING_DB
)


class ProductRepository:
    def get_product_by_nregistro(self, nregistro: str) -> Optional[dict]:
        return PRODUCTO_DB.find_one({"nregistro": nregistro})

    def get_products(self, limit: int = 30):
        return list(PRODUCTO_DB.find({}, {"_id": 0}).limit(limit))

    def get_products_by_advanced_query(self, filters: dict, limit: int = 25):
        return list(PRODUCTO_DB.find(filters, {"_id": 0}).limit(limit))

    def get_search_history_by_user_and_date(
        self, user: str, date: str
    ) -> Optional[dict]:
        return HISTORIAL_DB.find_one({"user": user, "date": date})

    def get_recent_searches_by_user(
        self, user: str, since: datetime
    ) -> List[dict]:
        cursor = HISTORIAL_DB.find({
            "user": user,
            "date": {"$gte": since}
        })
        return list(cursor)

    def save_search_data(self, search_data: dict):
        HISTORIAL_DB.insert_one(search_data)

    # Obtener el historial de búsqueda de un usuario
    def get_search_history_by_user(self, user: str) -> List[dict]:
        return list(
            HISTORIAL_DB
            .find({"user": user})
            .sort("date", 1)  # Ordenar por fecha ascendente (la más antigua p)
        )

    def save_rating(self, rating: dict):
        # Guardar la calificación en la base de datos
        RATING_DB.insert_one(rating)

    def get_ratings(self) -> List[dict]:
        # Obtener todas las calificaciones
        return list(RATING_DB.find({}, {"_id": 0}))

    # Eliminar una entrada del historial de búsqueda por usuario y fecha
    def delete_search_history_entry_by_user_and_date(
        self, user: str, date: str
    ):
        HISTORIAL_DB.delete_one({"user": user, "date": date})

    def create_product(self, product_data: Product):
        PRODUCTO_DB.insert_one(product_data.dict())
        return product_data.dict()

    def delete_product(self, nregistro: str):
        return PRODUCTO_DB.delete_one({"nregistro": nregistro})

    def update_product(self, nregistro: str, product_data: dict):
        updated_product = PRODUCTO_DB.find_one_and_update(
            {"nregistro": nregistro},
            {"$set": product_data},
            return_document=ReturnDocument.AFTER
        )

        if not updated_product:
            raise ValueError("Producto no encontrado")

        return updated_product

    def search_by_vector(self, embedding: List[float], limit: int = 30):
        pipeline = [
            {
                "$vectorSearch": {
                    "queryVector": embedding,
                    "path": "embedding",
                    "numCandidates": 300,
                    "limit": limit,
                    "index": "vector_index"
                }
            },
            {
                "$project": {
                    "_id": 0,
                    "nregistro": 1,
                    "name": 1,
                    "principleAct": 1,
                    "description": 1,
                    "price": 1,
                    "image": 1,
                    "laboratory": 1,
                    "category": 1,
                    "stock": 1,
                    "dosis": 1,
                    "prescription": 1,
                    "composition": 1,
                    "AdditionalInfo": 1,
                    "score": {"$meta": "vectorSearchScore"}
                }
            }
        ]
        return list(PRODUCTO_DB.aggregate(pipeline))

    def get_all_nregistros(self):
        return list(PRODUCTO_DB.distinct("nregistro"))
