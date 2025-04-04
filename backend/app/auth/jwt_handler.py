from datetime import datetime, timedelta, timezone
from jose import JWTError, jwt
import os
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60  # 1 hora


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (
        expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def verify_token(token: str, allow_expired: bool = False):
    try:
        options = {"verify_exp": not allow_expired}
        payload = jwt.decode(
            token, SECRET_KEY, algorithms=[ALGORITHM], options=options
        )
        return payload  # Devuelve los datos del usuario
    except JWTError:
        return None  # Token inválido


def refresh_token(token: str):
    """Renueva un token de acceso si es válido."""
    payload = verify_token(token, allow_expired=True)

    if not payload:
        return None  # Token completamente inválido

    new_payload = {
        "correo": payload["correo"],
        "rol": payload["rol"],
        "imagen": payload.get("imagen"),
        "nombre": payload.get("nombre"),
        "apellido": payload.get("apellido"),
        "fromGoogle": payload.get("fromGoogle"),
    }

    return create_access_token(
        new_payload, expires_delta=timedelta(minutes=30)
    )
