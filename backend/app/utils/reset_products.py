from app.config.database import db

products_collection = db["Producto"]


def reset_products():
    result = products_collection.delete_many({})
    print(
        f"🗑️ Eliminados {result.deleted_count} productos de la colección "
        f"'productos'."
    )


if __name__ == "__main__":
    reset_products()
