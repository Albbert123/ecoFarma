import requests
import os
from dotenv import load_dotenv
load_dotenv()

# Load environment variables
CIMA_URL_MEDICAMENTO = os.getenv("CIMA_URL_MEDICAMENTO")
CIMA_URL_MEDICAMENTOS = os.getenv("CIMA_URL_MEDICAMENTOS")


def get_product_by_name(medicine_name: str):
    if not CIMA_URL_MEDICAMENTO:
        raise ValueError(
            "La variable de entorno CIMA_URL_MEDICAMENTO no está definida."
        )

    url = f"{CIMA_URL_MEDICAMENTO}?nombre={medicine_name}"
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error al realizar la solicitud a {url}: {e}")
        raise RuntimeError(
            f"No se pudo obtener el producto por nombre: {medicine_name}"
        )


def get_product_by_nregistro(medicine_nregistro: str):
    if not CIMA_URL_MEDICAMENTO:
        raise ValueError(
            "La variable de entorno CIMA_URL_MEDICAMENTO no está definida."
        )

    url = f"{CIMA_URL_MEDICAMENTO}?nregistro={medicine_nregistro}"
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error al realizar la solicitud a {url}: {e}")
        raise RuntimeError(
            f"No se pudo obtener el producto por número de registro: "
            f"{medicine_nregistro}"
        )


def get_products_by_conditions(conditions: dict):
    """
    Obtiene productos de CIMA según las condiciones especificadas.

    :param conditions: Diccionario con las condiciones (clave-valor)
    :return: Respuesta JSON de la API de CIMA.
    """
    if not CIMA_URL_MEDICAMENTOS:
        raise ValueError(
            "La variable de entorno CIMA_URL_MEDICAMENTOS no está definida."
        )

    # Construir la URL con las condiciones
    query_params = "&".join(
        [f"{key}={value}" for key, value in conditions.items()]
    )
    url = f"{CIMA_URL_MEDICAMENTOS}?{query_params}"

    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error al realizar la solicitud a {url}: {e}")
        raise RuntimeError(
            f"No se pudo obtener los productos con las condiciones: "
            f"{conditions}"
        )
