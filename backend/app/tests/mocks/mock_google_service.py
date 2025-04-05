
def get_mock_google_user():
    return {
        "given_name": "John",
        "family_name": "Doe",
        "email": "john.doe@example.com",
        "picture": "https://example.com/photo.jpg"
    }


def get_mock_existing_user():
    return {
        "_id": "123",
        "correo": "john.doe@example.com",
        "rol": "usuario",
        "nombre": "John",
        "apellido": "Doe",
        "imagen": "https://example.com/photo.jpg",
        "fromGoogle": True
    }
