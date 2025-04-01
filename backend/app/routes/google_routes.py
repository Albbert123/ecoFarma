from fastapi import APIRouter
from app.controllers.google_controller import router as google_router

api_router = APIRouter()
api_router.include_router(google_router, prefix="/auth/google", tags=["auth"])
