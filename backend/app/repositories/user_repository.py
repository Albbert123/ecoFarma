from pymongo import ReturnDocument
from app.config.database import db
from app.models.user_model import UserCreate, UserUpdate


class UserRepository:
    def get_user_by_email(self, correo: str):
        return db["Persona"].find_one({"correo": correo})

    def get_users(self):
        return list(db["Persona"].find({}, {"_id": 0, "contraseña": 0}))

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

    def delete_user(self, correo: str):
        return db["Persona"].delete_one({"correo": correo})

    def update_user(self, user_data: UserUpdate):
        updated_user = db["Persona"].find_one_and_update(
            {"correo": user_data.correo},  # Buscar por correo
            {"$set": user_data.dict()},  # Actualizar los campos recibidos
            return_document=ReturnDocument.AFTER  # Retorna el documento
        )

        if not updated_user:
            raise ValueError("Usuario no encontrado")

        return updated_user
