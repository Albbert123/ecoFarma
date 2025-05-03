from app.constants.query_constants import QUERY_DB
from app.models.query_model import Query


class QueryRepository:
    def get_queries_by_user(self, user: str):
        queries = QUERY_DB.find({"user": user})
        result = []
        for query in queries:
            query["id"] = str(query.pop("_id"))
            result.append(Query(**query))
        return result

    def add_query(self, query: Query):
        query_dict = query.dict()
        # Eliminar campo 'id' si viene del frontend o del modelo
        query_dict.pop("id", None)
        # Insertar en MongoDB (esto genera automáticamente un _id)
        result = QUERY_DB.insert_one(query_dict)
        # Devolver el mismo query_dict, pero con el _id de MongoDB
        query_dict["_id"] = str(result.inserted_id)
        return query_dict
