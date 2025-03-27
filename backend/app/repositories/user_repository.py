from app.config.database import db
from app.models.user_model import UserCreate


class UserRepository:
    def get_user_by_email(self, correo: str):
        return db["Persona"].find_one({"correo": correo})

    def create_user(self, user: UserCreate, hashed_password: str):
        new_user = {
            "correo": user.correo,
            "nombre": user.nombre,
            "apellido": user.apellido,
            "contraseña": hashed_password,
            "imagen": user.imagen,
            "rol": user.rol
        }
        db["Persona"].insert_one(new_user)
        return new_user
