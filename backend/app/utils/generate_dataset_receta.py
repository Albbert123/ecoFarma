import json
from random import choice, randint, shuffle
import uuid

# Datos de ejemplo
nombres = ["Albert Comas Pacheco", "Maria García López", "Joan Pérez Martínez", "Anna Sánchez Ruiz"]
edades = ["45 años", "32 años", "67 años", "28 años"]
ids = ["COPA0030201003", "MAGL0020302004", "JOPM0010503005", "ANSR0040101006"]
colegiados = ["283849102", "289301842", "283019822", "284309541", "282947918"]

# Medicamentos fijos públicos
textos_meds = [
    """LEXXEMA 0,1% 60G CREMA 1 aplicació 180 V.MORILLAS del 07/01/2025
cada 24 hores LAHUERTA al 06/07/2025
P1E631049795 (Col: 108521233)
metilprednisolona TOPICA DERMATOLOGIA
CCEE
Ambulatòries -
Hospital de Mataró""",
    """NAPROXENO SODICO CINFA 1 comprimit 2 A.PEREZ del 21/01/2025 .
550MG 40 COMPRIMIDOS EFG cada 8 hores (Col: 108601941) al 23/01/2025
P0E633823213 MEDICINA
ORAL FAMILIAR I
naproxèn sòdic
COMUNITÀRIA
CUAP Maresme
PARACETAMOL VIATRIS 1 comprimit 2 A.PEREZ del 21/01/2025 .
650MG 40 COMPRIMIDOS EFG cada 8 hores (Col: 108601941) al 23/01/2025
P0E633823214 MEDICINA
ORAL FAMILIAR I
paracetamol
COMUNITÀRIA
CUAP Maresme"""
]

# Medicamentos privados para generar aleatoriamente
medicamentos = [
    ("LEXCEMA 0,1% 800 CREMA", "1 aplicació cada 24 hores", "180 dies", "metilprednisolona", "TOPICA", "DERMATOLOGIA"),
    ("Amoxicilina 500 mg", "1 càpsula cada 8 hores", "7 dies", "amoxicilina", "ORAL", "FAMILIAR I COMUNITÀRIA"),
    ("Ibuprofeno 600 mg", "1 comprimit cada 6 hores", "5 dies", "ibuprofeno", "ORAL", "FAMILIAR I COMUNITÀRIA"),
    ("Omeprazol 20 mg", "1 càpsula cada matí", "14 dies", "omeprazol", "ORAL", "FAMILIAR I COMUNITÀRIA"),
    ("Paracetamol 650 mg", "1 comprimit cada 8 hores", "3 dies", "paracetamol", "ORAL", "FAMILIAR I COMUNITÀRIA")
]

def generar_documento_publico(paciente, id_pac):
    # Elegir uno o dos textos públicos completos
    num_meds = randint(0, 1)
    medicamentos_extraidos = textos_meds[num_meds]

    return f"""Data darrera modificació: 21/01/2025
Pàgina 1 de 1
Pla de medicació
{paciente} Informació per a la farmàcia
{id_pac}
0000 0000 0725 0177 4739
Tractaments de curta durada
Medicament o producte
Dosi, freqüència i
sanitari, núm. de prescripció i via Durada del Prescriptor/a i
principi actiu d'administració tractament centre Vigència Comentaris
{medicamentos_extraidos}
El cost orientatiu d'aquests tractaments és de 6,09 €*. L'aportació per part del/de la pacient dependrà, en cada cas,
segons el que preveu el Reial decret llei 16/2012.
Descarregueu-vos el darrer Pla de medicació a través de La Meva Salut.
Per al bé de tothom, fem un ús responsable de la medicació.
Informació per al/per a la pacient
1. En aquest Pla de medicació hi consten totes les prescripcions actives introduïdes al sistema de recepta electrònica.
2. Per poder recollir els productes a la farmàcia és obligatori presentar el Pla de medicació i la targeta sanitària individual, com a claus per
accedir a la vostra medicació.
3. Únicament és vàlid el darrer Pla de medicació.
4. Retireu de la farmàcia els medicaments a mesura que els necessiteu.Els podreu anar recollint d’acord amb la dosi i freqüència d’administració.
5. Us podeu descarregar el Pla de medicació a través de La Meva Salut.
6. Podeu consultar al final d'aquest document la informació relativa a protecció de dades.
*El càlcul d'aquest import s'ha determinat d'acord amb les dades disponibles en el moment de la prescripció.
Informació bàsica sobre protecció de dades
Identificació del tractament: Registre de prestació farmacèutica. Responsable del tractament: Sotsdirecció del Servei Català de la Salut (trav. de les Corts, 131-159; Edifici
Olímpia; 08028 Barcelona). Finalitat: registrar i avaluar l’activitat medicofarmacèutica i controlar la prestació farmacèutica de l’SNS i altres serveis objecte de contracte o conveni
amb el Consell de Col·legis Farmacèutics de Catalunya (CCFC) i els col·legis oficials de farmacèutics de Catalunya. Legitimació: exercici de poders públics. Destinataris:
persones usuàries del sistema sanitari català, MUFACE, ISFAS i MUGEJU; professionals sanitaris que prescriuen, indiquen o validen els tractaments; professionals farmacèutics
que dispensen els tractaments. Drets de les persones interessades: podeu exercir els vostres drets d’accés, rectificació, supressió, oposició al tractament, dret a l’oblit, dret a la
portabilitat de les dades i sol·licitud de limitació mitjançant el formulari https://catsalut.gencat.cat/drets-proteccio-dades. Informació addicional: si voleu ampliar aquesta
informació, podeu consultar la informació addicional del tractament al web del Servei Català de la Salut (https://catsalut.gencat.cat/proteccio-dades).
"""

def generar_documento_privado(paciente, id_pac, edad):
    med = choice(medicamentos)
    return f"""HOJA DE MEDICACIÓN ACTIVA E INFORMACIÓN AL PACIENTE
ID Hoja Información: {str(uuid.uuid4().int)[:10]}
Paciente: {paciente}  
Edad: {edad}  
ID.Acc: {id_pac}
Prescripciones  
ID.Rep: {str(uuid.uuid4().hex[:24])}\t{med[0]}\t1\t{med[1].replace("càpsula", "cada").replace("comprimit", "cada")}\t05-03-2024\t10-03-2024  
ID.Rec: {str(uuid.uuid4().int)[:13]}  
Nº Colegiado: {choice(colegiados)}"""

def generar_par_positivo():
    nombre = choice(nombres)
    id_pac = choice(ids)
    edad = choice(edades)
    if randint(0, 1) == 0:
        text1 = generar_documento_publico(nombre, id_pac)
        text2 = generar_documento_publico(nombre, id_pac)
    else:
        text1 = generar_documento_privado(nombre, id_pac, edad)
        text2 = generar_documento_privado(nombre, id_pac, edad)
    return {"text1": text1, "text2": text2, "label": 1}

def generar_par_negativo():
    if randint(0, 1) == 0:
        nombre1 = choice(nombres)
        text1 = generar_documento_publico(nombre1, choice(ids))

        nombre2 = choice([n for n in nombres if n != nombre1])
        text2 = generar_documento_privado(nombre2, choice(ids), choice(edades))
    else:
        if randint(0, 1) == 0:
            nombre1 = choice(nombres)
            nombre2 = choice([n for n in nombres if n != nombre1])
            text1 = generar_documento_publico(nombre1, choice(ids))
            text2 = generar_documento_publico(nombre2, choice(ids))
        else:
            nombre1 = choice(nombres)
            nombre2 = choice([n for n in nombres if n != nombre1])
            text1 = generar_documento_privado(nombre1, choice(ids), choice(edades))
            text2 = generar_documento_privado(nombre2, choice(ids), choice(edades))
    return {"text1": text1, "text2": text2, "label": 0}
# Generar dataset
dataset = []
for _ in range(100):
    dataset.append(generar_par_positivo())
for _ in range(100):
    dataset.append(generar_par_negativo())
shuffle(dataset)

# Guardar
with open("dataset_siamese2.jsonl", "w", encoding='utf-8') as f:
    for item in dataset:
        f.write(json.dumps(item, ensure_ascii=False) + "\n")
