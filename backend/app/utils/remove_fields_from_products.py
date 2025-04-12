from app.config.database import db

# Colección de productos
products_collection = db["Producto"]


def remove_fields():
    print("🧹 Eliminando campos innecesarios de los productos...")

    result = products_collection.update_many(
        {},  # Aplica a todos los documentos
        {
            "$unset": {
                "composition": "",
            }
        }
    )

    print(f"✅ Documentos modificados: {result.modified_count}")


if __name__ == "__main__":
    remove_fields()
