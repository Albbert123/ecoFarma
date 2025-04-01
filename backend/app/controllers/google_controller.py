from fastapi import APIRouter, Request, Depends
from app.services.google_service import (
    get_google_auth_redirect,
    handle_google_callback,
)
from app.services.user_service import UserService

router = APIRouter()


@router.get("/login")
async def google_login(request: Request):
    return await get_google_auth_redirect(request)


@router.get("/callback")
async def google_callback(
    request: Request, user_service: UserService = Depends()
):
    return await handle_google_callback(request, user_service)
