import random
import bcrypt
from datetime import timedelta
from jose import JWTError

from fastapi import HTTPException
from app.repositories.user_repository import UserRepository
from app.models.user_model import (
    UserCreate,
    UserLogin,
    UserResetPassword,
    UserResponse,
    UserUpdate,
)
from app.auth.jwt_handler import create_access_token, verify_token
from app.services.email_service import send_email
from app.auth.jwt_handler import refresh_token


class UserService:
    def __init__(self):
        self.user_repo = UserRepository()

    def get_user_by_email(self, correo: str):
        return self.user_repo.get_user_by_email(correo)

    def get_users(self):
        return self.user_repo.get_users()

    def create_user(self, user: UserCreate):
        hashed_password = bcrypt.hashpw(
            user.contraseña.encode('utf-8'), bcrypt.gensalt()
        ).decode('utf-8')
        new_user = self.user_repo.create_user(user.dict(), hashed_password)

        token = None

        if not user.fromAdmin:
            # Generar el token después del registro
            token = create_access_token(
                data={"correo": new_user["correo"], "rol": new_user["rol"]},
                expires_delta=timedelta(minutes=30)
            )

        return UserResponse(**new_user, token=token)

    def authenticate_user(self, user: UserLogin):
        userDB = self.user_repo.get_user_by_email(user.correo)
        if not userDB or not bcrypt.checkpw(
            user.contraseña.encode("utf-8"),
            userDB["contraseña"].encode("utf-8")
        ):
            return None

        if userDB["fromGoogle"]:
            raise HTTPException(
                status_code=400,
                detail="Inicie sesión con Google"
            )

        # Generar token
        token = create_access_token(
            data={"correo": userDB["correo"], "rol": userDB["rol"]},
            expires_delta=timedelta(minutes=30)
        )

        return UserResponse(**userDB, token=token)

    def delete_user(self, correo: str):
        result = self.user_repo.delete_user(correo)
        if result.deleted_count == 0:
            raise HTTPException(
                status_code=404, detail="Usuario no encontrado"
            )
        return {"message": "Usuario eliminado correctamente"}

    def update_user(self, user: UserUpdate):
        updated_user = self.user_repo.update_user(user)
        return UserResponse(**updated_user)

    def send_reset_code(self, correo: str):
        try:
            # Generar código aleatorio de 6 dígitos
            reset_code = str(random.randint(100000, 999999))
            # Crear un token JWT con el código y tiempo de expiración
            token = create_access_token(
                data={"correo": correo, "code": reset_code},
                expires_delta=timedelta(minutes=10)
            )

            # 3. Preparar contenido del correo
            subject = "Código de verificación para restablecer tu contraseña"
            html_content = f"""
            <html>
                <body>
                    <h2>Restablecimiento de contraseña</h2>
                    <p>Tu código de verificación es:
                    <strong>{reset_code}</strong></p>
                    <p>Este código expirará en 10 minutos.</p>
                    <p>Si no solicitaste este cambio, ignora este correo.</p>
                </body>
            </html>
            """

            # 4. Enviar el correo
            status_code = send_email(
                to_email=correo,
                subject=subject,
                content=html_content
            )

            if status_code != 202:
                raise HTTPException(
                    status_code=500,
                    detail="El correo no pudo ser enviado"
                )

            # 5. Retornar solo el token (el código va por email)
            return {"token": token}

        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Error en el proceso de recuperación: {str(e)}"
            )

    def reset_password(self, user: UserResetPassword):
        try:
            # 1️⃣ Decodificar el token y verificar la expiración
            payload = verify_token(user.token)
            correo = payload["correo"]
            valid_code = payload["code"]

            # 2️⃣ Comprobar si el código ingresado coincide con el del token
            if user.code != valid_code:
                raise HTTPException(
                    status_code=400,
                    detail="Código incorrecto o expirado"
                )

            # 3️⃣ Hashear la nueva contraseña antes de guardarla
            hashed_password = bcrypt.hashpw(
                user.new_contraseña.encode('utf-8'), bcrypt.gensalt()
            ).decode('utf-8')

            # 4️⃣ Actualizar la contraseña en la base de datos
            self.user_repo.update_password_only(correo, hashed_password)

            return {"message": "Contraseña restablecida con éxito"}

        except JWTError:
            raise HTTPException(status_code=400, detail="Token invalido")

    def refresh_user_token(self, token: str):
        """Renueva el token del usuario."""
        new_token = refresh_token(token)
        if not new_token:
            return None

        return new_token
