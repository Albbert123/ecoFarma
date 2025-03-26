from typing import Optional
from pydantic import BaseModel


class UserCreate(BaseModel):
    correo: str
    nombre: str
    apellido: str
    contraseña: str
    es_google: bool
    rol: str


class GoogleUserCreate(BaseModel):
    correo: str
    nombre: str
    apellido: Optional[str] = ""
    imagen: Optional[str] = ""
    es_google: bool
    rol: str


class UserResponse(BaseModel):
    correo: str
    nombre: str
    apellido: str
    rol: str
    token: str
    es_google: bool  # Indicamos si el usuario proviene de Google


class UserLogin(BaseModel):
    correo: str
    contraseña: str
