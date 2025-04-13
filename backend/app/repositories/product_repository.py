from pymongo import ReturnDocument
from app.config.database import db
from app.models.product_model import Product
from typing import List, Optional


class ProductRepository:
    def get_product_by_nregistro(self, nregistro: str) -> Optional[dict]:
        return db["Producto"].find_one({"nregistro": nregistro})

    def get_products(self, limit: int = 30):
        return list(db["Producto"].find({}, {"_id": 0}).limit(limit))

    def get_products_by_advanced_query(self, filters: dict, limit: int = 25):
        return list(db["Producto"].find(filters, {"_id": 0}).limit(limit))

    def create_product(self, product_data: Product):
        db["Producto"].insert_one(product_data.dict())
        return product_data.dict()

    def delete_product(self, nregistro: str):
        return db["Producto"].delete_one({"nregistro": nregistro})

    def update_product(self, nregistro: str, product_data: dict):
        updated_product = db["Producto"].find_one_and_update(
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
                    # "_id": 0,
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
        return list(db["Producto"].aggregate(pipeline))

    def get_all_nregistros(self):
        return list(db["Producto"].distinct("nregistro"))
