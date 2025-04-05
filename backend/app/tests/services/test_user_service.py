import pytest
import bcrypt
from jose import JWTError
from fastapi import HTTPException
from unittest.mock import patch
from unittest.mock import Mock
from app.services.user_service import UserService

from app.models.user_model import (
    UserCreate,
    UserLogin,
    UserResetPassword,
    UserUpdate,
    UserResponse
)


@pytest.fixture
def mock_user_repo():
    return Mock()


@pytest.fixture
def user_service(mock_user_repo):
    service = UserService()
    service.user_repo = mock_user_repo
    return service


# Test cases
def test_get_user_by_email(mock_user_repo, user_service):
    test_email = "test@example.com"
    expected_user = {"correo": test_email, "nombre": "Test User"}

    mock_user_repo.get_user_by_email.return_value = expected_user

    result = user_service.get_user_by_email(test_email)

    mock_user_repo.get_user_by_email.assert_called_once_with(test_email)
    assert result == expected_user


def test_get_users(mock_user_repo, user_service):
    expected_users = [
        {"correo": "user1@test.com"},
        {"correo": "user2@test.com"}
    ]
    mock_user_repo.get_users.return_value = expected_users

    result = user_service.get_users()

    mock_user_repo.get_users.assert_called_once()
    assert result == expected_users


def test_create_user(mock_user_repo, user_service):
    user_data = UserCreate(
        correo="new@user.com",
        contraseña="password123",
        nombre="New User",
        apellido="User",
        rol="user",
        imagen="image_url",
        fromAdmin=False
    )

    hashed_password = bcrypt.hashpw(
        user_data.contraseña.encode('utf-8'), bcrypt.gensalt()
    ).decode('utf-8')
    mock_user_repo.create_user.return_value = {
        "correo": user_data.correo,
        "nombre": user_data.nombre,
        "apellido": user_data.apellido,
        "rol": "user",
        "imagen": user_data.imagen,
        "fromAdmin": user_data.fromAdmin,
        "password": hashed_password
    }

    with patch('app.services.user_service.create_access_token') as mock_token:
        mock_token.return_value = "test_token"
        result = user_service.create_user(user_data)

    assert isinstance(result, UserResponse)
    assert result.correo == user_data.correo
    assert result.token == "test_token"
    mock_user_repo.create_user.assert_called_once()


def test_authenticate_user_success(mock_user_repo, user_service):
    user_data = UserLogin(
        correo="test@user.com", contraseña="correct_password"
    )
    hashed_pw = bcrypt.hashpw(
        "correct_password".encode('utf-8'), bcrypt.gensalt()
    ).decode('utf-8')

    mock_user_repo.get_user_by_email.return_value = {
        "correo": user_data.correo,
        "contraseña": hashed_pw,
        "rol": "user",
        "nombre": "Test User",
        "apellido": "User",
        "imagen": "image_url",
        "fromGoogle": False
    }

    with patch('app.services.user_service.create_access_token') as mock_token:
        mock_token.return_value = "test_token"
        result = user_service.authenticate_user(user_data)

    assert isinstance(result, UserResponse)
    assert result.token == "test_token"
    assert result.nombre == "Test User"
    assert result.apellido == "User"
    assert result.imagen == "image_url"


def test_authenticate_user_wrong_password(mock_user_repo, user_service):
    user_data = UserLogin(correo="test@user.com", contraseña="wrong_password")
    hashed_pw = bcrypt.hashpw(
        "correct_password".encode('utf-8'), bcrypt.gensalt()
    ).decode('utf-8')

    mock_user_repo.get_user_by_email.return_value = {
        "correo": user_data.correo,
        "contraseña": hashed_pw,
        "rol": "user",
        "nombre": "Test User",
        "apellido": "User",
        "imagen": "image_url",
        "fromGoogle": False
    }

    result = user_service.authenticate_user(user_data)
    assert result is None


def test_delete_user_success(mock_user_repo, user_service):
    test_email = "user@to.delete"
    mock_user_repo.delete_user.return_value.deleted_count = 1

    result = user_service.delete_user(test_email)

    mock_user_repo.delete_user.assert_called_once_with(test_email)
    assert result["message"] == "Usuario eliminado correctamente"


def test_delete_user_not_found(mock_user_repo, user_service):
    test_email = "nonexistent@user.com"
    mock_user_repo.delete_user.return_value.deleted_count = 0

    with pytest.raises(HTTPException) as exc_info:
        user_service.delete_user(test_email)

    assert exc_info.value.status_code == 404
    assert "Usuario no encontrado" in str(exc_info.value.detail)


def test_update_user(user_service, mock_user_repo):
    user_data = UserUpdate(
        correo="existing@user.com",
        nombre="Updated Name",
        apellido="Updated Last Name",
        imagen="updated_image_url",
        new_correo="new correo"
    )

    mock_user_repo.update_user.return_value = {
        "correo": user_data.new_correo,
        "nombre": user_data.nombre,
        "rol": "user",
        "apellido": user_data.apellido,
        "imagen": user_data.imagen,
        "fromGoogle": False
    }

    result = user_service.update_user(user_data)

    assert isinstance(result, UserResponse)
    assert result.nombre == user_data.nombre
    assert result.apellido == user_data.apellido
    assert result.imagen == user_data.imagen
    assert result.correo == user_data.new_correo
    mock_user_repo.update_user.assert_called_once_with(user_data)


def test_send_reset_code_success(user_service):
    test_email = "user@reset.com"

    # Parchear directamente la función send_email en el módulo user_service
    with patch('app.services.user_service.send_email') as mock_send_email:
        mock_send_email.return_value = 202

        with patch(
                'app.services.user_service.create_access_token') as mock_token:
            mock_token.return_value = "reset_token"
            result = user_service.send_reset_code(test_email)

        # Verificar que el token devuelto sea correcto
        assert result["token"] == "reset_token"

        # Verificar que send_email fue llamado con los argumentos correctos
        mock_send_email.assert_called_once_with(
            to_email=test_email,
            subject="Código de verificación para restablecer tu contraseña",
            content=mock_send_email.call_args[1]["content"]
        )


def test_send_reset_code_email_failure(user_service):
    test_email = "user@reset.com"

    # Parchear directamente la función send_email en el módulo user_service
    with patch('app.services.user_service.send_email') as mock_send_email:
        mock_send_email.return_value = 500

        with pytest.raises(HTTPException) as exc_info:
            user_service.send_reset_code(test_email)

        # Verificar que se lanzó la excepción con el código de estado correcto
        assert exc_info.value.status_code == 500
        assert "El correo no pudo ser enviado" in str(exc_info.value.detail)

        # Verificar que send_email fue llamado con los argumentos correctos
        mock_send_email.assert_called_once_with(
            to_email=test_email,
            subject="Código de verificación para restablecer tu contraseña",
            content=mock_send_email.call_args[1]["content"]
        )


def test_reset_password_success(mock_user_repo, user_service):
    reset_data = UserResetPassword(
        token="valid_token",
        code="123456",
        new_contraseña="new_password",
        correo="user@test.com"
    )

    # Parchear directamente la función verify_token en el módulo user_service
    with patch('app.services.user_service.verify_token') as mock_verify:
        mock_verify.return_value = {
            "correo": "user@test.com",
            "code": "123456"
        }

        # Configurar el mock para update_password_only
        mock_user_repo.update_password_only.return_value = None

        result = user_service.reset_password(reset_data)

    # Verificar que el resultado sea correcto
    assert result["message"] == "Contraseña restablecida con éxito"

    # Verificar que update_password_only fue llamado con los argumentos
    mock_user_repo.update_password_only.assert_called_once_with(
        "user@test.com",  # Correo del usuario
        mock_user_repo.update_password_only.call_args[0][1]
    )


def test_reset_password_wrong_code(user_service):
    reset_data = UserResetPassword(
        token="valid_token",
        code="wrong_code",
        new_contraseña="new_password",
        correo="user@test.com"
    )

    # Parchear directamente la función verify_token en el módulo user_service
    with patch('app.services.user_service.verify_token') as mock_verify:
        mock_verify.return_value = {
            "correo": "user@test.com",
            "code": "123456"  # Código esperado en el token
        }

        # Verificar que se lanza una excepción HTTPException
        with pytest.raises(HTTPException) as exc_info:
            user_service.reset_password(reset_data)

        # Verificar que la excepción tiene el código y mensaje correctos
        assert exc_info.value.status_code == 400
        assert "Código incorrecto o expirado" in str(exc_info.value.detail)


def test_reset_password_invalid_token(user_service):
    reset_data = UserResetPassword(
        token="invalid_token",
        code="123456",
        new_contraseña="new_password",
        correo="user@test.com"
    )

    with patch('app.services.user_service.verify_token') as mock_verify:
        mock_verify.side_effect = JWTError("Invalid token")

        with pytest.raises(HTTPException) as exc_info:
            user_service.reset_password(reset_data)

    assert exc_info.value.status_code == 400
    assert "Token invalido" in str(exc_info.value.detail)


def test_refresh_user_token_success(user_service):
    test_token = "old_token"
    new_token = "new_refreshed_token"

    with patch('app.services.user_service.refresh_token') as mock_refresh:
        mock_refresh.return_value = new_token
        result = user_service.refresh_user_token(test_token)

    assert result == new_token


def test_refresh_user_token_failure(user_service):
    test_token = "invalid_token"

    with patch('app.services.user_service.refresh_token') as mock_refresh:
        mock_refresh.return_value = None
        result = user_service.refresh_user_token(test_token)

    assert result is None
