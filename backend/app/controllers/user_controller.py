from fastapi import APIRouter, Body, HTTPException, Depends
from app.models.user_model import UserCreate, UserLogin, UserResponse
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
