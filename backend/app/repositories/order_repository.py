from app.constants.order_constants import ORDER_DB


class OrderRepository:
    def create_order(self, order_data):
        # Logic to create an order in the database
        ORDER_DB.insert_one(order_data)
        pass

    def get_order(self, order_id):
        # Logic to retrieve an order from the database
        pass

    def update_order(self, order_id, order_data):
        # Logic to update an order in the database
        pass

    def delete_order(self, order_id):
        # Logic to delete an order from the database
        pass
