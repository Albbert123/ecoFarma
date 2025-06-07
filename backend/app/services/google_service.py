from datetime import timedelta
from urllib.parse import urlencode
from bson import ObjectId
from dotenv import load_dotenv
from fastapi import Request
from fastapi.responses import RedirectResponse
from authlib.integrations.starlette_client import OAuth
from jose import jwt
from app.services.user_service import UserService
from app.models.user_model import UserCreate
from app.auth.jwt_handler import create_access_token
import os

load_dotenv()

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
REDIRECT_URI = os.getenv("REDIRECT_URI")
TOKEN_URL = os.getenv("TOKEN_URL")
USER_INFO_URL = os.getenv("USER_INFO_URL")
AUTHORIZATION_URL = os.getenv("AUTHORIZATION_URL")
JWKS_URI = os.getenv("JWKS_URI")
METADATA_URL = os.getenv("METADATA_URL")
FRONT_URL = os.getenv("FRONT_URL")

oauth = OAuth()
oauth.register(
    name="google",
    client_id=GOOGLE_CLIENT_ID,
    client_secret=GOOGLE_CLIENT_SECRET,
    authorize_url=AUTHORIZATION_URL,
    authorize_params={"scope": "openid email profile"},
    access_token_url=TOKEN_URL,
    userinfo_endpoint=USER_INFO_URL,
    jwks_uri=JWKS_URI,
    server_metadata_url=(METADATA_URL),
    client_kwargs={"scope": "openid email profile"},
)


def get_google_auth_redirect(request: Request):
    """Genera la URL de redirección a Google para autenticación."""
    return_to = request.query_params.get("returnTo", "/")
    return oauth.google.authorize_redirect(
        request, REDIRECT_URI, state=return_to
    )


async def handle_google_callback(request: Request, user_service: UserService):
    """Procesa la respuesta de Google y maneja el login o registro."""
    token = await oauth.google.authorize_access_token(request)
    id_token = token.get("id_token")
    if not id_token:
        raise ValueError("El token devuelto por Google no contiene un id.")

    return_to = request.query_params.get("state", "/")

    google_user = jwt.decode(
        id_token,
        key=None,
        options={"verify_signature": False},
        audience=GOOGLE_CLIENT_ID,
        access_token=token.get("access_token"),
    )

    nombre = google_user.get("given_name", "")
    apellido = google_user.get("family_name", "")
    correo = google_user.get("email", "")
    imagen = google_user.get("picture", "")

    existing_user = user_service.get_user_by_email(correo)

    if existing_user:
        if isinstance(existing_user["_id"], ObjectId):
            existing_user["_id"] = str(existing_user["_id"])
        jwt_token = create_access_token(
            existing_user, expires_delta=timedelta(minutes=30)
        )
        user_data = {
            "token": jwt_token,
            "rol": existing_user["rol"],
            "correo": existing_user["correo"],
            "imagen": existing_user.get("imagen", ""),
            "nombre": existing_user["nombre"],
            "apellido": existing_user["apellido"],
            "fromGoogle": (
                "true" if existing_user.get("fromGoogle", False) else "false"
            ),
            "newsletter": (
                "true" if existing_user.get("newsletter", False) else "false"
            ),
            "returnTo": return_to,
        }
    else:
        new_user = user_service.create_user(UserCreate(
            nombre=nombre,
            apellido=apellido,
            correo=correo,
            contraseña="google_auth",
            rol="usuario",
            imagen=imagen,
            newsletter=False,
            fromAdmin=False,
            fromGoogle=True,
        ))
        user_data = {
            "token": new_user.token,
            "rol": new_user.rol,
            "correo": new_user.correo,
            "imagen": new_user.imagen,
            "nombre": new_user.nombre,
            "apellido": new_user.apellido,
            "fromGoogle": "true" if new_user.fromGoogle else "false",
            "newsletter": "true" if new_user.newsletter else "false",
            "returnTo": return_to,
        }

    redirect_url = f"{FRONT_URL}/login?{urlencode(user_data)}"
    return RedirectResponse(url=redirect_url)
