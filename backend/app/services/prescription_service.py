from fastapi import HTTPException
from app.repositories.prescription_repository import PrescriptionRepository
from app.services.AI_service import (
    extract_text_from_file,
    genearate_embedding_model,
    validate_prescription,
)


class PrescriptionService:
    def __init__(self):
        self.prescription_repository = PrescriptionRepository()

    def get_prescriptions_by_user(self, user):
        # Retrieve the prescriptions from the database
        prescriptions = self.prescription_repository.get_prescriptions_by_user(
            user=user
        )

        return prescriptions

    def process_prescription_upload(self, file, type):
        texto = extract_text_from_file(file)
        embedding = genearate_embedding_model(texto)

        # Recuperar el embedding base
        base_embedding_data = self.get_base_embedding_by_type(type)
        if base_embedding_data is None or \
                "embedding" not in base_embedding_data:
            raise ValueError("No se pudo recuperar el base_embedding")

        base_embedding = base_embedding_data["embedding"]

        # Validar que los embeddings sean 1-D
        if not isinstance(embedding, list) or \
                not isinstance(base_embedding, list):
            raise ValueError("Embedding o base_embedding no son listas")

        if len(embedding) == 0 or len(base_embedding) == 0:
            raise ValueError("Embedding o base_embedding están vacíos")

        if not all(isinstance(x, (float, int)) for x in embedding) or \
           not all(isinstance(x, (float, int)) for x in base_embedding):
            raise ValueError("Embedding o base_embedding no son vectores 1-D")

        valid = validate_prescription(embedding, base_embedding)
        print("Validación de receta:", valid)

        return valid, texto

    # def get_prescription_by_id(self, prescription_id):
    #     # Retrieve the prescription from the database
    #     prescription = self.prescription_repository.get_by_id(
    #         prescription_id=prescription_id
    #     )

    #     if not prescription:
    #         raise HTTPException(
    #             status_code=404,
    #             detail="Prescription not found"
    #         )

    #     return prescription

    def get_base_embedding_by_type(self, type):
        # Retrieve the base embedding from the database
        base_embedding = self.prescription_repository.\
            get_base_embedding_by_type(type=type)

        if not base_embedding:
            raise HTTPException(
                status_code=404,
                detail="Base embedding not found"
            )

        return base_embedding

    def save_prescription(
        self, user: str, type: str, text: str, filename: str
    ):
        # Extract the prescription information from the text

        prescriptionData = {
            "user": user,
            "filename": filename,
            "type": type,
            "status": None,
            "validFrom": None,
            "validTo": None,
            "doctor": None,
            "discount": None,
            "products": None,
        }
        # Save the prescription to the database
        prescription = self.prescription_repository.save(prescriptionData)

        return prescription

    # def delete_prescription(self, prescription_id):
    #     # Delete the prescription from the database
    #     result = self.prescription_repository.delete(
    #         prescription_id=prescription_id
    #     )

    #     if not result:
    #         raise HTTPException(
    #             status_code=404,
    #             detail="Prescription not found"
    #         )

    #     return {
    #         "message": "Prescription deleted successfully"
    #     }
