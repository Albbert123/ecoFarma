import requests

GOOGLE_USER_INFO_URL = "https://www.googleapis.com/oauth2/v2/userinfo"


def get_google_user_data(access_token: str):
    """Obtiene los datos del usuario desde Google."""
    headers = {"Authorization": f"Bearer {access_token}"}
    response = requests.get(GOOGLE_USER_INFO_URL, headers=headers)
    response.raise_for_status()
    return response.json()  # Devuelve nombre, correo, apellido
