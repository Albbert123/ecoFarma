from fastapi import HTTPException
from app.repositories.query_repository import QueryRepository
from app.models.query_model import Query


class QueryService:
    def __init__(self):
        self.query_repo = QueryRepository()

    def get_queries_by_user(self, user: str):
        query = self.query_repo.get_queries_by_user(user)
        if not query:
            raise HTTPException(
                status_code=404, detail="Consulta no encontrada"
            )
        return query

    def add_query(self, query: Query):
        return self.query_repo.add_query(query)
