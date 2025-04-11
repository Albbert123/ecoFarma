from pydantic import BaseModel
from typing import Optional, List


class Product(BaseModel):
    nregistro: str
    name: str
    description: Optional[str] = None
    price: Optional[float] = None
    image: Optional[str] = None
    laboratory: Optional[str] = None
    category: Optional[str] = None
    stock: Optional[int] = None
    principleAct: Optional[str] = None
    dosis: Optional[str] = None
    prescription: Optional[bool] = None
    advertencias: Optional[str] = None
    contraindications: Optional[str] = None
    comoTomar: Optional[str] = None
    reacciones: Optional[str] = None
    posologia: Optional[str] = None
    conservacion: Optional[str] = None
    embedding: Optional[List[float]] = None
