def get_mock_search_history():
    return [
        {"embedding": [0.1, 0.2, 0.3], "date": "2023-04-01T10:00:00Z"},
        {"embedding": [0.2, 0.3, 0.4], "date": "2023-04-02T10:00:00Z"},
        {"embedding": [0.3, 0.4, 0.5], "date": "2023-04-03T10:00:00Z"},
        {"embedding": [0.4, 0.5, 0.6], "date": "2023-04-04T10:00:00Z"},
        {"embedding": [0.5, 0.6, 0.7], "date": "2023-04-05T10:00:00Z"},
    ]


def get_mock_recommendations():
    return [
        {
            "nregistro": "12345",
            "name": "Producto 1",
            "principleAct": "Principio Activo 1",
            "description": "Descripción del producto 1",
            "price": 10.0,
            "image": "https://example.com/image1.jpg",
            "laboratory": "Laboratorio 1",
            "category": "Categoría 1",
            "stock": 100,
            "dosis": "10mg",
            "prescription": False,
            "composition": "Composición 1",
            "AdditionalInfo": "Información adicional 1",
        },
        {
            "nregistro": "67890",
            "name": "Producto 2",
            "principleAct": "Principio Activo 2",
            "description": "Descripción del producto 2",
            "price": 20.0,
            "image": "https://example.com/image2.jpg",
            "laboratory": "Laboratorio 2",
            "category": "Categoría 2",
            "stock": 50,
            "dosis": "20mg",
            "prescription": True,
            "composition": "Composición 2",
            "AdditionalInfo": "Información adicional 2",
        },
    ]


def get_mock_product():
    return {
        "nregistro": "12345",
        "name": "Producto Base",
        "embedding": [0.1, 0.2, 0.3],
        "description": "Descripción del producto base",
        "price": 10.0,
        "image": "https://example.com/image_base.jpg",
        "laboratory": "Laboratorio Base",
        "category": "Categoría Base",
        "stock": 50,
        "dosis": "10mg",
        "prescription": False,
        "composition": "Composición Base",
        "AdditionalInfo": "Información adicional base",
    }


def get_mock_similar_products():
    return [
        {
            "nregistro": "67890",
            "name": "Producto Similar 1",
            "principleAct": "Principio Activo 1",
            "description": "Descripción del producto similar 1",
            "price": 20.0,
            "image": "https://example.com/image1.jpg",
            "laboratory": "Laboratorio 1",
            "category": "Categoría 1",
            "stock": 30,
            "dosis": "20mg",
            "prescription": True,
            "composition": "Composición 1",
            "AdditionalInfo": "Información adicional 1",
        },
        {
            "nregistro": "11223",
            "name": "Producto Similar 2",
            "principleAct": "Principio Activo 2",
            "description": "Descripción del producto similar 2",
            "price": 15.0,
            "image": "https://example.com/image2.jpg",
            "laboratory": "Laboratorio 2",
            "category": "Categoría 2",
            "stock": 40,
            "dosis": "15mg",
            "prescription": False,
            "composition": "Composición 2",
            "AdditionalInfo": "Información adicional 2",
        },
    ]
