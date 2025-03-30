import os
from dotenv import load_dotenv
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

# Cargar las variables de entorno desde el archivo .env
load_dotenv()

# Obtener la API Key de SendGrid desde el archivo .env
SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY")

if not SENDGRID_API_KEY:
    raise ValueError(
        "La API Key de SendGrid no está configurada. "
        "Verifica el archivo .env."
    )


def send_email(to_email: str, subject: str, content: str):
    """
    Envía un correo electrónico utilizando SendGrid.

    :param to_email: Dirección de correo del destinatario.
    :param subject: Asunto del correo.
    :param content: Contenido del correo.
    """
    try:
        # Crear el objeto de correo
        message = Mail(
            from_email="ecofarmabcn@gmail.com",
            to_emails=to_email,
            subject=subject,
            html_content=content
        )

        # Enviar el correo utilizando la API de SendGrid
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        response = sg.send(message)

        # Logs para depuración
        print(f"Correo enviado a {to_email}. Estado: {response.status_code}")
        return response.status_code

    except Exception as e:
        print(f"Error al enviar el correo: {e}")
        raise
