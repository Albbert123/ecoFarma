import pytest
from datetime import timedelta
from app.auth.jwt_handler import (
    create_access_token,
    verify_token,
    refresh_token,
)

SECRET_KEY = "test_secret_key"  # Clave secreta para pruebas
ALGORITHM = "HS256"


@pytest.fixture
def test_data():
    return {
        "correo": "test@example.com",
        "rol": "user",
        "imagen": "https://example.com/image.jpg",
        "nombre": "Test",
        "apellido": "User",
        "fromGoogle": False,
    }


def test_create_access_token(test_data):
    # Crear un token con datos de prueba
    token = create_access_token(test_data, expires_delta=timedelta(minutes=5))
    assert token is not None

    # Decodificar el token para verificar su contenido
    payload = verify_token(token)
    assert payload["correo"] == test_data["correo"]
    assert payload["rol"] == test_data["rol"]
    assert payload["imagen"] == test_data["imagen"]
    assert payload["nombre"] == test_data["nombre"]
    assert payload["apellido"] == test_data["apellido"]
    assert payload["fromGoogle"] == test_data["fromGoogle"]


def test_verify_token_valid(test_data):
    # Crear un token válido
    token = create_access_token(test_data, expires_delta=timedelta(minutes=5))
    payload = verify_token(token)
    assert payload is not None
    assert payload["correo"] == test_data["correo"]


def test_verify_token_expired(test_data):
    # Crear un token que ya ha expirado
    token = create_access_token(test_data, expires_delta=timedelta(seconds=-1))
    payload = verify_token(token)
    assert payload is None  # El token no debería ser válido


def test_verify_token_allow_expired(test_data):
    # Crear un token que ya ha expirado
    token = create_access_token(test_data, expires_delta=timedelta(seconds=-1))
    payload = verify_token(token, allow_expired=True)
    # El token debería ser válido porque allow_expired=True
    assert payload is not None
    assert payload["correo"] == test_data["correo"]


def test_refresh_token(test_data):
    # Crear un token válido
    token = create_access_token(test_data, expires_delta=timedelta(minutes=5))
    new_token = refresh_token(token)
    assert new_token is not None

    # Verificar que el nuevo token tiene una nueva fecha de expiración
    new_payload = verify_token(new_token)
    assert new_payload["correo"] == test_data["correo"]
    assert new_payload["rol"] == test_data["rol"]
    assert new_payload["imagen"] == test_data["imagen"]
    assert new_payload["nombre"] == test_data["nombre"]
    assert new_payload["apellido"] == test_data["apellido"]
    assert new_payload["fromGoogle"] == test_data["fromGoogle"]


def test_refresh_token_expired(test_data):
    # Crear un token que ya ha expirado
    token = create_access_token(test_data, expires_delta=timedelta(seconds=-1))
    new_token = refresh_token(token)
    # Debería poder renovarse porque allow_expired=True
    assert new_token is not None

    # Verificar que el nuevo token tiene una nueva fecha de expiración
    new_payload = verify_token(new_token)
    assert new_payload["correo"] == test_data["correo"]
    assert new_payload["rol"] == test_data["rol"]
