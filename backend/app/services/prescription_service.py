from datetime import datetime
import re
from typing import Dict, Any, List
from fastapi import HTTPException
from app.repositories.prescription_repository import PrescriptionRepository
from app.services.AI_service import (
    extract_text_from_file,
    genearate_embedding_modelReceipt,
    validate_prescription,
)
from app.services.product_service import ProductService


class PrescriptionService:
    def __init__(self):
        self.prescription_repository = PrescriptionRepository()
        self.product_service = ProductService()

    def get_prescriptions_by_user(self, user):
        # Retrieve the prescriptions from the database
        prescriptions = self.prescription_repository.get_prescriptions_by_user(
            user=user
        )

        return prescriptions

    def process_prescription_upload(self, file, type):
        texto = extract_text_from_file(file)
        embedding = genearate_embedding_modelReceipt(texto)

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
        if type == "Electrónica":
            form_data = self.extract_electronic_prescription_data(text)
        else:
            form_data = self.extract_electronic_prescription_data(text)

        if not form_data["products"]:
            raise HTTPException(status_code=400, detail="No se encontraron productos en la receta.")

        discount = 0.6 if type == "Electrónica" else 1
        prescriptionData = {
            "user": user,
            "filename": filename,
            "type": type,
            "status": form_data["status"],
            "validFrom": form_data["validFrom"],
            "validTo": form_data["validTo"],
            "doctor": form_data["doctor"],
            "discount": discount,
            "products": form_data["products"],
        }
        # Save the prescription to the database
        prescription = self.prescription_repository.save(prescriptionData)

        return prescription

    def extract_electronic_prescription_data(
        self, text: str
    ) -> Dict[str, Any]:
        data = {
            "status": "Activa",
            "validFrom": None,
            "validTo": None,
            "doctor": None,
            "products": [],
        }

        # Buscar fechas
        valid_from_match = re.search(r"del (\d{2}/\d{2}/\d{4})", text)
        valid_to_match = re.search(r"al (\d{2}/\d{2}/\d{4})", text)

        if valid_from_match:
            data["validFrom"] = valid_from_match.group(1)
        if valid_to_match:
            data["validTo"] = valid_to_match.group(1)

        # Determinar estado según fecha actual
        try:
            hoy = datetime.now()
            valid_from = data.get("validFrom")
            valid_to = data.get("validTo")

            # Validar y convertir las fechas
            desde = (
                datetime.strptime(valid_from, "%d/%m/%Y")
                if valid_from
                else None
            )
            hasta = (
                datetime.strptime(valid_to, "%d/%m/%Y") if valid_to else None
            )

            # Determinar el estado
            if desde and hasta:
                data["status"] = (
                    "Activa" if desde <= hoy <= hasta else "Caducada"
                )
            else:
                data["status"] = "Activa"
        except Exception:
            data["status"] = "Activa"

        # Buscar doctor: después de "aplicació" o "comprimit", capturar siguiente palabra en mayúsculas (con posibles puntos)
        doctor = None
        match = re.search(r"(aplicació|comprimit)(.*)", text, re.DOTALL)
        if match:
            after_keyword = match.group(2)
            # Buscar la primera palabra completamente en mayúsculas (puede tener puntos y letras con tilde)
            uppercase_match = re.search(r"\b([A-ZÁÉÍÓÚÑ]{1,}\.?[A-ZÁÉÍÓÚÑ]{2,})\b", after_keyword)
            if uppercase_match:
                doctor = uppercase_match.group(1).strip()

        data["doctor"] = doctor

        # Buscar productos y principio activo
        products_data = self.extract_products_and_actives(text)

        for prod in products_data:
            name = prod["name"]
            active_principle = prod["principle_act"]
            cleaned_name = self.clean_prescription_product_name(name)
            print(f"Nombre limpio: {cleaned_name}")

            product_db = self.get_products_by_prescription(
                product_name=cleaned_name,
                principle_act=active_principle
            )
            # Si es una lista (sin coincidencia exacta), guardar como alternativas
            if isinstance(product_db, list):
                data["products"].append({
                    "principle_act": active_principle,
                    "alternatives": [
                        {
                            "name": p["name"],
                            "price": p["price"],
                            "nregistro": p["nregistro"]
                        }
                        for p in product_db
                    ],
                    "original_name": cleaned_name
                })
            else:
                data["products"].append({
                    "name": product_db["name"],
                    "principle_act": active_principle,
                    "price": product_db["price"],
                    "nregistro": product_db["nregistro"]
                })

        return data

    def extract_products_and_actives(self, text: str) -> List[Dict[str, str]]:
        lines = text.splitlines()
        products = []
        try:
            # Encontrar la línea donde está "Comentaris"
            comentaris_index = next(
                i for i, line in enumerate(lines) if "Comentaris" in line
            )
        except StopIteration:
            return products

        i = comentaris_index + 1
        while i < len(lines):
            # Buscar nombre del producto (línea mayúsculas hasta 'aplicació' o 'comprimit')
            product_line = lines[i]
            if not re.search(r"[A-Z0-9]", product_line):
                i += 1
                continue
            if "aplicació" not in product_line and "comprimit" not in product_line:
                i += 1
                continue
            product_name_part = re.split(r"(aplicació|comprimit)", product_line)[0].strip()

            # Buscar la siguiente línea (hasta 'cada')
            if i + 1 < len(lines):
                second_line = re.split(r"cada", lines[i + 1])[0].strip()
            else:
                second_line = ""

            full_product_name = f"{product_name_part} {second_line}".strip()

            # Buscar principio activo (dos estrategias)
            principle_act = ""
            for j in range(i, min(i + 8, len(lines))):
                if "TOPICA" in lines[j] or "ORAL" in lines[j]:
                    try:
                        before_keyword = re.split(r"(TOPICA|ORAL)", lines[j])[0].strip()
                        last_word = before_keyword.split()[-1]
                        principle_act = last_word
                    except IndexError:
                        # Estrategia alternativa: usar toda la línea siguiente
                        if j + 1 < len(lines):
                            principle_act = lines[j + 1].strip()
                    break

            products.append({
                "name": full_product_name,
                "principle_act": principle_act
            })
            i += 7  # Ir al siguiente producto

        return products

    def get_products_by_prescription(self, product_name: str, principle_act: str):
        # cleaned_name = self.clean_prescription_product_name(product_name)
        # Crear la query combinando el nombre del producto y el principio activo
        query = f"{principle_act}{". name:"}{product_name}"

        # Llamar al método semantic_search desde ProductService
        try:
            search_results = self.product_service.semantic_search(query, limit=3)
            products = search_results.get("products", [])

            # Buscar coincidencia exacta de nombre
            for product in products:
                # Eliminar espacios de ambos nombres y convertir a minúsculas para comparar
                product_name_cleaned = product.get("name", "").replace(" ", "").lower()
                input_name_cleaned = product_name.replace(" ", "").lower()

                print(f"Comparando: {product_name_cleaned} con {input_name_cleaned}")
                if product_name_cleaned == input_name_cleaned:
                    return {
                        "name": product.get("name"),
                        "price": product.get("price"),
                        "nregistro": product.get("nregistro"),
                    }

            # Si no hay coincidencia exacta, devolver los 3 productos con campos clave
            if products:
                return [
                    {
                        "name": p.get("name"),
                        "price": p.get("price"),
                        "nregistro": p.get("nregistro"),
                    }
                    for p in products
                ]
            else:
                return None

        except Exception as e:
            print(f"Error en la búsqueda semántica: {e}")
            return None

    def clean_prescription_product_name(self, product_name: str) -> str:
        # Eliminar números que están exactamente rodeados de espacios
        cleaned = re.sub(r'(?<=\s)\d+(?=\s)', '', product_name)
        
        # # Asegurar un espacio antes de "mg" o "MG" y después si está seguido por un número
        # cleaned = re.sub(r'(?i)(\d)(mg)(\d)', r'\1 mg \3', cleaned)

        # Eliminar espacios múltiples y strip final
        cleaned = re.sub(r'\s+', ' ', cleaned).strip()
        return cleaned
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
