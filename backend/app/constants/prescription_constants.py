from app.config.database import db

ALLOWED_TYPES = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/jpg"
]

BASE_PRESCRIPTION_DB = db["BasePrescriptions"]
PRESCRIPTION_DB = db["Receta"]
