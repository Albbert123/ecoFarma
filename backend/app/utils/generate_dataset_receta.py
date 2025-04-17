import json
from random import choice, choices, randint, sample
from random import shuffle
import uuid

# Datos de ejemplo realistas para rellenar
# Datos de ejemplo
nombres = ["Albert Comas Pacheco", "Maria García López", "Joan Pérez Martínez", "Anna Sánchez Ruiz"]
edades = ["45 años", "32 años", "67 años", "28 años"]
ids = ["COPA0030201003", "MAGL0020302004", "JOPM0010503005", "ANSR0040101006"]
colegiados = ["283849102", "289301842", "283019822", "284309541", "282947918"]
medicamentos = [
    ("LEXCEMA 0,1% 800 CREMA", "1 aplicació cada 24 hores", "180 dies"),
    ("Amoxicilina 500 mg", "1 càpsula cada 8 hores", "7 dies"),
    ("Ibuprofeno 600 mg", "1 comprimit cada 6 hores", "5 dies"),
    ("Omeprazol 20 mg", "1 càpsula cada matí", "14 dies")
]


def generar_documento_publico(paciente, id_pac):
    med = choice(medicamentos)
    return f"""Salut Generalitat de Catalunya

Pla de medicació

{paciente}
{id_pac}

Informació per a la farmàcia

Tractaments de curta durada
Medicament o producte sanitari\tDosi, freqüència\tDurada\tPrescripció\tVigència\tComentaris
{med[0]}\t{med[1]}\t{med[2]}\tV.MORILLAS\t07/01/2025 al 08/07/2025\tDERMATOLOGIA Hospital de Mataró

El cost orientatiu d’aquests tractaments és de 31,32 €*.  L'aportació per part del/de la pacient dependrà, en cada cas, segons el que preveu el Reial decret llei 16/2012.
Descarregueu-vos el darrer Pla de medicació a través de La Meva Salut
Per al bé de tothom, fem un ús responsable de la medicació.
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

# Generar pares positivos (mismo tipo de documento)
def generar_par_positivo():
    nombre = choice(nombres)
    id_pac = choice(ids)
    edad = choice(edades)
    
    # Decidir si generar dos públicos o dos privados
    if randint(0, 1) == 0:
        # Dos públicos
        text1 = generar_documento_publico(nombre, id_pac)
        text2 = generar_documento_publico(nombre, id_pac)  # Mismo paciente
    else:
        # Dos privados
        text1 = generar_documento_privado(nombre, id_pac, edad)
        text2 = generar_documento_privado(nombre, id_pac, edad)  # Mismo paciente
    
    return {"text1": text1, "text2": text2, "label": 1}

# Generar pares negativos
def generar_par_negativo():
    # 50% de probabilidad de mezclar tipos o mantener mismo tipo pero diferente paciente
    if randint(0, 1) == 0:
        # Diferentes tipos
        nombre1 = choice(nombres)
        text1 = generar_documento_publico(nombre1, choice(ids))
        text2 = generar_documento_privado(choice([n for n in nombres if n != nombre1]), choice(ids), choice(edades))
    else:
        # Mismo tipo pero diferente paciente
        if randint(0, 1) == 0:
            # Dos públicos diferentes
            text1 = generar_documento_publico(choice(nombres), choice(ids))
            text2 = generar_documento_publico(choice([n for n in nombres if n != choice(nombres)]), choice(ids))
        else:
            # Dos privados diferentes
            text1 = generar_documento_privado(choice(nombres), choice(ids), choice(edades))
            text2 = generar_documento_privado(choice([n for n in nombres if n != choice(nombres)]), choice(ids), choice(edades))
    
    return {"text1": text1, "text2": text2, "label": 0}

# Generar dataset balanceado
dataset = []
for _ in range(50):  # 50 pares positivos
    dataset.append(generar_par_positivo())
    
for _ in range(50):  # 50 pares negativos
    dataset.append(generar_par_negativo())

# Mezclar el dataset
shuffle(dataset)

# Guardar en archivo JSONL
with open("dataset_siamese.jsonl", "w", encoding='utf-8') as f:
    for item in dataset:
        f.write(json.dumps(item, ensure_ascii=False) + "\n")
