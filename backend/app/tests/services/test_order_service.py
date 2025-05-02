import pytest
from unittest.mock import MagicMock
from app.services.order_service import OrderService


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


