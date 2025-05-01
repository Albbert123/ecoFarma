from typing import List
from fastapi import APIRouter, Depends
from datetime import datetime
from app.models.order_model import Order
from app.services.order_service import OrderService

router = APIRouter()


@router.post("/")
async def create_order(order: Order, order_service: OrderService = Depends()):
    print(order)
    order_service.create_order(order)
    return {"message": "Order created successfully"}


@router.post("/confirmation")
async def order_confirmation(
    order: Order, order_service: OrderService = Depends()
):
    # Convertir las fechas al formato día/mes/año
    order.date = datetime.fromisoformat(
        order.date.replace("Z", "")
    ).strftime("%d/%m/%Y")
    order.pickupDate = datetime.fromisoformat(
        order.pickupDate.replace("Z", "")
    ).strftime("%d/%m/%Y")

    order_service.send_email_confirmation(order)
    return {"message": "Order confirmed successfully"}


@router.get("/{user}", response_model=List[Order])
async def get_orders_by_user(
    user: str, order_service: OrderService = Depends()
):
    orders = order_service.get_orders_by_user(user)
    return orders
