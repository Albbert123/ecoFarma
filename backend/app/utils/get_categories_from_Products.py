import json
from app.config.database import db

products_collection = db["Producto"]

# Archivo de salida
output_file = "categories_count.json"


def extract_categories():
    try:

        # Pipeline de agregación para contar las categorías
        pipeline = [
            {"$group": {"_id": "$category", "count": {"$sum": 1}}},
            {"$sort": {"count": -1}}  # Ordenar de mayor a menor
        ]

        # Ejecutar la consulta
        results = list(products_collection.aggregate(pipeline))

        # Formatear los resultados
        categories_count = [
            {"category": result["_id"], "count": result["count"]}
            for result in results
        ]

        # Guardar los resultados en un archivo JSON
        with open(output_file, "w", encoding="utf-8") as outfile:
            json.dump(categories_count, outfile, ensure_ascii=False, indent=4)

        print(f"✅ Categorías extraídas y guardadas en '{output_file}'")
    except Exception as e:
        print(f"❌ Error al procesar las categorías: {e}")


if __name__ == "__main__":
    extract_categories()
