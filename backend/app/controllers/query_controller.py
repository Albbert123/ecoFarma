from typing import List
from fastapi import APIRouter, Depends, HTTPException
from app.models.query_model import Query, QueryUpdate
from app.services.query_service import QueryService

router = APIRouter()


@router.get("/", response_model=List[Query])
async def get_all_queries(query_service: QueryService = Depends()):
    queries = query_service.get_queries()
    return queries


@router.post("/", response_model=Query)
async def add_query(query: Query, query_service: QueryService = Depends()):
    queryDB = query_service.add_query(query)
    return queryDB


@router.get("/{user}", response_model=List[Query])
async def get_queries_by_user(
    user: str, query_service: QueryService = Depends()
):
    query = query_service.get_queries_by_user(user)
    return query


@router.put("/{query_id}", response_model=Query)
async def update_query(
    query_id: str,
    update: QueryUpdate,
    query_service: QueryService = Depends()
):
    query = query_service.update_query_status(
        query_id, update.answer, update.status
    )
    if not query:
        raise HTTPException(status_code=404, detail="Consulta no encontrada")
    return query
