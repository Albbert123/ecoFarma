from typing import List
from fastapi import APIRouter, Depends, HTTPException
from datetime import datetime
from app.models.order_model import Order, OrderStatusUpdate
from app.services.order_service import OrderService

router = APIRouter()


@router.post("/")
async def create_order(order: Order, order_service: OrderService = Depends()):
    order_service.create_order(order)
    return {"message": "Order created successfully"}


@router.get("/")
async def get_orders(order_service: OrderService = Depends()):
    orders = order_service.get_orders()
    return orders


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

    order_service.send_email_confirmation_user(order)
    order_service.send_email_confirmation_pharmacist(order)
    return {"message": "Order confirmed successfully"}


@router.get("/by-user-and-date", response_model=Order)
async def get_order_by_user_and_date(
    user: str,
    date: str,  # Debe ser un string ISO, ej. "2025-04-29T12:34:56.000Z"
    order_service: OrderService = Depends()
):
    order = order_service.get_order_by_user_and_date(user, date)
    if not order:
        raise HTTPException(status_code=404, detail="Encargo no encontrado")
    return order


@router.get("/id/{order_id}", response_model=Order)
async def get_order_by_id(
    order_id: str, order_service: OrderService = Depends()
):
    order = order_service.get_order_by_id(order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Encargo no encontrado")
    return order


@router.get("/{user}", response_model=List[Order])
async def get_orders_by_user(
    user: str, order_service: OrderService = Depends()
):
    orders = order_service.get_orders_by_user(user)
    return orders


@router.put("/{order_id}", response_model=Order)
async def update_order_status(
    order_id: str,
    status_update: OrderStatusUpdate,
    order_service: OrderService = Depends()
):
    order = order_service.update_order_status(order_id, status_update.status)
    if not order:
        raise HTTPException(status_code=404, detail="Encargo no encontrado")
    return order


@router.delete("/{order_id}")
async def delete_order(
    order_id: str, order_service: OrderService = Depends()
):
    order_service.delete_order(order_id)
    return {"message": "Order deleted successfully"}
