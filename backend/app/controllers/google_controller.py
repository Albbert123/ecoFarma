from urllib.parse import urlencode
from bson import ObjectId
from dotenv import load_dotenv
from fastapi import APIRouter, Request, Depends
from fastapi.responses import RedirectResponse
from authlib.integrations.starlette_client import OAuth
# from app.services.google_service import get_google_user_data
from app.services.user_service import UserService
from app.models.user_model import UserCreate
from app.auth.jwt_handler import create_access_token
import os
from jose import jwt

load_dotenv()

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
REDIRECT_URI = os.getenv("REDIRECT_URI")

router = APIRouter()
oauth = OAuth()
oauth.register(
    name="google",
    client_id=GOOGLE_CLIENT_ID,
    client_secret=GOOGLE_CLIENT_SECRET,
    authorize_url="https://accounts.google.com/o/oauth2/auth",
    authorize_params={"scope": "openid email profile"},
    access_token_url="https://oauth2.googleapis.com/token",
    userinfo_endpoint="https://www.googleapis.com/oauth2/v3/userinfo",
    jwks_uri="https://www.googleapis.com/oauth2/v3/certs",  # <-- AGREGA ESTO
    server_metadata_url=(
        "https://accounts.google.com/.well-known/openid-configuration"
    ),
    client_kwargs={"scope": "openid email profile"},
)


@router.get("/login")
async def google_login(request: Request):
    """Redirige al usuario a Google para autenticarse."""
    return await oauth.google.authorize_redirect(request, REDIRECT_URI)


@router.get("/callback")
async def google_callback(
    request: Request, user_service: UserService = Depends()
):
    """Maneja la respuesta de Google y registra/inicia sesión al usuario."""
    token = await oauth.google.authorize_access_token(request)
    # print(token)
    # Verificar si el token contiene el id_token
    id_token = token.get("id_token")
    if not id_token:
        raise ValueError("El token devuelto por Google no contiene un id.")

    # Decodificar el id_token para obtener los datos del usuario
    google_user = jwt.decode(
        id_token,
        key=None,  # La clave pública será obtenida automáticamente
        options={"verify_signature": False},  # Desactiva
        audience=GOOGLE_CLIENT_ID,
        access_token=token.get("access_token"),
    )

    nombre = google_user.get("given_name", "")
    apellido = google_user.get("family_name", "")
    correo = google_user.get("email", "")
    imagen = google_user.get("picture", "")

    existing_user = user_service.get_user_by_email(correo)

    if existing_user:
        # Convertir ObjectId a cadena si existe
        if isinstance(existing_user["_id"], ObjectId):
            existing_user["_id"] = str(existing_user["_id"])
        jwt_token = create_access_token(existing_user)
        user_data = {
            "token": jwt_token,
            "rol": existing_user["rol"],
            "correo": existing_user["correo"],
            "imagen": existing_user.get("imagen", ""),
            "nombre": existing_user["nombre"],
            "apellido": existing_user["apellido"],
            "fromGoogle": "true" if existing_user["fromGoogle"] else "false",

        }
    else:
        new_user = user_service.create_user(UserCreate(
            nombre=nombre,
            apellido=apellido,
            correo=correo,
            contraseña="google_auth",
            rol="usuario",
            imagen=imagen,
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
        }

    redirect_url = f"http://localhost:3000/login?{urlencode(user_data)}"
    return RedirectResponse(url=redirect_url)
