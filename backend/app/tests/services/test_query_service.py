import pytest
from unittest.mock import MagicMock
from app.services.query_service import QueryService
from app.models.query_model import Query
from fastapi import HTTPException


@pytest.fixture
def mock_query_repository():
    """Fixture para mockear el repositorio de queries."""
    return MagicMock()


@pytest.fixture
def query_service(mock_query_repository):
    """Fixture para crear una instancia del servicio de queries con un repositorio mockeado."""
    service = QueryService()
    service.query_repo = mock_query_repository
    return service


def test_get_queries_success(query_service, mock_query_repository):
    """Test que verifica que se obtienen correctamente todas las queries."""
    # Arrange
    mock_queries = [
        Query(
            id="1",
            user="user1@example.com",
            pharmacist="pharma1@example.com",
            date="2025-05-06T00:00:00.000Z",
            subject="Consulta 1",
            question="¿Cuál es el horario?",
            answer="De 9 a 18",
            status="Respondida",
        ),
        Query(
            id="2",
            user="user2@example.com",
            pharmacist="pharma2@example.com",
            date="2025-05-07T00:00:00.000Z",
            subject="Consulta 2",
            question="¿Tienen stock?",
            answer=None,
            status="Pendiente",
        ),
    ]
    mock_query_repository.get_queries.return_value = mock_queries

    # Act
    result = query_service.get_queries()

    # Assert
    assert result == mock_queries
    mock_query_repository.get_queries.assert_called_once()


def test_get_queries_by_user_success(query_service, mock_query_repository):
    """Test que verifica que se obtienen correctamente las queries de un usuario."""
    # Arrange
    user = "user1@example.com"
    mock_queries = [
        Query(
            id="1",
            user=user,
            pharmacist="pharma1@example.com",
            date="2025-05-06T00:00:00.000Z",
            subject="Consulta 1",
            question="¿Cuál es el horario?",
            answer="De 9 a 18",
            status="Respondida",
        )
    ]
    mock_query_repository.get_queries_by_user.return_value = mock_queries

    # Act
    result = query_service.get_queries_by_user(user)

    # Assert
    assert result == mock_queries
    mock_query_repository.get_queries_by_user.assert_called_once_with(user)


def test_add_query_success(query_service, mock_query_repository):
    """Test que verifica que se agrega correctamente una query."""
    # Arrange
    query = Query(
        id="1",
        user="user1@example.com",
        pharmacist="pharma1@example.com",
        date="2025-05-06T00:00:00.000Z",
        subject="Consulta 1",
        question="¿Cuál es el horario?",
        answer=None,
        status="Pendiente",
    )
    mock_query_repository.add_query.return_value = query
    query_service.send_email_new_query = MagicMock()  # Mockear el envío de email

    # Act
    result = query_service.add_query(query)

    # Assert
    assert result == query
    mock_query_repository.add_query.assert_called_once_with(query)
    query_service.send_email_new_query.assert_called_once_with(query)


def test_update_query_status_success(query_service, mock_query_repository):
    """Test que verifica que se actualiza correctamente el estado de una query."""
    # Arrange
    query_id = "1"
    answer = "Esta es la respuesta actualizada"
    status = "Respondida"
    updated_query = Query(
        id=query_id,
        user="user1@example.com",
        pharmacist="pharma1@example.com",
        date="2025-05-06T00:00:00.000Z",
        subject="Consulta 1",
        question="¿Cuál es el horario?",
        answer=answer,
        status=status,
    )
    mock_query_repository.update_query_status.return_value = updated_query
    query_service.send_email_change_status = MagicMock()  # Mockear el envío de email

    # Act
    result = query_service.update_query_status(query_id, answer, status)

    # Assert
    assert result == updated_query
    mock_query_repository.update_query_status.assert_called_once_with(query_id, answer, status)
    query_service.send_email_change_status.assert_called_once_with(updated_query)


def test_update_query_status_not_found(query_service, mock_query_repository):
    """Test que verifica que se lanza una excepción si la query no existe."""
    # Arrange
    query_id = "1"
    answer = "Esta es la respuesta actualizada"
    status = "Respondida"
    mock_query_repository.update_query_status.return_value = None  # Simula que no se encontró la query

    # Act & Assert
    with pytest.raises(HTTPException) as exc_info:
        query_service.update_query_status(query_id, answer, status)
    assert exc_info.value.status_code == 404
    assert exc_info.value.detail == "Consulta no encontrada"
    mock_query_repository.update_query_status.assert_called_once_with(query_id, answer, status)
