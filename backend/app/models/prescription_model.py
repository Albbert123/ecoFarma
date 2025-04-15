from typing import List, Optional
from pydantic import BaseModel


class ProductPrescription(BaseModel):
    name: str
    price: float


class Prescription(BaseModel):
    id: str
    user: str
    type: str
    status: str
    validFrom: str
    validTo: str
    doctor: str
    discount: Optional[float] = None
    products: Optional[List[ProductPrescription]] = None
