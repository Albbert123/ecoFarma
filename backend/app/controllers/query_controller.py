from typing import List
from fastapi import APIRouter, Depends, HTTPException
from app.models.query_model import Query
from app.services.query_service import QueryService

router = APIRouter()


@router.get("/{user}", response_model=List[Query])
async def get_queries_by_user(
    user: str, query_service: QueryService = Depends()
):
    query = query_service.get_queries_by_user(user)
    if not query:
        raise HTTPException(status_code=404, detail="Consulta no encontrada")
    return query


@router.post("/", response_model=Query)
async def add_query(query: Query, query_service: QueryService = Depends()):
    queryDB = query_service.add_query(query)
    return queryDB
