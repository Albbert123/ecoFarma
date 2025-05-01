from bson import ObjectId
from app.constants.order_constants import ORDER_DB
from app.models.order_model import Order


class OrderRepository:
    def create_order(self, order_data: Order):
        order_dict = order_data.dict()

        # Eliminar campo 'id' si viene del frontend o del modelo
        order_dict.pop("id", None)

        # Insertar en MongoDB (esto genera automáticamente un _id)
        result = ORDER_DB.insert_one(order_dict)

        # Devolver el mismo order_dict, pero con el _id de MongoDB
        order_dict["_id"] = str(result.inserted_id)
        return order_dict

    def get_order_by_id(self, order_id):
        try:
            order = ORDER_DB.find_one({"_id": ObjectId(order_id)})
        except Exception:
            return None  # ID inválido

        if order:
            order["id"] = str(order.pop("_id"))
            return Order(**order)
        return None

    def get_orders_by_user(self, user: str):
        orders = ORDER_DB.find({"user": user})
        result = []
        for order in orders:
            order["id"] = str(order.pop("_id"))
            result.append(Order(**order))
        return result

    def get_order_by_user_and_date(self, user: str, date: str):
        order = ORDER_DB.find_one({"user": user, "date": date})
        if order:
            order["id"] = str(order.pop("_id"))
            return Order(**order)
        return None

    def update_order(self, order_id, order_data):
        # Logic to update an order in the database
        pass

    def delete_order(self, order_id):
        # Logic to delete an order from the database
        pass
