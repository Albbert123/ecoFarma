# embedding_products.py
from app.config.database import db
from app.services.AI_service import generate_embedding

# Configuración de MongoDB
collection = db["Producto"]


# Función para generar el texto combinado para el embedding
def generar_texto_para_embedding(producto):
    partes = [
        producto.get("name", ""),
        f"Principios activos: {producto.get('principleAct', '')}",
        producto.get("description", "")
    ]
    return ". ".join(p for p in partes if p).strip()


# Recorremos todos los productos sin embedding
for producto in collection.find({"embedding": None}):
    texto = generar_texto_para_embedding(producto)
    try:
        embedding = generate_embedding(texto)

        # Guardamos en MongoDB
        collection.update_one(
            {"_id": producto["_id"]},
            {"$set": {"embedding": embedding}}
        )
        print(f"✔ Embedding guardado para producto {producto['nregistro']}")
    except Exception as e:
        print(f"❌ Error con producto {producto['nregistro']}: {e}")
