from app.config.database import db

ALLOWED_TYPES = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/jpg"
]

BASE_PRESCRIPTION_DB = db["BasePrescriptions"]
PRESCRIPTION_DB = db["Receta"]

MODEL_RECEIPT_PATH = "modelo_recetas2"
MODEL_PRODUCT_PATH = "modelo_productos_triplet_finetuned"
