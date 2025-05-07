from typing import Optional
from pydantic import BaseModel


class UserCreate(BaseModel):
    correo: str
    nombre: str
    apellido: str
    contraseña: str
    imagen: str
    rol: str
    newsletter: bool
    fromAdmin: Optional[bool] = False
    fromGoogle: Optional[bool] = False


class UserUpdate(BaseModel):
    correo: str
    new_correo: Optional[str] = None
    nombre: str
    apellido: str
    imagen: str


class UserResetPassword(BaseModel):
    correo: str
    code: str
    new_contraseña: str
    token: str


class UserResponse(BaseModel):
    correo: str
    nombre: str
    apellido: str
    imagen: str
    rol: str
    newsletter: bool
    token: Optional[str] = None
    fromGoogle: Optional[bool] = False


class UserLogin(BaseModel):
    correo: str
    contraseña: str


class SubscribeNewsletterRequest(BaseModel):
    correo: str
