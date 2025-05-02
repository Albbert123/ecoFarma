import pytest
from unittest.mock import MagicMock
from datetime import datetime
from fastapi import HTTPException
from app.services.order_service import OrderService
from app.tests.mocks.mock_order import get_mock_order, get_mock_order_as_object, get_mock_orders


@pytest.fixture
def mock_order_repository():
    """Fixture para mockear el repositorio de orders."""
    return MagicMock()


@pytest.fixture
def order_service(mock_order_repository):
    """Fixture para crear una instancia del servicio de orders con un repositorio mockeado."""
    service = OrderService()
    service.order_repo = mock_order_repository
    return service


def test_create_order_success(order_service, mock_order_repository):
    """Test que verifica que se crea correctamente un encargo."""
    # Arrange
    mock_order_data = get_mock_order_as_object()
    mock_order_repository.create_order.return_value = mock_order_data

    # Act
    result = order_service.create_order(mock_order_data)

    # Assert
    assert result == mock_order_data
    mock_order_repository.create_order.assert_called_once_with(mock_order_data)


def test_create_order_with_empty_data(order_service, mock_order_repository):
    """Test que verifica que se lanza una excepción si los datos del encargo están vacíos."""
    # Arrange
    mock_order_data = None
    mock_order_repository.create_order.return_value = None

    # Act & Assert
    with pytest.raises(HTTPException) as exc_info:
        order_service.create_order(mock_order_data)
    assert exc_info.value.status_code == 400
    assert exc_info.value.detail == "Error al crear el encargo"


def test_get_orders_success(order_service, mock_order_repository):
    """Test que verifica que se obtienen correctamente los encargos."""
    # Arrange
    mock_orders = get_mock_orders()
    mock_order_repository.get_orders.return_value = mock_orders

    # Act
    result = order_service.get_orders()

    # Assert
    assert result == mock_orders
    mock_order_repository.get_orders.assert_called_once()


def test_get_orders_no_orders(order_service, mock_order_repository):
    """Test que verifica que se lanza una excepción si no hay encargos disponibles."""
    # Arrange
    mock_order_repository.get_orders.return_value = []

    # Act & Assert
    with pytest.raises(HTTPException) as exc_info:
        order_service.get_orders()
    assert exc_info.value.status_code == 404
    assert exc_info.value.detail == "No hay encargos disponibles"
    mock_order_repository.get_orders.assert_called_once()


def test_get_order_by_id_success(order_service, mock_order_repository):
    """Test que verifica que se obtiene correctamente un encargo por su ID."""
    # Arrange
    order_id = "1"
    mock_order = get_mock_order()
    mock_order_repository.get_order_by_id.return_value = mock_order

    # Act
    result = order_service.get_order_by_id(order_id)

    # Assert
    assert result == mock_order
    mock_order_repository.get_order_by_id.assert_called_once_with(order_id)


def test_get_order_by_id_not_found(order_service, mock_order_repository):
    """Test que verifica que se lanza una excepción si el encargo no existe."""
    # Arrange
    order_id = "1"
    mock_order_repository.get_order_by_id.return_value = None

    # Act & Assert
    with pytest.raises(HTTPException) as exc_info:
        order_service.get_order_by_id(order_id)
    assert exc_info.value.status_code == 404
    assert exc_info.value.detail == "El encargo no existe"
    mock_order_repository.get_order_by_id.assert_called_once_with(order_id)


def test_get_order_by_user_and_date_success(order_service, mock_order_repository):
    """Test que verifica que se obtiene correctamente un encargo por usuario y fecha."""
    # Arrange
    user = "test_user"
    date = "2023-03-31"
    mock_order = get_mock_order()
    mock_order_repository.get_order_by_user_and_date.return_value = mock_order

    # Act
    result = order_service.get_order_by_user_and_date(user, date)

    # Assert
    assert result == mock_order
    mock_order_repository.get_order_by_user_and_date.assert_called_once_with(user, date)


def test_get_order_by_user_and_date_not_found(order_service, mock_order_repository):
    """Test que verifica que se lanza una excepción si el encargo no existe para el usuario y la fecha."""
    # Arrange
    user = "test_user"
    date = "2023-03-31"
    mock_order_repository.get_order_by_user_and_date.return_value = None

    # Act & Assert
    with pytest.raises(HTTPException) as exc_info:
        order_service.get_order_by_user_and_date(user, date)
    assert exc_info.value.status_code == 404
    assert exc_info.value.detail == "El encargo no existe"
    mock_order_repository.get_order_by_user_and_date.assert_called_once_with(user, date)


def test_get_orders_by_user_success(order_service, mock_order_repository):
    """Test que verifica que se obtienen correctamente los encargos de un usuario."""
    # Arrange
    user = "test_user"
    mock_orders = get_mock_orders()
    mock_order_repository.get_orders_by_user.return_value = mock_orders

    # Act
    result = order_service.get_orders_by_user(user)

    # Assert
    assert result == mock_orders
    mock_order_repository.get_orders_by_user.assert_called_once_with(user)


def test_get_orders_by_user_no_orders(order_service, mock_order_repository):
    """Test que verifica que se devuelve una lista vacía si el usuario no tiene encargos."""
    # Arrange
    user = "test_user"
    mock_order_repository.get_orders_by_user.return_value = []

    # Act
    result = order_service.get_orders_by_user(user)

    # Assert
    assert result == []
    mock_order_repository.get_orders_by_user.assert_called_once_with(user)


def test_update_order_status_success(order_service, mock_order_repository):
    """Test que verifica que se actualiza correctamente el estado de un encargo."""
    # Arrange
    order_id = "1"
    new_status = "Entregado"
    mock_order = get_mock_order_as_object()
    mock_order.status = new_status  # Actualizar el estado en el mock
    mock_order_repository.update_order_status.return_value = mock_order
    order_service.send_email_change_status = MagicMock()  # Mockear el envío de email

    # Act
    result = order_service.update_order_status(order_id, new_status)

    # Assert
    assert result == mock_order
    assert result.status == new_status
    assert result.date == "31/03/2023"  # Comparar directamente con el valor esperado
    assert result.pickupDate == "01/04/2023"  # Comparar directamente con el valor esperado
    mock_order_repository.update_order_status.assert_called_once_with(order_id, new_status)
    order_service.send_email_change_status.assert_called_once_with(mock_order)


def test_update_order_status_not_found(order_service, mock_order_repository):
    """Test que verifica que se lanza una excepción si el encargo no existe."""
    # Arrange
    order_id = "1"
    new_status = "Entregado"
    mock_order_repository.update_order_status.return_value = None

    # Act & Assert
    with pytest.raises(HTTPException) as exc_info:
        order_service.update_order_status(order_id, new_status)
    assert exc_info.value.status_code == 404
    assert exc_info.value.detail == "El encargo no existe"
    mock_order_repository.update_order_status.assert_called_once_with(order_id, new_status)


def test_delete_order_success(order_service, mock_order_repository):
    """Test que verifica que se elimina correctamente un encargo."""
    # Arrange
    order_id = "1"
    mock_order = get_mock_order_as_object()
    mock_order_repository.delete_order.return_value = mock_order

    # Act
    result = order_service.delete_order(order_id)

    # Assert
    assert result == mock_order
    mock_order_repository.delete_order.assert_called_once_with(order_id)


def test_delete_order_not_found(order_service, mock_order_repository):
    """Test que verifica que se lanza una excepción si el encargo no existe."""
    # Arrange
    order_id = "1"
    mock_order_repository.delete_order.return_value = None

    # Act & Assert
    with pytest.raises(HTTPException) as exc_info:
        order_service.delete_order(order_id)
    assert exc_info.value.status_code == 404
    assert exc_info.value.detail == "El encargo no existe"
    mock_order_repository.delete_order.assert_called_once_with(order_id)