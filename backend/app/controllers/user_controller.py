from fastapi import APIRouter, HTTPException, Depends
from app.models.user_model import (
    GoogleUserCreate,
    UserCreate,
    UserLogin,
    UserResponse,
)
from app.services.user_service import UserService

router = APIRouter()


@router.post("/register", response_model=UserResponse)
async def register(user: UserCreate, user_service: UserService = Depends()):
    existing_user = user_service.get_user_by_email(user.correo)
    if existing_user:
        raise HTTPException(status_code=400, detail="Correo ya registrado")
    new_user = user_service.create_user(user)
    return new_user


@router.post("/login", response_model=UserResponse)
async def login(user: UserLogin, user_service: UserService = Depends()):
    user_data = user_service.authenticate_user(user)
    if not user_data:
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")
    return user_data


@router.post("/auth/google", response_model=UserResponse)
def google_auth(
    google_user: GoogleUserCreate,
    user_service: UserService = Depends()
):
    try:
        """Endpoint simplificado que recibe datos ya validados por NextAuth"""
        # Buscar usuario existente
        print("Datos recibidos en el backend:", google_user.dict())
        usuario = user_service.get_user_by_email(google_user.correo)
        print("Usuario encontrado:", usuario)

        if not usuario:
            # Crear nuevo usuario
            usuario = user_service.create_user_google(google_user)
        # else:
        #     # Actualizar datos si el usuario ya existía
        #     usuario = user_service.update_user(
        #         correo=google_user.correo,
        #         nombre=google_user.nombre,
        #         apellido=google_user.apellido,
        #         imagen=google_user.imagen
        #     )

        return usuario
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
