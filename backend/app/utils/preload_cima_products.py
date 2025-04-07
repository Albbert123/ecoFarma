from app.config.database import db
from app.services.cima_service import (
    get_products_by_conditions,
    get_product_by_nregistro,
)
import time

# MongoDB connection
products_collection = db["Producto"]


def preload_products_from_cima(limit=25):
    print(f"🧪 Precargando hasta {limit} productos de CIMA...")

    # Paso 1: obtener listado general
    data = get_products_by_conditions({"elements": limit, "page": 1})
    medicamentos = data.get("resultados", [])

    print(f"✅ Se encontraron {len(medicamentos)} medicamentos.")

    for med in medicamentos:
        nregistro = med.get("nregistro")
        if not nregistro:
            continue

        try:
            detalle = get_product_by_nregistro(nregistro)
        except Exception as e:
            print(f"❌ Error con nregistro {nregistro}: {e}")
            continue

        # Paso 2: mapear al modelo Product
        producto = {
            "nregistro": detalle.get("nregistro"),
            "name": detalle.get("nombre"),
            "description": None,  # No hay un campo claro para la descripción
            "price": None,  # No disponible en API CIMA
            "image": (
                detalle.get("fotos")[0]["url"]
                if detalle.get("fotos")
                else None
            ),  # Toma la primera imagen si existe
            "laboratory": detalle.get("labtitular"),
            "category": (
                detalle.get("atcs")[0]["nombre"]
                if detalle.get("atcs")
                else None
            ),  # Usa el primer nivel ATC como categoría
            "stock": None,  # Se puede generar aleatoriamente
            "principleAct": ", ".join(
                [pa["nombre"] for pa in detalle.get("principiosActivos", [])]
            ) if detalle.get("principiosActivos") else None,
            "dosis": detalle.get("dosis"),
            "prescription": detalle.get("receta"),
            "commercialization": detalle.get("comerc"),
            "authorization": None,  # detalle.get("estado", {}).get("aut"),date
            "estupecafiente": None,  # detalle.get("triangulo"),
            "psicotropico": None,  # No se menciona en la API
            "advertencias": None,  # No disponible en los datos
            "contraindications": None,  # No disponible en los datos
            "comoTomar": None,  # No disponible en los datos
            "reacciones": None,  # No disponible en los datos
            "posologia": None,  # No disponible en los datos
            "conservacion": None,  # No disponible en los datos
            "embedding": None  # Se puede generar luego con un servicio aparte
        }

        # Insertar si no existe aún
        if products_collection.find_one({"nregistro": nregistro}):
            print(f"🔁 Ya existe: {nregistro}")
        else:
            products_collection.insert_one(producto)
            print(f"✅ Insertado: {producto['name']}")

        time.sleep(0.5)

    print("🎉 Precarga completada.")


if __name__ == "__main__":
    preload_products_from_cima(limit=25)
