import os
from dotenv import load_dotenv
import resend

# Cargar variables de entorno
load_dotenv()

RESEND_API_KEY = os.getenv("RESEND_API_KEY")

if not RESEND_API_KEY:
    raise ValueError("La API Key de Resend no está configurada.")

# Configurar Resend
resend.api_key = RESEND_API_KEY


def send_email(to_email: str, subject: str, content: str):
    """
    Envía un correo electrónico utilizando Resend.

    :param to_email: Dirección de correo del destinatario.
    :param subject: Asunto del correo.
    :param content: Contenido HTML del correo.
    :return: Código de estado simulado (200 si ok).
    """
    try:
        response = resend.Emails.send({
            "from": "EcoFarma <notificaciones@ecofarmabcn.forum>",
            "to": [to_email],
            "subject": subject,
            "html": content,
        })

        if response.get("id"):
            return 200  # Éxito
        else:
            return 500

    except Exception as e:
        print(f"Error al enviar el correo con Resend: {e}")
        raise
