def get_mock_orders():
    return [
        {
            "id": "1",
            "user": "test_user",
            "products": [],
            "pickupDate": "2023-04-01",
            "date": "2023-03-31",
            "paymentMethod": "store",
            "total": 100.0,
            "status": "Pendiente",
            "address": "Calle Falsa 123",
            "pharmacist": "farma@gmail.com",
        },
        {
            "id": "2",
            "user": "another_user",
            "products": [],
            "pickupDate": "2023-04-02",
            "date": "2023-03-30",
            "paymentMethod": "online",
            "total": 200.0,
            "status": "Entregado",
            "address": "Calle Verdadera 456",
            "pharmacist": "farma2@gmail.com",
        },
    ]


def get_mock_order():
    return {
        "id": "1",
        "user": "test_user",
        "products": [],
        "pickupDate": "2023-04-01",
        "date": "2023-03-31",
        "paymentMethod": "store",
        "total": 100.0,
        "status": "Pendiente",
        "address": "Calle Falsa 123",
        "pharmacist": "farma@gmail.com",
    }


class MockOrder:
    """Clase para simular un objeto de encargo con atributos."""
    def __init__(self, id, user, products, pickupDate, date, paymentMethod, total, status, address, pharmacist):
        self.id = id
        self.user = user
        self.products = products
        self.pickupDate = pickupDate
        self.date = date
        self.paymentMethod = paymentMethod
        self.total = total
        self.status = status
        self.address = address
        self.pharmacist = pharmacist


def get_mock_order_as_object():
    """Devuelve un encargo simulado como un objeto con atributos."""
    return MockOrder(
        id="1",
        user="test_user",
        products=[],
        pickupDate="2023-04-01T00:00:00Z",
        date="2023-03-31T00:00:00Z",
        paymentMethod="store",
        total=100.0,
        status="Pendiente",
        address="Calle Falsa 123",
        pharmacist="farma@gmail.com",
    )
