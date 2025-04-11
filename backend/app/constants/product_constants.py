# Lista real desde tu base de datos
LABORATORIES_DB = [
    'Pfizer Europe Ma Eeig', 'Bristol-Myers Squibb Pharma Eeig',
    'Grünenthal Pharma S.A.', 'Sandoz Farmaceutica S.A.',
    'Laboratorios Cinfa S.A.', 'Laboratorios Normon S.A.',
    'Ferrer Internacional S.A.', 'Kern Pharma S.L.'
]

CATEGORIES_DB = [
    'Antibióticos', 'Antifúngicos', 'OTROS ANALGÉSICOS Y ANTIPIRÉTICOS',
    'VACUNAS ANTIBACTERIANAS Y ANTIVIRALES COMBINADAS',
    'ANTIBACTERIANOS BETALACTÁMICOS, PENICILINAS',
    # Añade las categorías reales que tengas
]

LAB_MAPPING = {
    "Pfizer": "Pfizer Europe Ma Eeig",
    "Bristol-Myers": "Bristol-Myers Squibb Pharma Eeig",
    "Grünenthal": "Grünenthal Pharma S.A.",
    "Sandoz": "Sandoz Farmaceutica S.A.",
    "Cinfa": "Laboratorios Cinfa S.A.",
    "Normon": "Laboratorios Normon S.A.",
    "Ferrer Internacional": "Ferrer Internacional S.A.",
    "Kern": "Kern Pharma S.L."
}

# corregir

CATEGORIES_MAPPING = {
    "Analgésicos": [
        "OTROS ANALGÉSICOS Y ANTIPIRÉTICOS",
        "PRODUCTOS ANTIINFLAMATORIOS Y ANTIRREUMÁTICOS NO ESTEROIDEOS",
        "OPIOIDES"
    ],
    "Ansiedad": [
        "ANSIOLÍTICOS",
        "HIPNÓTICOS Y SEDANTES"
    ],
    "Antibióticos": [
        "ANTIBACTERIANOS BETALACTÁMICOS, PENICILINAS",
        "OTROS ANTIBACTERIANOS",
        "MACRÓLIDOS, LINCOSAMIDAS Y ESTREPTOGRAMINAS",
        "QUINOLONAS ANTIBACTERIANAS"
    ],
    "Alergia": [
        "ANTIHISTAMÍNICOS PARA USO SISTÉMICO",
        "DESCONGESTIVOS Y ANTIALÉRGICOS",
        "DESCONGESTIVOS Y OTROS PREPARADOS NASALES PARA USO TÓPICO"
    ],
    "Digestivo": [
        "AGENTES CONTRA LA ÚLCERA PÉPTICA Y EL REFLUJO GASTROESOFÁGICO (RGE/GORD)",
        "FÁRMACOS PARA EL ESTREÑIMIENTO",
        "ANTIÁCIDOS"
    ],
    "Diabetes": [
        "FÁRMACOS HIPOGLUCEMIANTES EXCLUYENDO INSULINAS",
        "INSULINAS Y ANÁLOGOS"
    ],
    "Colesterol": [
        "AGENTES MODIFICADORES DE LOS LÍPIDOS, MONOFÁRMACOS",
        "AGENTES MODIFICADORES DE LOS LÍPIDOS, COMBINACIONES"
    ],
    "Hipertensión": [
        "AGENTES ANTITROMBÓTICOS",
        "AGENTES BETA-BLOQUEANTES",
        "INHIBIDORES DE LA ECA, MONOFÁRMACOS",
        "INHIBIDORES DE LA ECA, COMBINACIONES",
        "ANTAGONISTAS DE LOS RECEPTORES DE ANGIOTENSINA II, MONOTERAPIA",
        "ANTAGONISTAS DE LOS RECEPTORES DE ANGIOTENSINA II, COMBINACIONES",
        "BLOQUEANTES SELECTIVOS DE CANALES DE CALCIO CON EFECTOS PRINCIPALMENTE VASCULARES"
    ],
    "Inmunosupresores": [
        "INMUNOSUPRESORES"
    ],
    "Antivirales": [
        "VACUNAS ANTIBACTERIANAS Y ANTIVIRALES COMBINADAS",
        "VACUNAS ANTIVIRALES",
        "ANTIVIRALES DE ACCIÓN DIRECTA"
    ]
}
