from fastapi import APIRouter
from app.controllers.query_controller import router as query_router

api_router = APIRouter()
api_router.include_router(
    query_router,
    prefix="/queries",
    tags=["queries"]
)
