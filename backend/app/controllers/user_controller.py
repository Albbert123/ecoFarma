from typing import List
from fastapi import APIRouter, Body, HTTPException, Depends, Request
from app.models.user_model import (
    UserCreate,
    UserLogin,
    UserResetPassword,
    UserResponse,
    UserUpdate,
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


@router.delete("/delete")
async def delete_user(
    correo: str = Body(..., embed=True),
    user_service: UserService = Depends()
):
    return user_service.delete_user(correo)


@router.put("/update")
async def update_user(user: UserUpdate, user_service: UserService = Depends()):
    # Obtener el usuario ORIGINAL por su correo actual
    existing_user = user_service.get_user_by_email(user.correo)

    if not existing_user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    # Si intenta cambiar su correo a uno ya existente en otro usuario
    if user.new_correo != existing_user["correo"]:
        another_user = user_service.get_user_by_email(user.new_correo)
        if another_user:
            raise HTTPException(
                status_code=400,
                detail="Correo ya registrado por otro usuario"
            )

    # Realizar la actualización
    updated_user = user_service.update_user(user)

    return updated_user


@router.post("/send-reset-code")
async def send_reset_code(
    correo: str = Body(..., embed=True),
    user_service: UserService = Depends()
):
    print(correo)
    # Obtener el usuario ORIGINAL por su correo actual
    existing_user = user_service.get_user_by_email(correo)

    if not existing_user:
        raise HTTPException(status_code=404, detail="Correo no encontrado")
    return user_service.send_reset_code(correo)


@router.post("/reset-password")
async def update_password(
    user: UserResetPassword, user_service: UserService = Depends()
):
    # Realizar la actualización
    updated_user = user_service.reset_password(user)
    return updated_user


@router.get("/user", response_model=UserResponse)
async def get_user(
    correo: str = Body(..., embed=True),
    user_service: UserService = Depends()
):
    return user_service.get_user_by_email(correo)


@router.get("/all", response_model=List[UserResponse])
async def get_users(user_service: UserService = Depends()):
    return user_service.get_users()


@router.post("/refresh-token")
async def refresh_token_endpoint(
    request: Request, user_service: UserService = Depends()
):
    token = request.headers.get("Authorization")
    if not token or not token.startswith("Bearer "):
        raise HTTPException(
            status_code=401, detail="Token no proporcionado o inválido"
        )

    token = token.split("Bearer ")[1]  # Extraer solo el token
    new_token = user_service.refresh_user_token(token)

    if not new_token:
        raise HTTPException(
            status_code=401, detail="Token inválido o expirado"
        )

    return {"access_token": new_token}
