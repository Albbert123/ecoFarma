from bson import ObjectId
from app.constants.prescription_constants import (
    BASE_PRESCRIPTION_DB,
    PRESCRIPTION_DB,
)


class PrescriptionRepository:
    def get_base_embeddings_by_type(self, type):
        cursor = BASE_PRESCRIPTION_DB.find(
            {"tipo": type}, {"embeddings": 1, "_id": 0}
        )
        return list(cursor)

    def get_prescriptions_by_user(self, user):
        # Recuperar les receptes de la base de dades
        prescriptions = PRESCRIPTION_DB.find({"user": user})

        # Convertir ObjectId a string
        prescriptions_list = []
        for prescription in prescriptions:
            if "_id" in prescription:
                prescription["id"] = str(prescription.pop("_id"))
            prescriptions_list.append(prescription)

        return prescriptions_list

    def save(self, prescription):
        # Insertar el documento en la base de datos
        result = PRESCRIPTION_DB.insert_one(prescription)

        # Recuperar el documento completo usando el ID generado
        document = PRESCRIPTION_DB.find_one({"_id": result.inserted_id})

        # Convertir ObjectId a string
        if document and "_id" in document:
            document["id"] = str(document.pop("_id"))

        return document

    def delete(self, prescriptionId):
        # Eliminar el documento de la base de datos
        result = PRESCRIPTION_DB.delete_one({"_id": ObjectId(prescriptionId)})

        # Comprobar si se eliminó algún documento
        if result.deleted_count == 0:
            raise Exception("No se encontró la receta para eliminar")
        return result.deleted_count
