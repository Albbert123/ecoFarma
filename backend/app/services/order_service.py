from fastapi import HTTPException
from app.repositories.order_repository import OrderRepository
from app.models.order_model import Order
from datetime import datetime
from app.services.email_service import send_email


class OrderService:
    def __init__(self):
        self.order_repo = OrderRepository()

    def create_order(self, order_data: Order):
        order = self.order_repo.create_order(order_data)
        if not order:
            raise HTTPException(
                status_code=400,
                detail="Error al crear el encargo"
            )

        # # Update product stock
        # for item in order_data['items']:
        #     self.product_service.update_stock(
        #         item['product_id'], -item['quantity']
        #     )

        return order

    def get_orders(self):
        orders = self.order_repo.get_orders()
        if not orders:
            raise HTTPException(
                status_code=404,
                detail="No hay encargos disponibles"
            )
        return orders

    def get_order_by_id(self, order_id: str):
        order = self.order_repo.get_order_by_id(order_id)
        if not order:
            raise HTTPException(
                status_code=404,
                detail="El encargo no existe"
            )
        return order

    def get_order_by_user_and_date(self, user: str, date: str):
        order = self.order_repo.get_order_by_user_and_date(user, date)
        if not order:
            raise HTTPException(
                status_code=404,
                detail="El encargo no existe"
            )
        return order

    def get_orders_by_user(self, user: str):
        orders = self.order_repo.get_orders_by_user(user)
        return orders

    def send_email_confirmation_user(self, order: Order):
        subject = "Confirmación de tu encargo en ecoFarma"

        # Formatear productos en tabla HTML
        product_rows = ""
        for item in order.products:
            product_rows += f"""
                <tr>
                    <td>{item.name}</td>
                    <td>{item.nregistro}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price or '—'} €</td>
                </tr>
            """

        html_content = f"""
        <html>
            <body>
                <h2>¡Gracias por tu encargo en ecoFarma!</h2>
                <p>Te confirmamos que hemos recibido tu pedido. Aquí tienes los detalles:</p>

                <h3>Información del encargo</h3>
                <ul>
                    <li><strong>Número de encargo:</strong> {order.id}</li>
                    <li><strong>Correo del usuario:</strong> {order.user}</li>
                    <li><strong>Fecha de realización:</strong> {order.date}</li>
                    <li><strong>Fecha de recogida:</strong> {order.pickupDate}</li>
                    <li><strong>Método de pago:</strong> {order.paymentMethod}</li>
                    <li><strong>Dirección de entrega:</strong> {order.address}</li>
                    <li><strong>Estado actual:</strong> {order.status}</li>
                    {"<li><strong>Nota:</strong> " + order.note + "</li>" if order.note else ""}
                    {"<li><strong>Código promocional:</strong> " + order.promoCode + "</li>" if order.promoCode else ""}
                </ul>

                <h3>Productos encargados</h3>
                <table border="1" cellpadding="8" cellspacing="0">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>N. Registro</th>
                            <th>Cantidad</th>
                            <th>Precio (unidad)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {product_rows}
                    </tbody>
                </table>

                <p><strong>Total del encargo:</strong> {order.total:.2f} €</p>

                <br/>
                <p>Revisa tu área personal para consultar el estado de tu encargo en cualquier momento.</p>
                <p>Gracias por confiar en ecoFarma.</p>
            </body>
        </html>
        """

        status_code = send_email(
            to_email=order.user,
            subject=subject,
            content=html_content
        )

        if status_code != 200:
            raise HTTPException(
                status_code=500,
                detail="El correo no pudo ser enviado"
            )

        return status_code

    def send_email_confirmation_pharmacist(self, order: Order):
        subject = "Nuevo encargo en ecoFarma"
        html_content = f"""
        <html>
            <body>
                <h2>¡Hola!</h2>
                <p>Te informamos que tienes un nuevo encargo en ecoFarma que manejar.</p>
                <h3>Detalles del encargo</h3>
                <ul>
                    <li><strong>Número de encargo:</strong> {order.id}</li>
                    <li><strong>Correo del usuario:</strong> {order.user}</li>
                    <li><strong>Fecha de realización:</strong> {order.date}</li>
                    <li><strong>Fecha de recogida:</strong> {order.pickupDate}</li>
                    <li><strong>Método de pago:</strong> {order.paymentMethod}</li>
                    <li><strong>Dirección de entrega:</strong> {order.address}</li>
                    <li><strong>Estado actual:</strong> {order.status}</li>
                    {"<li><strong>Nota:</strong> " + order.note + "</li>" if order.note else ""}
                    {"<li><strong>Código promocional:</strong> " + order.promoCode + "</li>" if order.promoCode else ""}
                </ul>
                <p>Gracias por confiar en ecoFarma.</p>
            </body>
        </html>
        """
        status_code = send_email(
            to_email=order.pharmacist,
            subject=subject,
            content=html_content
        )
        if status_code != 200:
            raise HTTPException(
                status_code=500,
                detail="El correo no pudo ser enviado"
            )
        return status_code

    def send_email_change_status(self, order: Order):
        subject = "Cambio de estado de tu encargo en ecoFarma"
        html_content = f"""
        <html>
            <body>
                <h2>¡Hola!</h2>
                <p>Te informamos que el estado de tu encargo ha cambiado.</p>

                <h3>Detalles del encargo</h3>
                <ul>
                    <li><strong>Número de encargo:</strong> {order.id}</li>
                    <li><strong>Correo del usuario:</strong> {order.user}</li>
                    <li><strong>Estado actual:</strong> {order.status}</li>
                </ul>

                <p>Gracias por confiar en ecoFarma.</p>
            </body>
        </html>
        """
        status_code = send_email(
            to_email=order.user,
            subject=subject,
            content=html_content
        )
        if status_code != 200:
            raise HTTPException(
                status_code=500,
                detail="El correo no pudo ser enviado"
            )
        return status_code

    def update_order_status(self, order_id: str, status: str):
        order = self.order_repo.update_order_status(order_id, status)
        if not order:
            raise HTTPException(
                status_code=404,
                detail="El encargo no existe"
            )
        order.date = datetime.fromisoformat(
            order.date.replace("Z", "")
        ).strftime("%d/%m/%Y")
        order.pickupDate = datetime.fromisoformat(
            order.pickupDate.replace("Z", "")
        ).strftime("%d/%m/%Y")

        self.send_email_change_status(order)
        return order

    def delete_order(self, order_id: str):
        order = self.order_repo.delete_order(order_id)
        if not order:
            raise HTTPException(
                status_code=404,
                detail="El encargo no existe"
            )
        return order
