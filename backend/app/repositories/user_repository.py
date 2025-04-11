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
            "correo": user["correo"],
            "nombre": user["nombre"],
            "apellido": user["apellido"],
            "rol": user["rol"],
            "imagen": user["imagen"],
            "fromGoogle": user["fromGoogle"],
            "contraseña": hashed_password,
        }
        db["Persona"].insert_one(new_user)
        return new_user

    def delete_user(self, correo: str):
        return db["Persona"].delete_one({"correo": correo})

    def update_user(self, user_data: UserUpdate):
        # Preparar los datos para la actualización
        update_fields = user_data.dict()

        # Si `new_correo` tiene un valor, sobrescribir `correo`
        # con `new_correo`
        if "new_correo" in update_fields and update_fields["new_correo"]:
            update_fields["correo"] = update_fields.pop("new_correo")

        # Actualizar el usuario en la base de datos
        updated_user = db["Persona"].find_one_and_update(
            {"correo": user_data.correo},  # Buscar por el correo original
            {"$set": update_fields},  # Actualizar los campos
            return_document=ReturnDocument.AFTER
            # Retorna el documento actualizado
        )

        if not updated_user:
            raise ValueError("Usuario no encontrado")

        return updated_user

    def update_password_only(self, correo: str, new_password: str):
        updated_user = db["Persona"].find_one_and_update(
            {"correo": correo},
            {"$set": {"contraseña": new_password}},
            return_document=ReturnDocument.AFTER
        )

        if not updated_user:
            raise ValueError("Usuario no encontrado")

        return updated_user
