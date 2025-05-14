import pytest
from unittest.mock import MagicMock, AsyncMock
from fastapi.responses import RedirectResponse
from app.services.google_service import (
    get_google_auth_redirect,
    handle_google_callback,
)

from app.tests.mocks.mock_google_service import (
    get_mock_google_user,
    get_mock_existing_user,
)


@pytest.fixture
def mock_request():
    req = MagicMock()
    req.url_for.return_value = "http://localhost:8000/auth/google/callback"
    return req


@pytest.fixture
def mock_user_service():
    return MagicMock()


@pytest.fixture
def mock_oauth(monkeypatch):
    google = MagicMock()
    google.authorize_redirect = AsyncMock()
    google.authorize_access_token = AsyncMock(return_value={
        "id_token": "fake_id_token",
        "access_token": "fake_access_token"
    })

    oauth_mock = MagicMock()
    oauth_mock.google = google

    monkeypatch.setattr("app.services.google_service.oauth", oauth_mock)
    return oauth_mock


@pytest.fixture
def mock_jwt_decode(monkeypatch):
    monkeypatch.setattr(
        "app.services.google_service.jwt.decode",
        lambda id_token, key, options, audience, access_token:
        get_mock_google_user()
    )


@pytest.mark.asyncio
async def test_get_google_auth_redirect(mock_request, mock_oauth):
    # Mockear el valor de "state" que se pasa como parámetro
    mock_request.query_params.get.return_value = "mock_state_value"

    # Llamar a la función asíncrona y esperar su resultado
    response = await get_google_auth_redirect(mock_request)

    # Verificar que authorize_redirect fue llamado con los argumentos correctos
    mock_oauth.google.authorize_redirect.assert_called_once_with(
        mock_request, "http://localhost:8000/auth/google/callback", state="mock_state_value"
    )


@pytest.mark.asyncio
async def test_handle_google_callback_existing_user(
    mock_request, mock_user_service, mock_oauth, mock_jwt_decode
):
    # Simula que el usuario ya existe
    mock_user_service.get_user_by_email.return_value = get_mock_existing_user()

    # Llamar a la función asíncrona y esperar su resultado
    response = await handle_google_callback(mock_request, mock_user_service)

    # Verificar que el resultado sea una redirección
    assert isinstance(response, RedirectResponse)
    assert "http://localhost:3000/login?" in response.headers["location"]

    # Verificar que get_user_by_email fue llamado correctamente
    mock_user_service.get_user_by_email.assert_called_once()


@pytest.mark.asyncio
async def test_handle_google_callback_new_user(
    mock_request, mock_user_service, mock_oauth, mock_jwt_decode
):
    # Simula que el usuario no existe
    mock_user_service.get_user_by_email.return_value = None

    mock_new_user = MagicMock()
    mock_new_user.token = "mock_token"
    mock_new_user.rol = "usuario"
    mock_new_user.correo = "testuser@example.com"
    mock_new_user.nombre = "Test"
    mock_new_user.apellido = "User"
    mock_new_user.imagen = "https://profile.image"
    mock_new_user.fromGoogle = True

    mock_user_service.create_user.return_value = mock_new_user

    response = await handle_google_callback(mock_request, mock_user_service)

    assert isinstance(response, RedirectResponse)
    assert "http://localhost:3000/login?" in response.headers["location"]
    mock_user_service.get_user_by_email.assert_called_once()
    mock_user_service.create_user.assert_called_once()
    assert "token=mock_token" in response.headers["location"]
