import os
from app.config.database import db

ALLOWED_TYPES = [
    "application/pdf"
    # "image/jpeg",
    # "image/png",
    # "image/jpg"
]

BASE_PRESCRIPTION_DB = db["BasePrescriptions"]
PRESCRIPTION_DB = db["Receta"]

# Calcula ruta absoluta al directorio raíz del backend
BACKEND_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # app/
BACKEND_DIR = os.path.abspath(os.path.join(BACKEND_DIR, ".."))             # backend/

MODEL_RECEIPT_PATH = os.path.join(BACKEND_DIR, "modelo_recetas3")
MODEL_PRODUCT_PATH = os.path.join(BACKEND_DIR, "modelo_productos_triplet_finetuned")
