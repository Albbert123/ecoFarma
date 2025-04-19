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
    valid, texto = prescription_service.process_prescription_upload(file, type)

    if not valid:
        raise HTTPException(status_code=400, detail="Receta no válida")

    # Guardar en la base de datos
    prescription = prescription_service.save_prescription(
        user, type, texto, file.filename
    )

    return prescription


@router.delete("/{prescriptionId}")
async def delete_prescription(
    prescriptionId: str,
    prescription_service: PrescriptionService = Depends()
):
    # Eliminar la receta de la base de datos
    delete = prescription_service.delete_prescription(prescriptionId)
    if not delete:
        raise HTTPException(status_code=404, detail="Receta no encontrada")
    # Devolver la respuesta
    return {"message": "Receta eliminada correctamente"}
