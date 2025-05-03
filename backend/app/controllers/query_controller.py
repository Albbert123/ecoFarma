from fastapi import APIRouter
from app.models.query_model import Query

router = APIRouter()


@router.get("/{user}", response_model=Query)
async def get_query_history(user: str):
    """
    Obtener el historial de consultas de un usuario específico.
    """
    # Aquí iría la lógica para obtener el historial de consultas
    # del usuario desde la base de datos o cualquier otro almacenamiento.
    return {"user": user, "queries": []}
