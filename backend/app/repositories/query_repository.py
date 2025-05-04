from bson import ObjectId
from app.constants.query_constants import QUERY_DB
from app.models.query_model import Query


class QueryRepository:
    def get_queries(self):
        queries = QUERY_DB.find()
        result = []
        for query in queries:
            query["id"] = str(query.pop("_id"))
            result.append(Query(**query))
        return result

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

    def update_query_status(self, query_id: str, answer: str, status: str):
        try:
            # Construir el diccionario de actualización dinámicamente
            update_fields = {}
            if status:
                update_fields["status"] = status
            if answer:
                update_fields["answer"] = answer

            # Actualizar el estado y la respuesta de la consulta
            result = QUERY_DB.update_one(
                {"_id": ObjectId(query_id)},
                {"$set": update_fields}
            )
            if result.matched_count == 0:
                return None  # No se encontró la consulta

            updated_query = QUERY_DB.find_one({"_id": ObjectId(query_id)})
            if updated_query:
                updated_query["id"] = str(updated_query.pop("_id"))
                return Query(**updated_query)

        except Exception:
            return None
