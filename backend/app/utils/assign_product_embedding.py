from app.config.database import db
from ecoFarma.backend.app.services.AI_service import generate_embedding
collection = db["Product"]

# Procesar los medicamentos sin embeddings
medicamentos = collection.find({"embedding": None})

for medicamento in medicamentos:
    nregistro = medicamento["nregistro"]
    principios_activos = medicamento.get("vtm", {}).get("nombre", "")

    if principios_activos:
        print(
            f"Generando embedding para {nregistro} "
            f"({principios_activos})..."
        )
        embedding = generate_embedding(principios_activos)

        # Guardar en MongoDB
        collection.update_one(
            {"nregistro": nregistro},
            {"$set": {"embedding": embedding}}
        )

        print(f"Embedding guardado para {nregistro}")

print("Proceso finalizado.")
