from app.repositories.order_repository import OrderRepository


class OrderService:
    def __init__(self):
        self.order_repository = OrderRepository()

    def create_order(self, order_data):
        # Validate order data
        if not self.validate_order_data(order_data):
            raise ValueError("Invalid order data")

        # Create the order in the repository
        order = self.order_repository.create(order_data)

        # Update product stock
        for item in order_data['items']:
            self.product_service.update_stock(
                item['product_id'], -item['quantity']
            )

        return order
