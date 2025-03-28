import bcrypt
from datetime import timedelta

from fastapi import HTTPException
from app.repositories.user_repository import UserRepository
from app.models.user_model import UserCreate, UserLogin, UserResponse
from app.auth.jwt_handler import create_access_token


class UserService:
    def __init__(self):
        self.user_repo = UserRepository()

    def get_user_by_email(self, correo: str):
        return self.user_repo.get_user_by_email(correo)

    def create_user(self, user: UserCreate):
        hashed_password = bcrypt.hashpw(
            user.contraseña.encode('utf-8'), bcrypt.gensalt()
        ).decode('utf-8')
        new_user = self.user_repo.create_user(user, hashed_password)

        # Generar el token después del registro
        token = create_access_token(
            data={"correo": new_user["correo"], "rol": new_user["rol"]},
            expires_delta=timedelta(minutes=60)
        )

        return UserResponse(**new_user, token=token)

    def authenticate_user(self, user: UserLogin):
        userDB = self.user_repo.get_user_by_email(user.correo)
        if not userDB or not bcrypt.checkpw(
            user.contraseña.encode("utf-8"),
            userDB["contraseña"].encode("utf-8")
        ):
            return None

        # Generar token
        token = create_access_token(
            data={"correo": userDB["correo"], "rol": userDB["rol"]},
            expires_delta=timedelta(minutes=60)
        )

        return UserResponse(**userDB, token=token)

    def delete_user(self, correo: str):
        result = self.user_repo.delete_user(correo)
        if result.deleted_count == 0:
            raise HTTPException(
                status_code=404, detail="Usuario no encontrado"
            )
        return {"message": "Usuario eliminado correctamente"}
