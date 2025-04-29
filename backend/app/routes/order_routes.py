from fastapi import APIRouter
from app.controllers.product_controller import router as order_router

api_router = APIRouter()
api_router.include_router(
    order_router,
    prefix="/orders",
    tags=["orders"]
)
