from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.aws_service import upload_image_to_s3

router = APIRouter()


@router.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    try:
        image_url = upload_image_to_s3(file)
        return {"message": "Imagen subida correctamente", "url": image_url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
