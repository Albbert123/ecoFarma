def get_mock_prescription():
    return [
        {
            "id": "1",
            "user": "test_user",
            "type": "Electrónica",
            "status": "Activa",
            "validFrom": "2023-01-01",
            "validTo": "2023-12-31",
            "doctor": "Dr. Smith",
            "discount": 0.6,
            "products": [
                {"name": "Paracetamol", "price": 5.0},
                {"name": "Ibuprofeno", "price": 7.5},
            ],
        },
        {
            "id": "2",
            "user": "test_user",
            "type": "Privada",
            "status": "Caducada",
            "validFrom": "2022-01-01",
            "validTo": "2022-12-31",
            "doctor": "Dr. Doe",
            "discount": 0.0,
            "products": [
                {"name": "Amoxicilina", "price": 10.0},
            ],
        },
    ]
