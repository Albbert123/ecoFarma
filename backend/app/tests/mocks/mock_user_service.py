from unittest.mock import Mock
import pytest
from app.services.user_service import UserService


@pytest.fixture
def mock_user_repo():
    return Mock()


@pytest.fixture
def user_service(mock_user_repo):
    service = UserService()
    service.user_repo = mock_user_repo
    return service
