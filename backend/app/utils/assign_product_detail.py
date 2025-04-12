from app.config.database import db
from ecoFarma.backend.app.services.AI_service import (
    download_pdf,
    extract_product_sections,
    extract_text_from_pdf,
)

collection = db["Product"]

# Procesar los medicamentos
medicamentos = collection.find({"advertencias": None})

for medicamento in medicamentos:
    nregistro = medicamento["nregistro"]
    pdf_url = medicamento["docs"][0]["url"]  # Usa el primer PDF disponible
    pdf_path = f"FT_{nregistro}.pdf"

    print(f"Procesando {nregistro}...")

    # Descargar y extraer texto
    download_pdf(pdf_url, pdf_path)
    pdf_text = extract_text_from_pdf(pdf_path)

    # Obtener resúmenes
    resumenes = extract_product_sections(pdf_text)

    # Actualizar MongoDB
    collection.update_one(
        {"nregistro": nregistro},
        {"$set": resumenes}
    )

    print(f"Actualizado {nregistro}")

print("Proceso finalizado.")
