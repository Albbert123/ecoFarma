import pytest
from unittest.mock import patch
from app.services.email_service import send_email


@patch("app.services.email_service.resend.Emails.send")
def test_send_email_success(mock_resend_send):
    # Simular una respuesta exitosa con un ID
    mock_resend_send.return_value = {"id": "email_1234"}

    status_code = send_email(
        to_email="test@example.com",
        subject="Test Subject",
        content="<p>Test Content</p>"
    )

    assert status_code == 200
    mock_resend_send.assert_called_once()


@patch("app.services.email_service.resend.Emails.send")
def test_send_email_failure(mock_resend_send):
    # Simular un error al enviar el correo
    mock_resend_send.side_effect = Exception("Error de red")

    with pytest.raises(Exception) as exc_info:
        send_email(
            to_email="fail@example.com",
            subject="Should fail",
            content="<p>Failure Content</p>"
        )

    assert "Error de red" in str(exc_info.value)
    mock_resend_send.assert_called_once()
