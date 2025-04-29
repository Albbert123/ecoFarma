from app.repositories.order_repository import OrderRepository
from app.models.order_model import Order


class OrderService:
    def __init__(self):
        self.order_repo = OrderRepository()

    def create_order(self, order_data: Order):
        order = self.order_repo.create_order(order_data)

        # # Update product stock
        # for item in order_data['items']:
        #     self.product_service.update_stock(
        #         item['product_id'], -item['quantity']
        #     )

        return order
