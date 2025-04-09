from fastapi import HTTPException
from app.repositories.product_repository import ProductRepository
from app.models.product_model import Product
from typing import List


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

    def get_products_by_filters(self, filters: dict, limit: int = 25):
        return self.product_repo.get_products_by_advanced_query(filters, limit)

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

    def search_products_by_name(self, name: str):
        return self.product_repo.search_products_by_name(name)

    def get_all_nregistros(self) -> List[str]:
        return self.product_repo.get_all_nregistros()
