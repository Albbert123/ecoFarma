from typing import Optional
from pydantic import BaseModel


class UserCreate(BaseModel):
    correo: str
    nombre: str
    apellido: str
    contraseña: str
    imagen: str
    rol: str


class UserResponse(BaseModel):
    correo: str
    nombre: str
    apellido: str
    imagen: str
    rol: str
    token: Optional[str] = None


class UserLogin(BaseModel):
    correo: str
    contraseña: str
