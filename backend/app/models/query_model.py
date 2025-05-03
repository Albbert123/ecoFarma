from typing import Optional
from pydantic import BaseModel


class Query(BaseModel):
    id: Optional[str] = None
    user: str
    pharmacist: str
    date: str
    subject: str
    question: str
    answer: Optional[str] = None
    status: str
