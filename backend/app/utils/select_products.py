import json
import random
from collections import defaultdict
from pathlib import Path

# Rutas de los archivos
INPUT_FILE = Path("medicamentos_cima_completos.json")
OUTPUT_FILE = Path("medicamentos_filtrados.json")

# Leer todos los medicamentos
with INPUT_FILE.open(encoding="utf-8") as f:
    medicamentos = json.load(f)


# Filtrar solo los que tienen fotos
def filtrar_con_fotos(meds):
    return [m for m in meds if m.get("fotos")]


# Separar por receta y con fotos
con_receta_fotos = filtrar_con_fotos(
    [
        m for m in medicamentos
        if m.get("receta") is True
    ]
)
sin_receta_fotos = filtrar_con_fotos(
    [
        m for m in medicamentos
        if m.get("receta") is False
    ]
)


# Agrupar por letra inicial del nombre
def agrupar_por_letra(meds):
    grupos = defaultdict(list)
    for med in meds:
        letra = med["nombre"][0].upper()
        if letra.isalpha():
            grupos[letra].append(med)
    return grupos


# Función para muestrear por grupos
def muestrear_por_grupo(grupos, total):
    todas_claves = list(grupos.keys())
    random.shuffle(todas_claves)
    seleccionados = []
    por_grupo = max(1, total // len(todas_claves))

    for clave in todas_claves:
        meds = grupos[clave]
        random.shuffle(meds)
        seleccionados.extend(meds[:por_grupo])
        if len(seleccionados) >= total:
            break

    return seleccionados[:total]


# Crear selección equilibrada
random.seed(42)  # para reproducibilidad

total_con_receta = min(3000, len(con_receta_fotos))
total_sin_receta = min(2000, len(sin_receta_fotos))

total_disponible = total_con_receta + total_sin_receta
if total_disponible < 5000:
    total_con_receta = min(len(con_receta_fotos), 5000 * (3000 / 5000))
    total_sin_receta = 5000 - total_con_receta

# Selección con fotos
con_receta_grupo_letra = agrupar_por_letra(con_receta_fotos)
sin_receta_grupo_letra = agrupar_por_letra(sin_receta_fotos)

seleccion_con_receta = muestrear_por_grupo(
    con_receta_grupo_letra,
    int(total_con_receta)
)
seleccion_sin_receta = muestrear_por_grupo(
    sin_receta_grupo_letra,
    int(total_sin_receta)
)

# Combinar ambas selecciones
seleccion_total = seleccion_con_receta + seleccion_sin_receta
random.shuffle(seleccion_total)

# Guardar en nuevo JSON
with OUTPUT_FILE.open("w", encoding="utf-8") as f:
    json.dump(seleccion_total[:5000], f, ensure_ascii=False, indent=2)

print(f"Guardado: {OUTPUT_FILE} ({len(seleccion_total[:5000])} medicamentos)")
