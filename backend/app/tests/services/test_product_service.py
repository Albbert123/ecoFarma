import pytest
from fastapi import HTTPException
from unittest.mock import MagicMock, patch
from app.services.product_service import ProductService
from app.models.product_model import Product, SearchData


@pytest.fixture
def mock_product_repository():
    """Fixture para mockear el repositorio de productos."""
    return MagicMock()


@pytest.fixture
def product_service(mock_product_repository):
    """Fixture para crear una instancia del servicio de productos con un repositorio mockeado."""
    service = ProductService()
    service.product_repo = mock_product_repository
    return service


def test_get_product_by_nregistro_success(product_service, mock_product_repository):
    """Test que verifica que se devuelve un producto correctamente por su nregistro."""
    # Arrange
    nregistro = "12345"
    mock_product = {"nregistro": nregistro, "name": "Producto Test", "price": 10.0}
    mock_product_repository.get_product_by_nregistro.return_value = mock_product

    # Act
    result = product_service.get_product_by_nregistro(nregistro)

    # Assert
    assert result == mock_product
    mock_product_repository.get_product_by_nregistro.assert_called_once_with(nregistro)


def test_get_product_by_nregistro_not_found(product_service, mock_product_repository):
    """Test que verifica que se lanza una excepción HTTPException cuando el producto no se encuentra por su nregistro."""
    # Arrange
    nregistro = "12345"
    mock_product_repository.get_product_by_nregistro.return_value = None

    # Act & Assert
    with pytest.raises(HTTPException) as exc_info:
        product_service.get_product_by_nregistro(nregistro)

    # Assert
    assert exc_info.value.status_code == 404
    assert exc_info.value.detail == "Producto no encontrado"
    mock_product_repository.get_product_by_nregistro.assert_called_once_with(nregistro)


def test_get_products_success(product_service, mock_product_repository):
    """Test que verifica que se devuelven los productos correctamente."""
    # Arrange
    limit = 10
    mock_products = [
        {"id": "1", "name": "Producto 1", "price": 10.0},
        {"id": "2", "name": "Producto 2", "price": 20.0},
    ]
    mock_product_repository.get_products.return_value = mock_products

    # Act
    result = product_service.get_products(limit)

    # Assert
    assert result == mock_products
    mock_product_repository.get_products.assert_called_once_with(limit)


def test_get_products_default_limit(product_service, mock_product_repository):
    """Test que verifica que se usa el límite por defecto cuando no se pasa un límite."""
    # Arrange
    default_limit = 25
    mock_products = [
        {"id": "1", "name": "Producto 1", "price": 10.0},
        {"id": "2", "name": "Producto 2", "price": 20.0},
    ]
    mock_product_repository.get_products.return_value = mock_products

    # Act
    result = product_service.get_products()

    # Assert
    assert result == mock_products
    mock_product_repository.get_products.assert_called_once_with(default_limit)


def test_get_products_by_filters_with_laboratory(product_service, mock_product_repository):
    """Test que verifica que se filtra correctamente por laboratorio."""
    # Arrange
    filters = {"laboratory": ["Lab1", "Lab2"]}
    limit = 10
    LAB_MAPPING = {"Lab1": "MappedLab1", "Lab2": "MappedLab2"}
    expected_query = {"laboratory": {"$in": ["MappedLab1", "MappedLab2"]}}
    mock_product_repository.get_products_by_advanced_query.return_value = []

    with patch("app.services.product_service.LAB_MAPPING", LAB_MAPPING):
        # Act
        result = product_service.get_products_by_filters(filters, limit)

        # Assert
        assert result == []
        mock_product_repository.get_products_by_advanced_query.assert_called_once_with(expected_query, limit)


def test_get_products_by_filters_with_category(product_service, mock_product_repository):
    """Test que verifica que se filtra correctamente por categoría."""
    # Arrange
    filters = {"category": ["Cat1", "Cat2"]}
    limit = 10
    CATEGORIES_MAPPING = {"Cat1": ["MappedCat1"], "Cat2": ["MappedCat2", "MappedCat3"]}
    expected_query = {"category": {"$in": ["MappedCat1", "MappedCat2", "MappedCat3"]}}
    mock_product_repository.get_products_by_advanced_query.return_value = []

    with patch("app.services.product_service.CATEGORIES_MAPPING", CATEGORIES_MAPPING):
        # Act
        result = product_service.get_products_by_filters(filters, limit)

        # Assert
        assert result == []
        mock_product_repository.get_products_by_advanced_query.assert_called_once_with(expected_query, limit)


def test_get_products_by_filters_with_price_range(product_service, mock_product_repository):
    """Test que verifica que se filtra correctamente por rango de precios."""
    # Arrange
    filters = {"min_price": 10, "max_price": 50}
    limit = 10
    expected_query = {"price": {"$gte": 10, "$lte": 50}}
    mock_product_repository.get_products_by_advanced_query.return_value = []

    # Act
    result = product_service.get_products_by_filters(filters, limit)

    # Assert
    assert result == []
    mock_product_repository.get_products_by_advanced_query.assert_called_once_with(expected_query, limit)


def test_get_products_by_filters_with_prescription(product_service, mock_product_repository):
    """Test que verifica que se filtra correctamente por prescripción."""
    # Arrange
    filters = {"prescription": True}
    limit = 10
    expected_query = {"prescription": True}
    mock_product_repository.get_products_by_advanced_query.return_value = []

    # Act
    result = product_service.get_products_by_filters(filters, limit)

    # Assert
    assert result == []
    mock_product_repository.get_products_by_advanced_query.assert_called_once_with(expected_query, limit)


def test_get_products_by_filters_combined_filters(product_service, mock_product_repository):
    """Test que verifica que se combinan correctamente múltiples filtros."""
    # Arrange
    filters = {
        "laboratory": ["Lab1"],
        "category": ["Cat1"],
        "min_price": 10,
        "max_price": 50,
        "prescription": True,
    }
    limit = 10
    LAB_MAPPING = {"Lab1": "MappedLab1"}
    CATEGORIES_MAPPING = {"Cat1": ["MappedCat1"]}
    expected_query = {
        "laboratory": {"$in": ["MappedLab1"]},
        "category": {"$in": ["MappedCat1"]},
        "price": {"$gte": 10, "$lte": 50},
        "prescription": True,
    }
    mock_product_repository.get_products_by_advanced_query.return_value = []

    with patch("app.services.product_service.LAB_MAPPING", LAB_MAPPING):
        with patch("app.services.product_service.CATEGORIES_MAPPING", CATEGORIES_MAPPING):
            # Act
            result = product_service.get_products_by_filters(filters, limit)

            # Assert
            assert result == []
            mock_product_repository.get_products_by_advanced_query.assert_called_once_with(expected_query, limit)


def test_get_search_history_by_user_and_date_success(product_service, mock_product_repository):
    """Test que verifica que se devuelve correctamente el historial de búsqueda de un usuario en una fecha específica."""
    # Arrange
    user = "test_user"
    date = "2023-04-01"
    mock_history = [
        {"query": "paracetamol", "timestamp": "2023-04-01T10:00:00"},
        {"query": "ibuprofeno", "timestamp": "2023-04-01T11:00:00"},
    ]
    mock_product_repository.get_search_history_by_user_and_date.return_value = mock_history

    # Act
    result = product_service.get_search_history_by_user_and_date(user, date)

    # Assert
    assert result == mock_history
    mock_product_repository.get_search_history_by_user_and_date.assert_called_once_with(user, date)


def test_get_search_history_by_user_and_date_no_history(product_service, mock_product_repository):
    """Test que verifica que se devuelve una lista vacía cuando no hay historial de búsqueda."""
    # Arrange
    user = "test_user"
    date = "2023-04-01"
    mock_product_repository.get_search_history_by_user_and_date.return_value = []

    # Act
    result = product_service.get_search_history_by_user_and_date(user, date)

    # Assert
    assert result == []
    mock_product_repository.get_search_history_by_user_and_date.assert_called_once_with(user, date)


def test_get_search_history_by_user_success(product_service, mock_product_repository):
    """Test que verifica que se devuelve correctamente el historial de búsqueda de un usuario."""
    # Arrange
    user = "test_user"
    mock_history = [
        {"query": "paracetamol", "timestamp": "2023-04-01T10:00:00"},
        {"query": "ibuprofeno", "timestamp": "2023-04-01T11:00:00"},
    ]
    mock_product_repository.get_search_history_by_user.return_value = mock_history

    # Act
    result = product_service.get_search_history_by_user(user)

    # Assert
    assert result == mock_history
    mock_product_repository.get_search_history_by_user.assert_called_once_with(user)


def test_get_search_history_by_user_no_history(product_service, mock_product_repository):
    """Test que verifica que se devuelve una lista vacía cuando no hay historial de búsqueda."""
    # Arrange
    user = "test_user"
    mock_product_repository.get_search_history_by_user.return_value = []

    # Act
    result = product_service.get_search_history_by_user(user)

    # Assert
    assert result == []
    mock_product_repository.get_search_history_by_user.assert_called_once_with(user)


def test_delete_search_history_entry_success(product_service, mock_product_repository):
    """Test que verifica que se elimina correctamente una entrada del historial de búsqueda."""
    # Arrange
    user = "test_user"
    date = "2023-04-01"

    # Act
    product_service.delete_search_history_entry(user, date)

    # Assert
    mock_product_repository.delete_search_history_entry_by_user_and_date.assert_called_once_with(user, date)


def test_save_search_data_success(product_service, mock_product_repository):
    """Test que verifica que se guarda correctamente un nuevo dato de búsqueda."""
    # Arrange
    search_data = SearchData(user="test_user", query="paracetamol", date="2023-04-01", searchTerm="paracetamol")
    user_search_history = [
        {"user": "test_user", "query": "ibuprofeno", "date": "2023-03-31"},
        {"user": "test_user", "query": "aspirina", "date": "2023-03-30"},
    ]
    mock_product_repository.get_search_history_by_user.return_value = user_search_history

    # Act
    result = product_service.save_search_data(search_data)

    # Assert
    assert result == search_data.dict()
    mock_product_repository.get_search_history_by_user.assert_called_once_with("test_user")
    mock_product_repository.save_search_data.assert_called_once_with(search_data.dict())


def test_save_search_data_removes_oldest_entry(product_service, mock_product_repository):
    """Test que verifica que se elimina el registro más antiguo si el historial tiene más de 10 registros."""
    # Arrange
    search_data = SearchData(user="test_user", query="paracetamol", date="2023-04-01", searchTerm="paracetamol")
    user_search_history = [
        {"user": "test_user", "query": f"query_{i}", "date": f"2023-03-{31 - i:02d}"}
        for i in range(10)
    ]
    mock_product_repository.get_search_history_by_user.return_value = user_search_history

    # Act
    result = product_service.save_search_data(search_data)

    # Assert
    assert result == search_data.dict()
    mock_product_repository.get_search_history_by_user.assert_called_once_with("test_user")
    mock_product_repository.delete_search_history_entry_by_user_and_date.assert_called_once_with(
        "test_user", "2023-03-31"
    )
    mock_product_repository.save_search_data.assert_called_once_with(search_data.dict())


def test_create_product_success(product_service, mock_product_repository):
    """Test que verifica que se crea un producto correctamente."""
    # Arrange
    product = Product(nregistro="12345", name="Producto Test", price=10.0)
    mock_product_repository.get_product_by_nregistro.return_value = None
    mock_product_repository.create_product.return_value = product

    # Act
    result = product_service.create_product(product)

    # Assert
    assert result == product
    mock_product_repository.get_product_by_nregistro.assert_called_once_with("12345")
    mock_product_repository.create_product.assert_called_once_with(product)


def test_create_product_already_exists(product_service, mock_product_repository):
    """Test que verifica que se lanza una excepción HTTPException si el producto ya existe."""
    # Arrange
    product = Product(nregistro="12345", name="Producto Test", price=10.0)
    mock_product_repository.get_product_by_nregistro.return_value = product

    # Act & Assert
    with pytest.raises(HTTPException) as exc_info:
        product_service.create_product(product)

    # Assert
    assert exc_info.value.status_code == 400
    assert exc_info.value.detail == "El producto ya existe"
    mock_product_repository.get_product_by_nregistro.assert_called_once_with("12345")
    mock_product_repository.create_product.assert_not_called()


def test_delete_product_success(product_service, mock_product_repository):
    """Test que verifica que se elimina un producto correctamente."""
    # Arrange
    nregistro = "12345"
    mock_product_repository.delete_product.return_value = MagicMock(deleted_count=1)

    # Act
    result = product_service.delete_product(nregistro)

    # Assert
    assert result == {"message": "Producto eliminado correctamente"}
    mock_product_repository.delete_product.assert_called_once_with(nregistro)


def test_delete_product_not_found(product_service, mock_product_repository):
    """Test que verifica que se lanza una excepción HTTPException si el producto no se encuentra."""
    # Arrange
    nregistro = "12345"
    mock_product_repository.delete_product.return_value = MagicMock(deleted_count=0)

    # Act & Assert
    with pytest.raises(HTTPException) as exc_info:
        product_service.delete_product(nregistro)

    # Assert
    assert exc_info.value.status_code == 404
    assert exc_info.value.detail == "Producto no encontrado"
    mock_product_repository.delete_product.assert_called_once_with(nregistro)


def test_update_product_success(product_service, mock_product_repository):
    """Test que verifica que se actualiza un producto correctamente."""
    # Arrange
    nregistro = "12345"
    product_data = {"name": "Producto Actualizado", "price": 20.0}
    updated_product = {"nregistro": "12345", "name": "Producto Actualizado", "price": 20.0}
    mock_product_repository.update_product.return_value = updated_product

    # Act
    result = product_service.update_product(nregistro, product_data)

    # Assert
    assert result == updated_product
    mock_product_repository.update_product.assert_called_once_with(nregistro, product_data)


def test_semantic_search_success(product_service, mock_product_repository):
    """Test que verifica que la búsqueda semántica devuelve productos correctamente filtrados."""
    # Arrange
    query = "paracetamol"
    limit = 5
    embedding = [0.1, 0.2, 0.3]
    mock_products = [
        {"name": "Producto 1", "price": 10.0},
        {"name": "LINITUL CICATRIZANTE POMADA", "price": 20.0},
        {"name": "Producto 2", "price": 15.0},
        {"name": "ICTIOMEN POLVO", "price": 25.0},
    ]
    expected_products = [
        {"name": "Producto 1", "price": 10.0},
        {"name": "Producto 2", "price": 15.0},
    ]
    mock_product_repository.search_by_vector.return_value = mock_products

    with patch("app.services.product_service.generate_embedding_modelProduct", return_value=embedding):
        # Act
        result = product_service.semantic_search(query, limit)

        # Assert
        assert result["products"] == expected_products
        assert result["embedding"] == embedding
        mock_product_repository.search_by_vector.assert_called_once_with(embedding, limit)


def test_get_all_nregistros_success(product_service, mock_product_repository):
    """Test que verifica que se devuelven correctamente todos los números de registro."""
    # Arrange
    mock_nregistros = ["12345", "67890", "11223"]
    mock_product_repository.get_all_nregistros.return_value = mock_nregistros

    # Act
    result = product_service.get_all_nregistros()

    # Assert
    assert result == mock_nregistros
    mock_product_repository.get_all_nregistros.assert_called_once()