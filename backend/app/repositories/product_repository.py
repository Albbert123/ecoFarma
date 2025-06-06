from datetime import datetime
from bson import ObjectId
from pymongo import ReturnDocument
from app.models.product_model import Product, Reminder
from typing import List, Optional

from app.constants.product_constants import (
    HISTORIAL_DB,
    PRODUCTO_DB,
    RATING_DB,
    REMINDER_DB
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

    def save_reminder(self, reminder: Reminder):
        reminder_dict = reminder.dict()
        # Eliminar campo 'id' si viene del frontend o del modelo
        reminder_dict.pop("id", None)
        # Insertar en MongoDB (esto genera automáticamente un _id)
        result = REMINDER_DB.insert_one(reminder_dict)
        # Devolver el mismo recordatorio, pero con el _id de MongoDB
        reminder_dict["_id"] = str(result.inserted_id)
        return reminder_dict

    def get_reminders_by_user(self, user: str) -> List[dict]:
        reminders = REMINDER_DB.find({"user": user})
        result = []
        for reminder in reminders:
            reminder["id"] = str(reminder.pop("_id"))
            result.append(Reminder(**reminder))
        return result

    def delete_reminder(self, reminder_id: str):
        # Convertir el ID de cadena a ObjectId
        reminder_id = ObjectId(reminder_id)
        # Eliminar el recordatorio de la base de datos
        result = REMINDER_DB.delete_one({"_id": reminder_id})
        if result.deleted_count == 0:
            raise ValueError("Recordatorio no encontrado")
        return result.deleted_count

    def get_pending_reminders(self, now: datetime):
        return list(REMINDER_DB.find({
            "sent": False,
            "date": {"$lte": now}
        }))

    def mark_reminder_as_sent(self, reminder_id: str) -> dict:
        updated_reminder = REMINDER_DB.find_one_and_update(
            {"_id": ObjectId(reminder_id)},
            {"$set": {"sent": True}},
            return_document=ReturnDocument.AFTER
        )
        if not updated_reminder:
            raise ValueError("Recordatorio no encontrado")
        updated_reminder["id"] = str(updated_reminder.pop("_id"))
        return updated_reminder
