from sentence_transformers import SentenceTransformer
import numpy as np
from app.config.database import db

# Config
MODEL_PATH = "modelo_recetas2"
collection = db["BasePrescriptions"]

# Recetas base
recetas_electronicas_1 = [
    "Data darrera modificació: 21/01/2025\nPàgina 1 de 1\nPla de medicació\nAlbert Comas Pacheco Informació per a la farmàcia\nJOPM0010503005\n0000 0000 0725 0177 4739\nTractaments de curta durada\nMedicament o producte\nDosi, freqüència i\nsanitari, núm. de prescripció i via Durada del Prescriptor/a i\nprincipi actiu d'administració tractament centre Vigència Comentaris\nLEXXEMA 0,1% 60G CREMA 1 aplicació 180 V.MORILLAS del 07/01/2025\ncada 24 hores LAHUERTA al 06/07/2025\nP1E631049795 (Col: 108521233)\nmetilprednisolona TOPICA DERMATOLOGIA\nCCEE\nAmbulatòries -\nHospital de Mataró\nEl cost orientatiu d'aquests tractaments és de 6,09 €*. L'aportació per part del/de la pacient dependrà, en cada cas,\nsegons el que preveu el Reial decret llei 16/2012.\nDescarregueu-vos el darrer Pla de medicació a través de La Meva Salut.\nPer al bé de tothom, fem un ús responsable de la medicació.\nInformació per al/per a la pacient\n1. En aquest Pla de medicació hi consten totes les prescripcions actives introduïdes al sistema de recepta electrònica.\n2. Per poder recollir els productes a la farmàcia és obligatori presentar el Pla de medicació i la targeta sanitària individual, com a claus per\naccedir a la vostra medicació.\n3. Únicament és vàlid el darrer Pla de medicació.\n4. Retireu de la farmàcia els medicaments a mesura que els necessiteu.Els podreu anar recollint d’acord amb la dosi i freqüència d’administració.\n5. Us podeu descarregar el Pla de medicació a través de La Meva Salut.\n6. Podeu consultar al final d'aquest document la informació relativa a protecció de dades.\n*El càlcul d'aquest import s'ha determinat d'acord amb les dades disponibles en el moment de la prescripció.\nInformació bàsica sobre protecció de dades\nIdentificació del tractament: Registre de prestació farmacèutica. Responsable del tractament: Sotsdirecció del Servei Català de la Salut (trav. de les Corts, 131-159; Edifici\nOlímpia; 08028 Barcelona). Finalitat: registrar i avaluar l’activitat medicofarmacèutica i controlar la prestació farmacèutica de l’SNS i altres serveis objecte de contracte o conveni\namb el Consell de Col·legis Farmacèutics de Catalunya (CCFC) i els col·legis oficials de farmacèutics de Catalunya. Legitimació: exercici de poders públics. Destinataris:\npersones usuàries del sistema sanitari català, MUFACE, ISFAS i MUGEJU; professionals sanitaris que prescriuen, indiquen o validen els tractaments; professionals farmacèutics\nque dispensen els tractaments. Drets de les persones interessades: podeu exercir els vostres drets d’accés, rectificació, supressió, oposició al tractament, dret a l’oblit, dret a la\nportabilitat de les dades i sol·licitud de limitació mitjançant el formulari https://catsalut.gencat.cat/drets-proteccio-dades. Informació addicional: si voleu ampliar aquesta\ninformació, podeu consultar la informació addicional del tractament al web del Servei Català de la Salut (https://catsalut.gencat.cat/proteccio-dades).\n"
]

recetas_electronicas_2 = [
    "Data darrera modificació: 21/01/2025\nPàgina 1 de 1\nPla de medicació\nLAURA PEDRAZA IGLESIAS I Informació per a la farmàcia\nCOPA0030201003\n0000 0000 0725 0177 4739\nTractaments de curta durada\nMedicament o producte\nDosi, freqüència i\nsanitari, núm. de prescripció i via Durada del Prescriptor/a i\nprincipi actiu d'administració tractament centre Vigència Comentaris\nNAPROXENO SODICO CINFA 1 comprimit 2 A.PEREZ del 21/01/2025 .\n550MG 40 COMPRIMIDOS EFG cada 8 hores (Col: 108601941) al 23/01/2025\nP0E633823213 MEDICINA\nORAL FAMILIAR I\nnaproxèn sòdic\nCOMUNITÀRIA\nCUAP Maresme\nPARACETAMOL VIATRIS 1 comprimit 2 A.PEREZ del 21/01/2025 .\n650MG 40 COMPRIMIDOS EFG cada 8 hores (Col: 108601941) al 23/01/2025\nP0E633823214 MEDICINA\nORAL FAMILIAR I\nparacetamol\nCOMUNITÀRIA\nCUAP Maresme\nEl cost orientatiu d'aquests tractaments és de 6,09 €*. L'aportació per part del/de la pacient dependrà, en cada cas,\nsegons el que preveu el Reial decret llei 16/2012.\nDescarregueu-vos el darrer Pla de medicació a través de La Meva Salut.\nPer al bé de tothom, fem un ús responsable de la medicació.\nInformació per al/per a la pacient\n1. En aquest Pla de medicació hi consten totes les prescripcions actives introduïdes al sistema de recepta electrònica.\n2. Per poder recollir els productes a la farmàcia és obligatori presentar el Pla de medicació i la targeta sanitària individual, com a claus per\naccedir a la vostra medicació.\n3. Únicament és vàlid el darrer Pla de medicació.\n4. Retireu de la farmàcia els medicaments a mesura que els necessiteu.Els podreu anar recollint d’acord amb la dosi i freqüència d’administració.\n5. Us podeu descarregar el Pla de medicació a través de La Meva Salut.\n6. Podeu consultar al final d'aquest document la informació relativa a protecció de dades.\n*El càlcul d'aquest import s'ha determinat d'acord amb les dades disponibles en el moment de la prescripció.\nInformació bàsica sobre protecció de dades\nIdentificació del tractament: Registre de prestació farmacèutica. Responsable del tractament: Sotsdirecció del Servei Català de la Salut (trav. de les Corts, 131-159; Edifici\nOlímpia; 08028 Barcelona). Finalitat: registrar i avaluar l’activitat medicofarmacèutica i controlar la prestació farmacèutica de l’SNS i altres serveis objecte de contracte o conveni\namb el Consell de Col·legis Farmacèutics de Catalunya (CCFC) i els col·legis oficials de farmacèutics de Catalunya. Legitimació: exercici de poders públics. Destinataris:\npersones usuàries del sistema sanitari català, MUFACE, ISFAS i MUGEJU; professionals sanitaris que prescriuen, indiquen o validen els tractaments; professionals farmacèutics\nque dispensen els tractaments. Drets de les persones interessades: podeu exercir els vostres drets d’accés, rectificació, supressió, oposició al tractament, dret a l’oblit, dret a la\nportabilitat de les dades i sol·licitud de limitació mitjançant el formulari https://catsalut.gencat.cat/drets-proteccio-dades. Informació addicional: si voleu ampliar aquesta\ninformació, podeu consultar la informació addicional del tractament al web del Servei Català de la Salut (https://catsalut.gencat.cat/proteccio-dades).\n"
]

recetas_privadas = [
    "HOJA DE MEDICACIÓN ACTIVA E INFORMACIÓN AL PACIENTE\nID Hoja Información: 8044238836\nPaciente: Anna Sánchez Ruiz  \nEdad: 45 años  \nID.Acc: JOPM0010503005\nPrescripciones  \nID.Rep: 87734181f2764c4f8faf8332\tIbuprofeno 600 mg\t1\t1 cada cada 6 hores\t05-03-2024\t10-03-2024  \nID.Rec: 1583607871624  \nNº Colegiado: 283019822"
]

# Load model
model = SentenceTransformer(MODEL_PATH)

# Connect Mongo
collection.delete_many({})  # Opcional: vaciar antes


def guardar_recetas_electronicas_con_dos_embeddings(lista1, lista2):
    for text1, text2 in zip(lista1, lista2):
        emb1 = model.encode(text1).tolist()
        print("text1", text1)
        emb2 = model.encode(text2).tolist()
        print("text2", text2)

        documento = {
            "tipo": "Electrónica",
            "embeddings": [emb1, emb2]  # Aquí están los dos embeddings
        }

        collection.insert_one(documento)
        print("Receta electrónica con 2 embeddings guardada.")

def guardar_recetas_privadas(lista):
    for text in lista:
        emb = model.encode(text).tolist()

        documento = {
            "tipo": "Privada",
            "embeddings": [emb]  # Solo uno para privadas
        }

        collection.insert_one(documento)
        print("Receta privada guardada.")


# Guardar en la base de datos
guardar_recetas_electronicas_con_dos_embeddings(recetas_electronicas_1, recetas_electronicas_2)
guardar_recetas_privadas(recetas_privadas)

print("🧠 Embeddings base generados y guardados.")
