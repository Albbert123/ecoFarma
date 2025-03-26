from app.config.database import db
from app.models.user_model import GoogleUserCreate, UserCreate


class UserRepository:
    def get_user_by_email(self, correo: str):
        return db["Persona"].find_one({"correo": correo})

    def create_user(self, user: UserCreate, hashed_password: str):
        new_user = {
            "correo": user.correo,
            "nombre": user.nombre,
            "apellido": user.apellido,
            "contraseña": hashed_password,
            "es_google": user.es_google or "",
            "rol": user.rol
        }
        db["Persona"].insert_one(new_user)
        return new_user

    def create_user_google(self, user: GoogleUserCreate):
        new_user = {
            "correo": user.correo,
            "nombre": user.nombre,
            "apellido": user.apellido or "",
            "imagen": user.imagen or "",
            "es_google": user.es_google or "",
            "rol": user.rol
        }
        db["Persona"].insert_one(new_user)
        return new_user

    # def update_user(self, correo: str, **kwargs):
    #     self.db["usuarios"].update_one({"correo": correo}, {"$set": kwargs})
    #     return self.get_user_by_email(correo)
