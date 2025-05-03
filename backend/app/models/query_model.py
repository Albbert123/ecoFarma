from typing import Optional
from pydantic import BaseModel


class Query(BaseModel):
    id: str
    user: str
    pharmacist: str
    date: str
    subject: str
    question: str
    answer: Optional[str] = None
    status: str
