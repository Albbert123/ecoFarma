from pydantic import BaseModel


class UserCreate(BaseModel):
    correo: str
    nombre: str
    apellido: str
    contraseña: str
    rol: str


class UserResponse(BaseModel):
    correo: str
    nombre: str
    apellido: str
    rol: str
