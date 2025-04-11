import json
import time
from app.config.database import db
from app.services.cima_service import get_product_by_nregistro

# MongoDB connection
products_collection = db["Producto"]

# Ruta al JSON de medicamentos filtrados
RUTA_JSON_FILTRADOS = "nreg_medicamentos_filtrados.json"


def preload_filtered_products(filepath=RUTA_JSON_FILTRADOS):
    print("📥 Cargando medicamentos filtrados desde JSON...")
    with open(filepath, "r", encoding="utf-8") as file:
        filtrados = json.load(file)

    print(f"✅ Se encontraron {len(filtrados)} medicamentos filtrados.")

    for item in filtrados:
        nregistro = item.get("nregistro")
        if not nregistro:
            continue

        try:
            detalle = get_product_by_nregistro(nregistro)
        except Exception as e:
            print(f"❌ Error al obtener {nregistro}: {e}")
            continue

        producto = {
            "nregistro": detalle.get("nregistro"),
            "name": detalle.get("nombre"),
            "description": None,
            "price": None,
            "image": (
                detalle.get("fotos")[0]["url"]
                if detalle.get("fotos")
                else None
            ),
            "laboratory": detalle.get("labtitular"),
            "category": (
                detalle.get("atcs")[0]["nombre"]
                if detalle.get("atcs")
                else None
            ),
            "stock": None,
            "principleAct": ", ".join(
                [pa["nombre"] for pa in detalle.get("principiosActivos", [])]
            ) if detalle.get("principiosActivos") else None,
            "dosis": detalle.get("dosis"),
            "prescription": detalle.get("receta"),
            "commercialization": detalle.get("comerc"),
            "authorization": None,
            "estupecafiente": detalle.get("triangulo", None),
            "psicotropico": None,
            "advertencias": None,
            "contraindications": None,
            "comoTomar": None,
            "reacciones": None,
            "posologia": None,
            "conservacion": None,
            "embedding": None
        }

        if products_collection.find_one({"nregistro": nregistro}):
            print(f"🔁 Ya existe: {nregistro}")
        else:
            products_collection.insert_one(producto)
            print(f"✅ Insertado: {producto['name']}")

        time.sleep(0.5)  # Evita abusar de la API

    print("🎉 Carga desde filtrados completada.")


if __name__ == "__main__":
    preload_filtered_products()
