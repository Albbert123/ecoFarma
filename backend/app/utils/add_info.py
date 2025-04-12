import json
import re
from app.config.database import db
import requests
from bs4 import BeautifulSoup

products_collection = db["Producto"]


def assign_additional_info():
    with open("medicamentos_filtrados.json", "r", encoding="utf-8") as f:
        medicamentos = json.load(f)

    print(f"🔍 Medicamentos en JSON: {len(medicamentos)}")

    actualizados = 0
    no_encontrados = []

    for medicamento in medicamentos:
        nregistro = medicamento.get("nregistro")
        docs = medicamento.get("docs", [])

        # Buscar URL según el orden de preferencia
        prospecto_url = (
            next((doc["url"] for doc in docs if doc["tipo"] == 2 and "url" in doc), None) or
            next((doc["url"] for doc in docs if doc["tipo"] == 1 and "url" in doc), None) or
            next((doc["urlHtml"] for doc in docs if doc["tipo"] == 2 and "urlHtml" in doc), None) or
            next((doc["urlHtml"] for doc in docs if doc["tipo"] == 1 and "urlHtml" in doc), None)
        )

        if prospecto_url:
            producto = products_collection.find_one({"nregistro": nregistro})
            if producto:
                result = products_collection.update_one(
                    {"_id": producto["_id"]},
                    {"$set": {"AdditionalInfo": prospecto_url}}
                )
                if result.modified_count > 0:
                    print(f"📄 {nregistro} - {producto.get('name')}: URL asignada")
                    actualizados += 1
            else:
                no_encontrados.append((nregistro, "No encontrado en DB"))
        else:
            no_encontrados.append((nregistro, "No hay ninguna URL válida"))

    print(f"\n✅ Productos actualizados: {actualizados}")
    if no_encontrados:
        print("\n❌ No se pudo asignar URL a los siguientes productos:")
        for nreg, motivo in no_encontrados:
            print(f" - {nreg}: {motivo}")


def extract_composicion_from_html(url_html):
    try:
        response = requests.get(url_html, timeout=10)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, "html.parser")

        section_title = soup.find(
            lambda tag: tag.name in ["p", "h1", "h2", "h3"] and 
            "2. COMPOSICIÓN CUALITATIVA Y CUANTITATIVA" in tag.text.upper()
        )
        if not section_title:
            return None

        next_paragraph = section_title.find_next_sibling()
        while next_paragraph and len(next_paragraph.get_text(strip=True)) < 10:
            next_paragraph = next_paragraph.find_next_sibling()

        if next_paragraph:
            text = next_paragraph.get_text(strip=True)

            # Eliminar frases tipo "Para consultar la lista completa de excipientes, ver sección X.Y."
            pattern = r"(Para\s+consultar\s+la\s+lista\s+completa\s+de\s+excipientes.*?sección\s+\d[\d.]*)"
            text = re.sub(pattern, '', text, flags=re.IGNORECASE).strip()

            return text if text else None

    except Exception as e:
        print(f"⚠️ Error al procesar {url_html}: {e}")

    return None

def assign_composicion():
    with open("medicamentos_filtrados.json", "r", encoding="utf-8") as f:
        medicamentos = json.load(f)

    print(f"🔍 Medicamentos a procesar: {len(medicamentos)}")

    actualizados = 0

    for medicamento in medicamentos:
        nregistro = medicamento.get("nregistro")
        docs = medicamento.get("docs", [])
        html_url = next((doc["urlHtml"] for doc in docs if doc["tipo"] == 1 and "urlHtml" in doc), None)
        print("html_url", html_url)

        composicion = None
        if html_url:
            composicion = extract_composicion_from_html(html_url)
        print("composicion", composicion)

        producto = products_collection.find_one({"nregistro": nregistro})
        if producto:
            products_collection.update_one(
                {"_id": producto["_id"]},
                {"$set": {"composition": composicion}}
            )
            if composicion:
                print(f"🧬 {nregistro} - {producto.get('name')}: Composición actualizada")
                actualizados += 1
            else:
                print(f"🕳️ {nregistro} - {producto.get('name')}: Sin composición (null)")

    print(f"\n✅ Productos con composición actualizada: {actualizados}")


if __name__ == "__main__":
    assign_composicion()
