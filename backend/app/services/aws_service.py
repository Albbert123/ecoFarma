import boto3
import uuid
import os
from dotenv import load_dotenv
from fastapi import UploadFile

load_dotenv()

s3_client = boto3.client(
    "s3",
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
    region_name=os.getenv("AWS_REGION"),
)

BUCKET_NAME = os.getenv("S3_BUCKET_NAME")


def upload_image_to_s3(file: UploadFile) -> str:
    """
    Sube una imagen a AWS S3 y devuelve la URL pública del archivo.
    """
    file_extension = file.filename.split(".")[-1]
    file_key = f"user-images/{uuid.uuid4()}.{file_extension}"

    s3_client.upload_fileobj(
        file.file, BUCKET_NAME, file_key, ExtraArgs={"ACL": "private"}
    )

    return f"https://{BUCKET_NAME}.s3.amazonaws.com/{file_key}"
