from fastapi import APIRouter
from app.controllers.image_controller import router as image_router

api_router = APIRouter()
api_router.include_router(image_router, prefix="/images", tags=["images"])
