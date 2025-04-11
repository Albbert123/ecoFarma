import json

# Ruta del archivo original
input_file = "medicamentos_filtrados.json"

# Ruta del archivo de salida
output_file = "nreg_medicamentos_filtrados.json"


def extract_nregistros(input_file, output_file):
    try:
        # Leer el archivo JSON original
        with open(input_file, "r", encoding="utf-8") as infile:
            medicamentos = json.load(infile)

        # Extraer los nregistros en el formato deseado
        nregistros = [
            {
                "nregistro": med["nregistro"]
            } 
            for med in medicamentos 
            if "nregistro" in med
        ]

        # Guardar los nregistros en un nuevo archivo JSON
        with open(output_file, "w", encoding="utf-8") as outfile:
            json.dump(nregistros, outfile, ensure_ascii=False, indent=4)

        print(
            f"✅ Se han extraído {len(nregistros)} nregistros y guardado en "
            f"'{output_file}'"
        )
    except Exception as e:
        print(f"❌ Error al procesar los medicamentos: {e}")


# Ejecutar la función
extract_nregistros(input_file, output_file)
