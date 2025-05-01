from typing import List, Optional
from pydantic import BaseModel
# from app.models.product_model import Product


class CartItem(BaseModel):
    nregistro: str
    name: str
    price: Optional[float] = None
    image: Optional[str] = None
    stock: Optional[int] = None
    quantity: int


class Order (BaseModel):
    id: Optional[str] = None
    user: str
    products: Optional[List[CartItem]] = None
    pickupDate: str
    date: str
    paymentMethod: str
    total: float
    status: str
    address: str
    pharmacist: str
    note: Optional[str] = None
    promoCode: Optional[str] = None
