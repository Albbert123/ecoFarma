from sentence_transformers import SentenceTransformer
import numpy as np
from app.config.database import db

# Config
MODEL_PATH = "modelo_recetas"
collection = db["BasePrescriptions"]

# Recetas base
recetas_electronicas = [
    "Salut Generalitat de Catalunya\n\nPla de medicació\n\nMaria García López\nCOPA0030201003\n\nInformació per a la farmàcia\n\nTractaments de curta durada\nMedicament o producte sanitari\tDosi, freqüència\tDurada\tPrescripció\tVigència\tComentaris\nOmeprazol 20 mg\t1 càpsula cada matí\t14 dies\tV.MORILLAS\t07/01/2025 al 08/07/2025\tDERMATOLOGIA Hospital de Mataró\n\nEl cost orientatiu d’aquests tractaments és de 31,32 €*.  L'aportació per part del/de la pacient dependrà, en cada cas, segons el que preveu el Reial decret llei 16/2012.\nDescarregueu-vos el darrer Pla de medicació a través de La Meva Salut\nPer al bé de tothom, fem un ús responsable de la medicació.\n",
    "Salut Generalitat de Catalunya\n\nPla de medicació\n\nJoan Pérez Martínez\nCOPA0030201003\n\nInformació per a la farmàcia\n\nTractaments de curta durada\nMedicament o producte sanitari\tDosi, freqüència\tDurada\tPrescripció\tVigència\tComentaris\nOmeprazol 20 mg\t1 càpsula cada matí\t14 dies\tV.MORILLAS\t07/01/2025 al 08/07/2025\tDERMATOLOGIA Hospital de Mataró\n\nEl cost orientatiu d’aquests tractaments és de 31,32 €*.  L'aportació per part del/de la pacient dependrà, en cada cas, segons el que preveu el Reial decret llei 16/2012.\nDescarregueu-vos el darrer Pla de medicació a través de La Meva Salut\nPer al bé de tothom, fem un ús responsable de la medicació.\n",
    "Salut Generalitat de Catalunya\n\nPla de medicació\n\nAnna Sánchez Ruiz\nJOPM0010503005\n\nInformació per a la farmàcia\n\nTractaments de curta durada\nMedicament o producte sanitari\tDosi, freqüència\tDurada\tPrescripció\tVigència\tComentaris\nOmeprazol 20 mg\t1 càpsula cada matí\t14 dies\tV.MORILLAS\t07/01/2025 al 08/07/2025\tDERMATOLOGIA Hospital de Mataró\n\nEl cost orientatiu d’aquests tractaments és de 31,32 €*.  L'aportació per part del/de la pacient dependrà, en cada cas, segons el que preveu el Reial decret llei 16/2012.\nDescarregueu-vos el darrer Pla de medicació a través de La Meva Salut\nPer al bé de tothom, fem un ús responsable de la medicació.\n",
    "Salut Generalitat de Catalunya\n\nPla de medicació\n\nAnna Sánchez Ruiz\nCOPA0030201003\n\nInformació per a la farmàcia\n\nTractaments de curta durada\nMedicament o producte sanitari\tDosi, freqüència\tDurada\tPrescripció\tVigència\tComentaris\nIbuprofeno 600 mg\t1 comprimit cada 6 hores\t5 dies\tV.MORILLAS\t07/01/2025 al 08/07/2025\tDERMATOLOGIA Hospital de Mataró\n\nEl cost orientatiu d’aquests tractaments és de 31,32 €*.  L'aportació per part del/de la pacient dependrà, en cada cas, segons el que preveu el Reial decret llei 16/2012.\nDescarregueu-vos el darrer Pla de medicació a través de La Meva Salut\nPer al bé de tothom, fem un ús responsable de la medicació.\n",
    "Salut Generalitat de Catalunya\n\nPla de medicació\n\nAlbert Comas Pacheco\nCOPA0030201003\n\nInformació per a la farmàcia\n\nTractaments de curta durada\nMedicament o producte sanitari\tDosi, freqüència\tDurada\tPrescripció\tVigència\tComentaris\nOmeprazol 20 mg\t1 càpsula cada matí\t14 dies\tV.MORILLAS\t07/01/2025 al 08/07/2025\tDERMATOLOGIA Hospital de Mataró\n\nEl cost orientatiu d’aquests tractaments és de 31,32 €*.  L'aportació per part del/de la pacient dependrà, en cada cas, segons el que preveu el Reial decret llei 16/2012.\nDescarregueu-vos el darrer Pla de medicació a través de La Meva Salut\nPer al bé de tothom, fem un ús responsable de la medicació.\n"
]

recetas_privadas = [
    "HOJA DE MEDICACIÓN ACTIVA E INFORMACIÓN AL PACIENTE\nID Hoja Información: 8044238836\nPaciente: Anna Sánchez Ruiz  \nEdad: 45 años  \nID.Acc: JOPM0010503005\nPrescripciones  \nID.Rep: 87734181f2764c4f8faf8332\tIbuprofeno 600 mg\t1\t1 cada cada 6 hores\t05-03-2024\t10-03-2024  \nID.Rec: 1583607871624  \nNº Colegiado: 283019822",
    "HOJA DE MEDICACIÓN ACTIVA E INFORMACIÓN AL PACIENTE\nID Hoja Información: 3307071455\nPaciente: Albert Comas Pacheco  \nEdad: 67 años  \nID.Acc: MAGL0020302004\nPrescripciones  \nID.Rep: 02d7c59d225e44b08f521a57\tIbuprofeno 600 mg\t1\t1 cada cada 6 hores\t05-03-2024\t10-03-2024  \nID.Rec: 9698222608183  \nNº Colegiado: 283019822",
    "HOJA DE MEDICACIÓN ACTIVA E INFORMACIÓN AL PACIENTE\nID Hoja Información: 2481548957\nPaciente: Maria García López  \nEdad: 28 años  \nID.Acc: ANSR0040101006\nPrescripciones  \nID.Rep: 295343ac59d343e4be8f8609\tLEXCEMA 0,1% 800 CREMA\t1\t1 aplicació cada 24 hores\t05-03-2024\t10-03-2024  \nID.Rec: 3254931973873  \nNº Colegiado: 282947918",
    "HOJA DE MEDICACIÓN ACTIVA E INFORMACIÓN AL PACIENTE\nID Hoja Información: 1288844052\nPaciente: Maria García López  \nEdad: 45 años  \nID.Acc: MAGL0020302004\nPrescripciones  \nID.Rep: 8b4067b69d5e474b9e57ee0c\tAmoxicilina 500 mg\t1\t1 cada cada 8 hores\t05-03-2024\t10-03-2024  \nID.Rec: 1641859003664  \nNº Colegiado: 284309541",
    "HOJA DE MEDICACIÓN ACTIVA E INFORMACIÓN AL PACIENTE\nID Hoja Información: 2822479186\nPaciente: Joan Pérez Martínez  \nEdad: 67 años  \nID.Acc: ANSR0040101006\nPrescripciones  \nID.Rep: cee9a0e0d18d496eb5c5f498\tIbuprofeno 600 mg\t1\t1 cada cada 6 hores\t05-03-2024\t10-03-2024  \nID.Rec: 5669862911814  \nNº Colegiado: 289301842"
]

# Load model
model = SentenceTransformer(MODEL_PATH)

# Connect Mongo
collection.delete_many({})  # Opcional: vaciar antes


# Función para crear embedding medio
def insertar_tipo_base(tipo: str, recetas: list[str]):
    embeddings = model.encode(recetas)
    embedding_medio = np.mean(embeddings, axis=0).tolist()

    doc = {
        "tipo": tipo,
        "embedding": embedding_medio
    }
    collection.insert_one(doc)
    print(f"✅ Embedding representativo para '{tipo}' insertado.")


# Ejecutar
insertar_tipo_base("Electrónica", recetas_electronicas)
insertar_tipo_base("Privada", recetas_privadas)

print("🧠 Embeddings base generados y guardados.")
