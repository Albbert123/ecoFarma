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
    composition: Optional[str] = None
    AdditionalInfo: Optional[str] = None
    embedding: Optional[List[float]] = None

    class Config:
        extra = "ignore"  # Ignorar campos adicionales


class SearchData(BaseModel):
    searchTerm: str
    date: str
    user: str
    embedding: Optional[List[float]] = None


class Rating(BaseModel):
    value: int
    type: str
    date: str
