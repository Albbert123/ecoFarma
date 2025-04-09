import requests
import time
import json

# Configuración
base_url = "https://cima.aemps.es/cima/rest/medicamentos"
elements_per_page = 25
max_pages = 1010  # Aproximadamente para cubrir hasta 30.000 entradas
headers = {
    "User-Agent": "Mozilla/5.0"
}

all_medicamentos = []

for page in range(1, max_pages + 1):
    url = f"{base_url}?tamanioPagina={elements_per_page}&pagina={page}"
    response = requests.get(url, headers=headers)

    if response.status_code != 200:
        print(f"Error en la página {page}: {response.status_code}")
        break

    data = response.json()
    medicamentos = data.get("resultados", [])

    if not medicamentos:
        print(f"No más datos en la página {page}. Finalizando.")
        break

    all_medicamentos.extend(medicamentos)
    print(
        f"Página {page}: {len(medicamentos)} medicamentos añadidos "
        f"(total: {len(all_medicamentos)})"
    )
    time.sleep(0.3)  # para no saturar la API

# Guardar en archivo JSON
with open("medicamentos_cima_completos.json", "w", encoding="utf-8") as f:
    json.dump(all_medicamentos, f, ensure_ascii=False, indent=2)

print(f"Descarga completada con {len(all_medicamentos)} medicamentos.")
