import json
import requests
from bs4 import BeautifulSoup
from app.config.database import db

products_collection = db["Producto"]

def extract_section_1_description(url_html):
    try:
        response = requests.get(url_html, timeout=10)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, "html.parser")

        # Buscar sección 1
        section_title = soup.find(
            lambda tag: tag.name in ["h1", "h2", "h3"] and
            tag.text.strip().startswith("1.")
        )

        if not section_title:
            return None

        paragraphs = []
        current = section_title.find_next_sibling()
        while current:
            text = current.get_text(strip=True)
            if text.startswith("2."):
                break
            if text:
                paragraphs.append(text)
            current = current.find_next_sibling()

        return " ".join(paragraphs).strip() if paragraphs else None

    except Exception as e:
        print(f"⚠️ Error al procesar {url_html}: {e}")
        return None

def assign_description():
    with open("medicamentos_filtrados.json", "r", encoding="utf-8") as f:
        medicamentos = json.load(f)

    print(f"📄 Medicamentos a procesar: {len(medicamentos)}")

    actualizados = 0

    for medicamento in medicamentos:
        nregistro = medicamento.get("nregistro")
        docs = medicamento.get("docs", [])

        url_html = next((doc["urlHtml"] for doc in docs if doc["tipo"] == 2 and "urlHtml" in doc), None)

        descripcion = None
        if url_html:
            descripcion = extract_section_1_description(url_html)

        producto = products_collection.find_one({"nregistro": nregistro})
        if producto:
            products_collection.update_one(
                {"_id": producto["_id"]},
                {"$set": {"description": descripcion}}
            )
            if descripcion:
                print(f"📝 {nregistro} - {producto.get('name')}: Descripción actualizada")
                actualizados += 1
            else:
                print(f"🕳️ {nregistro} - {producto.get('name')}: Descripción vacía (null)")

    print(f"\n✅ Descripciones actualizadas: {actualizados}")

if __name__ == "__main__":
    assign_description()
