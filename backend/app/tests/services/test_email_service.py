import pytest
from unittest.mock import patch, MagicMock
from app.services.email_service import send_email


@patch("app.services.email_service.SendGridAPIClient")
def test_send_email_success(mock_sendgrid_client):
    # Simular una respuesta con status_code 202 (éxito)
    mock_client_instance = MagicMock()
    mock_client_instance.send.return_value.status_code = 202
    mock_sendgrid_client.return_value = mock_client_instance

    status_code = send_email(
        to_email="test@example.com",
        subject="Test Subject",
        content="<p>Test Content</p>"
    )

    assert status_code == 202
    mock_sendgrid_client.assert_called_once()
    mock_client_instance.send.assert_called_once()


@patch("app.services.email_service.SendGridAPIClient")
def test_send_email_failure(mock_sendgrid_client):
    # Simular un error al enviar el correo
    mock_client_instance = MagicMock()
    mock_client_instance.send.side_effect = Exception("Error de red")
    mock_sendgrid_client.return_value = mock_client_instance

    with pytest.raises(Exception) as exc_info:
        send_email(
            to_email="fail@example.com",
            subject="Should fail",
            content="<p>Failure Content</p>"
        )

    assert "Error de red" in str(exc_info.value)
    mock_sendgrid_client.assert_called_once()
    mock_client_instance.send.assert_called_once()
