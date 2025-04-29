from app.config.database import db

ORDER_DB = db["Encargo"]
ORDER_STATUS = [
    "PENDIENTE",
    "LISTO PARA RECOGER",
    "ENTREGADO",
    "CANCELADO",
]
