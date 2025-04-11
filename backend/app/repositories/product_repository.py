from pymongo import ReturnDocument
from app.config.database import db
from app.models.product_model import Product
from typing import Optional


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

    def search_products_by_name(self, name: str):
        return list(
            db["Producto"].find(
                {"name": {"$regex": name, "$options": "i"}},
                {"_id": 0}
            )
        )

    def get_all_nregistros(self):
        return list(db["Producto"].distinct("nregistro"))
