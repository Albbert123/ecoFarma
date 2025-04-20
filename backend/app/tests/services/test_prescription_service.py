from fastapi import HTTPException
import pytest
from unittest.mock import MagicMock, patch
from app.tests.mocks.mock_prescription import get_mock_prescription
from app.services.prescription_service import PrescriptionService


@pytest.fixture
def mock_prescription_repository():
    """Fixture to mock the PrescriptionRepository."""
    return MagicMock()


@pytest.fixture
def prescription_service(mock_prescription_repository):
    """Fixture to provide a PrescriptionService with a mocked repository."""
    service = PrescriptionService()
    service.prescription_repository = mock_prescription_repository
    return service


def test_get_prescriptions_by_user_returns_prescriptions(
    prescription_service, mock_prescription_repository
):
    """Test that get_prescriptions_by_user returns prescriptions for a user."""
    # Arrange
    user = "test_user"
    mock_prescriptions = get_mock_prescription()
    mock_prescription_repository.get_prescriptions_by_user.return_value = \
        mock_prescriptions

    # Act
    result = prescription_service.get_prescriptions_by_user(user)

    # Assert
    assert len(result) == 2
    assert result[0]["id"] == "1"
    assert result[0]["user"] == user
    assert result[0]["type"] == "Electrónica"
    assert result[0]["status"] == "Activa"
    assert result[0]["validFrom"] == "2023-01-01"
    assert result[0]["validTo"] == "2023-12-31"
    assert result[0]["doctor"] == "Dr. Smith"
    assert result[0]["discount"] == 0.6
    assert len(result[0]["products"]) == 2
    assert result[0]["products"][0]["name"] == "Paracetamol"
    assert result[0]["products"][0]["price"] == 5.0

    assert result[1]["id"] == "2"
    assert result[1]["user"] == user
    assert result[1]["type"] == "Privada"
    assert result[1]["status"] == "Caducada"
    assert result[1]["validFrom"] == "2022-01-01"
    assert result[1]["validTo"] == "2022-12-31"
    assert result[1]["doctor"] == "Dr. Doe"
    assert result[1]["discount"] == 0.0
    assert len(result[1]["products"]) == 1
    assert result[1]["products"][0]["name"] == "Amoxicilina"
    assert result[1]["products"][0]["price"] == 10.0


def test_get_prescriptions_by_user_no_prescriptions(
    prescription_service, mock_prescription_repository
):
    """Test that returns an empty list when no prescriptions exist."""
    # Arrange
    user = "test_user"
    mock_prescription_repository.get_prescriptions_by_user.return_value = []

    # Act
    result = prescription_service.get_prescriptions_by_user(user)

    # Assert
    assert result == []


def test_get_prescriptions_by_user_raises_exception_on_error(
    prescription_service, mock_prescription_repository
):
    """Test that raises an exception when the repository fails."""
    # Arrange
    user = "test_user"
    mock_prescription_repository.get_prescriptions_by_user.side_effect = \
        Exception("Database error")

    # Act & Assert
    with pytest.raises(Exception, match="Database error"):
        prescription_service.get_prescriptions_by_user(user)


def test_get_base_embeddings_by_type_returns_embeddings(
    prescription_service, mock_prescription_repository
):
    """Test that returns flattened embeddings for a given type."""
    # Arrange
    type = "test_type"
    mock_documents = [
        {"embeddings": [[0.1, 0.2, 0.3], [0.4, 0.5, 0.6]]},
        {"embeddings": [[0.7, 0.8, 0.9]]}
    ]
    mock_prescription_repository.get_base_embeddings_by_type.return_value = \
        mock_documents
    # Act
    result = prescription_service.get_base_embeddings_by_type(type)

    # Assert
    assert result == [[0.1, 0.2, 0.3], [0.4, 0.5, 0.6], [0.7, 0.8, 0.9]]
    mock_prescription_repository.get_base_embeddings_by_type.\
        assert_called_once_with(type)


def test_get_base_embeddings_by_type_raises_404_when_no_documents(
    prescription_service, mock_prescription_repository
):
    """Test that raises an HTTPException when no documents are found."""
    # Arrange
    type = "test_type"
    mock_prescription_repository.get_base_embeddings_by_type.return_value = []

    # Act & Assert
    with pytest.raises(HTTPException) as exc_info:
        prescription_service.get_base_embeddings_by_type(type)

    assert exc_info.value.status_code == 404
    assert exc_info.value.detail == "Base embeddings not found"
    mock_prescription_repository.get_base_embeddings_by_type.\
        assert_called_once_with(type)


def test_get_base_embeddings_by_type_handles_empty_embeddings(
    prescription_service, mock_prescription_repository
):
    """Test that handles documents with empty embeddings."""
    # Arrange
    type = "test_type"
    mock_documents = [
        {"embeddings": []},
        {"embeddings": [[0.1, 0.2, 0.3]]}
    ]
    mock_prescription_repository.get_base_embeddings_by_type.return_value = (
        mock_documents
    )

    # Act
    result = prescription_service.get_base_embeddings_by_type(type)

    # Assert
    assert result == [[0.1, 0.2, 0.3]]
    mock_prescription_repository.get_base_embeddings_by_type.\
        assert_called_once_with(type)


def test_process_prescription_upload_valid(
    prescription_service, mock_prescription_repository
):
    """Test that returns valid=True and text when everything is correct."""
    # Arrange
    file = MagicMock()
    type = "test_type"
    texto_extraido = "Texto de prueba"
    embedding = [0.1, 0.2, 0.3]
    base_embeddings = [[0.4, 0.5, 0.6], [0.7, 0.8, 0.9]]

    with patch("app.services.prescription_service.extract_text_from_file", return_value=texto_extraido):
        with patch("app.services.prescription_service.generate_embedding_modelReceipt", return_value=embedding):
            with patch("app.services.prescription_service.validate_prescription", side_effect=lambda e1, e2: e1 == embedding and e2 == base_embeddings[0]):
                mock_prescription_repository.get_base_embeddings_by_type.return_value = [{"embeddings": base_embeddings}]

                mock_prescription_repository.get_base_embeddings_by_type.return_value = \
                    [{"embeddings": base_embeddings}]
                valid, texto = prescription_service.process_prescription_upload(file, type)

                # Assert
                assert valid is True
                assert texto == texto_extraido
                mock_prescription_repository.get_base_embeddings_by_type.assert_called_once_with(type)


def test_process_prescription_upload_no_base_embeddings(prescription_service, mock_prescription_repository):
    """Test that process_prescription_upload raises HTTPException when no base embeddings are found."""
    # Arrange
    file = MagicMock()
    type = "test_type"

    with patch("app.services.prescription_service.extract_text_from_file", return_value="Texto de prueba"):
        with patch("app.services.prescription_service.generate_embedding_modelReceipt", return_value=[0.1, 0.2, 0.3]):
            mock_prescription_repository.get_base_embeddings_by_type.return_value = []

            # Act & Assert
            with pytest.raises(HTTPException) as exc_info:
                prescription_service.process_prescription_upload(file, type)

            # Assert
            assert exc_info.value.status_code == 404
            assert exc_info.value.detail == "Base embeddings not found"


def test_process_prescription_upload_invalid_user_embedding(prescription_service, mock_prescription_repository):
    """Test that process_prescription_upload raises ValueError when the user embedding is invalid."""
    # Arrange
    file = MagicMock()
    type = "test_type"

    with patch("app.services.prescription_service.extract_text_from_file", return_value="Texto de prueba"):
        with patch("app.services.prescription_service.generate_embedding_modelReceipt", return_value=[]):
            mock_prescription_repository.get_base_embeddings_by_type.return_value = [{"embeddings": [[0.4, 0.5, 0.6]]}]

            # Act & Assert
            with pytest.raises(ValueError, match="Embedding del usuario no es un vector 1-D válido"):
                prescription_service.process_prescription_upload(file, type)


def test_process_prescription_upload_invalid_base_embedding(prescription_service, mock_prescription_repository):
    """Test that process_prescription_upload raises ValueError when a base embedding is invalid."""
    # Arrange
    file = MagicMock()
    type = "test_type"

    with patch("app.services.prescription_service.extract_text_from_file", return_value="Texto de prueba"):
        with patch("app.services.prescription_service.generate_embedding_modelReceipt", return_value=[0.1, 0.2, 0.3]):
            mock_prescription_repository.get_base_embeddings_by_type.return_value = [{"embeddings": [[]]}]

            # Act & Assert
            with pytest.raises(ValueError, match="Uno de los embeddings base no es válido"):
                prescription_service.process_prescription_upload(file, type)


def test_save_prescription_electronica_valid(prescription_service, mock_prescription_repository):
    """Test that save_prescription saves a valid electronic prescription."""
    # Arrange
    user = "test_user"
    type = "Electrónica"
    text = "Texto de receta electrónica"
    filename = "receta.pdf"
    form_data = {
        "status": "valid",
        "validFrom": "2023-04-01",
        "validTo": "2023-04-30",
        "doctor": "Dr. Test",
        "products": [{"name": "Producto 1", "price": 10.0}]
    }
    mock_prescription_repository.save.return_value = {
        "id": "12345",
        **form_data,
        "discount": 0.6  # Incluye el campo 'discount'
    }

    with patch.object(prescription_service, "extract_electronic_prescription_data", return_value=form_data):
        # Act
        result = prescription_service.save_prescription(user, type, text, filename)

        # Assert
        assert result["id"] == "12345"
        assert result["products"] == form_data["products"]
        assert result["discount"] == 0.6
        mock_prescription_repository.save.assert_called_once_with({
            "user": user,
            "filename": filename,
            "type": type,
            "status": form_data["status"],
            "validFrom": form_data["validFrom"],
            "validTo": form_data["validTo"],
            "doctor": form_data["doctor"],
            "discount": 0.6,
            "products": form_data["products"],
        })


def test_save_prescription_private_valid(prescription_service, mock_prescription_repository):
    """Test that save_prescription saves a valid private prescription."""
    # Arrange
    user = "test_user"
    type = "Privada"
    text = "Texto de receta privada"
    filename = "receta.pdf"
    form_data = {
        "status": "valid",
        "validFrom": "2023-04-01",
        "validTo": "2023-04-30",
        "doctor": "Dr. Test",
        "products": [{"name": "Producto 1", "price": 10.0}]
    }
    mock_prescription_repository.save.return_value = {
        "id": "12345",
        **form_data,
        "discount": 0  # Incluye el campo 'discount'
    }

    with patch.object(prescription_service, "extract_private_prescription_data", return_value=form_data):
        # Act
        result = prescription_service.save_prescription(user, type, text, filename)

        # Assert
        assert result["id"] == "12345"
        assert result["products"] == form_data["products"]
        assert result["discount"] == 0
        mock_prescription_repository.save.assert_called_once_with({
            "user": user,
            "filename": filename,
            "type": type,
            "status": form_data["status"],
            "validFrom": form_data["validFrom"],
            "validTo": form_data["validTo"],
            "doctor": form_data["doctor"],
            "discount": 0,
            "products": form_data["products"],
        })


def test_save_prescription_no_products(prescription_service):
    """Test that save_prescription raises HTTPException when no products are found."""
    # Arrange
    user = "test_user"
    type = "Electrónica"
    text = "Texto de receta electrónica"
    filename = "receta.pdf"
    form_data = {
        "status": "valid",
        "validFrom": "2023-04-01",
        "validTo": "2023-04-30",
        "doctor": "Dr. Test",
        "products": []
    }

    with patch.object(prescription_service, "extract_electronic_prescription_data", return_value=form_data):
        # Act & Assert
        with pytest.raises(HTTPException) as exc_info:
            prescription_service.save_prescription(user, type, text, filename)

        # Assert
        assert exc_info.value.status_code == 400
        assert exc_info.value.detail == "No se encontraron productos en la receta."


def test_clean_prescription_product_name_removes_numbers(prescription_service):
    """Test que verifica que se eliminan los números rodeados de espacios."""
    # Arrange
    product_name = "Ibuprofeno 600 mg"

    # Act
    result = prescription_service.clean_prescription_product_name(product_name)

    # Assert
    assert result == "Ibuprofeno mg"


def test_clean_prescription_product_name_removes_extra_spaces(prescription_service):
    """Test que verifica que se eliminan espacios múltiples y se hace strip."""
    # Arrange
    product_name = "  Ibuprofeno   600   mg  "

    # Act
    result = prescription_service.clean_prescription_product_name(product_name)

    # Assert
    assert result == "Ibuprofeno mg"


def test_clean_prescription_product_name_handles_empty_string(prescription_service):
    """Test que verifica que una cadena vacía se maneja correctamente."""
    # Arrange
    product_name = ""

    # Act
    result = prescription_service.clean_prescription_product_name(product_name)

    # Assert
    assert result == ""


def test_clean_prescription_product_name_no_numbers(prescription_service):
    """Test que verifica que no se alteran cadenas sin números rodeados de espacios."""
    # Arrange
    product_name = "Paracetamol mg"

    # Act
    result = prescription_service.clean_prescription_product_name(product_name)

    # Assert
    assert result == "Paracetamol mg"


def test_delete_prescription_success(prescription_service, mock_prescription_repository):
    """Test que verifica que una receta se elimina correctamente."""
    # Arrange
    prescription_id = "12345"
    mock_prescription_repository.delete.return_value = True

    # Act
    result = prescription_service.delete_prescription(prescription_id)

    # Assert
    assert result == {"message": "Prescription deleted successfully"}
    mock_prescription_repository.delete.assert_called_once_with(prescriptionId=prescription_id)


def test_delete_prescription_not_found(prescription_service, mock_prescription_repository):
    """Test que verifica que se lanza una excepción HTTPException cuando la receta no se encuentra."""
    # Arrange
    prescription_id = "12345"
    mock_prescription_repository.delete.return_value = False

    # Act & Assert
    with pytest.raises(HTTPException) as exc_info:
        prescription_service.delete_prescription(prescription_id)

    # Assert
    assert exc_info.value.status_code == 404
    assert exc_info.value.detail == "Prescription not found"
    mock_prescription_repository.delete.assert_called_once_with(prescriptionId=prescription_id)