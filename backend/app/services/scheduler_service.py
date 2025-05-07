from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime
from app.services.email_service import send_email
from app.repositories.product_repository import ProductRepository

product_repo = ProductRepository()


def check_and_send_reminders():
    now = datetime.utcnow()
    now_str = now.strftime("%Y-%m-%dT%H:%M:%S.000Z")

    # Usamos el repositorio para obtener los recordatorios pendientes
    pending_reminders = product_repo.get_pending_reminders(now_str)
    print(f"🔎 Encontrados {len(pending_reminders)} recordatorios pendientes.")

    for reminder in pending_reminders:
        try:
            subject = "Recordatorio de producto"
            content = f"""
                <h3>Recordatorio de EcoFarma</h3>
                <p>Este es un recordatorio para el producto:</p>
                <ul>
                    <li><strong>Nombre:</strong> {reminder["productName"]}</li>
                    <li><strong>Registro:</strong> {reminder["productNregistro"]}</li>
                </ul>
                <p>¡Gracias por confiar en EcoFarma!</p>
            """

            status = send_email(
                to_email=reminder["user"],
                subject=subject,
                content=content
            )

            if status == 200:
                product_repo.mark_reminder_as_sent(str(reminder["_id"]))
            else:
                print(f"Error al enviar el correo a {reminder['user']}")

        except Exception as e:
            print(f"Error procesando recordatorio {reminder['_id']}: {e}")


def start_scheduler():
    scheduler = BackgroundScheduler()
    scheduler.add_job(check_and_send_reminders, "interval", minutes=1)
    scheduler.start()
