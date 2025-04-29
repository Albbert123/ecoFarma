from fastapi import APIRouter, Depends
from app.models.order_model import Order
from app.services.order_service import OrderService

router = APIRouter()


@router.post("/")
async def create_order(order: Order, order_service: OrderService = Depends()):
    print(order)
    order_service.create_order(order)
    return {"message": "Order created successfully"}
