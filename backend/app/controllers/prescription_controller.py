from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile
from app.services.prescription_service import PrescriptionService

router = APIRouter()


@router.get("/{user}")
async def get_prescriptions(
    user: str,
    prescription_service: PrescriptionService = Depends()
):
    # Obtener recetas del usuario
    prescriptions = prescription_service.get_prescriptions_by_user(user)
    return prescriptions


@router.post("/upload/{user}")
async def upload_prescription(
    user: str,
    file: UploadFile = File(...),
    type: str = Form(...),
    prescription_service: PrescriptionService = Depends()
):
    print("Receta subida por el usuario:", user)
    print("Tipo de receta:", type)
    print("Archivo recibido:", file.filename)
    valid, texto = prescription_service.process_prescription_upload(file, type)

    if not valid:
        raise HTTPException(status_code=400, detail="Receta no válida")

    print("Receta valida", valid)
    print("Texto extraído:")
    # Guardar en la base de datos
    prescription = prescription_service.save_prescription(
        user, type, texto
    )
    print("Receta guardada:", prescription)

    return prescription
