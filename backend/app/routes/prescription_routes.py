from fastapi import APIRouter
from app.controllers.prescription_controller import (
    router as prescription_router,
)

api_router = APIRouter()
api_router.include_router(
    prescription_router,
    prefix="/prescriptions",
    tags=["prescriptions"],
)
