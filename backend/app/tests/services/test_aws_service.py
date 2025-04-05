from unittest.mock import patch, MagicMock
from app.services.aws_service import upload_image_to_s3


class DummyUploadFile:
    def __init__(self, filename="test.png", content=b"fake_image_data"):
        self.filename = filename
        self.file = MagicMock()
        self.file.read.return_value = content


@patch("app.services.aws_service.s3_client")
def test_upload_image_to_s3_success(mock_s3_client):
    dummy_file = DummyUploadFile(filename="photo.jpg")

    result_url = upload_image_to_s3(dummy_file)

    # Asegura que se haya llamado a upload_fileobj
    mock_s3_client.upload_fileobj.assert_called_once()

    # Validamos que la URL devuelta tenga la estructura esperada
    assert result_url.startswith("https://")
    assert "s3.amazonaws.com/user-images/" in result_url
    assert result_url.endswith(".jpg")
