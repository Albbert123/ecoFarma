from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime
from random import choice
from app.services.email_service import send_email
from app.repositories.product_repository import ProductRepository
from app.repositories.user_repository import UserRepository

product_repo = ProductRepository()
user_repo = UserRepository()


def check_and_send_reminders():
    now = datetime.utcnow()
    now_str = now.strftime("%Y-%m-%dT%H:%M:%S.000Z")

    # Usamos el repositorio para obtener los recordatorios pendientes
    pending_reminders = product_repo.get_pending_reminders(now_str)

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


def send_weekly_newsletter():
    # 1. Obtener usuarios suscritos a la newsletter
    subscribed_users = [user for user in user_repo.get_users() if user.get("newsletter")]

    if not subscribed_users:
        return

    # 2. Obtener productos y elegir uno al azar
    products = product_repo.get_products(limit=5)
    if not products:
        return

    product = choice(products)

    # Calcular rebaja (10% de descuento)
    old_price = product["price"]
    discount = round(old_price * 0.1, 2)
    new_price = round(old_price - discount, 2)

    # 3. Crear contenido del correo
    subject = "📰 EcoFarma: ¡Oferta exclusiva de esta semana!"
    content = f"""
        <h2>🌿 EcoFarma - Tu farmacia de confianza</h2>
        <p>Esta semana te traemos una oferta especial:</p>
        <h3>{product["name"]}</h3>
        <img src="{product["image"]}" alt="{product["name"]}" style="max-width:200px;" />
        <ul>
            <li><strong>Precio original:</strong> {old_price:.2f} €</li>
            <li><strong>Descuento:</strong> -{discount:.2f} €</li>
            <li><strong>Precio final:</strong> <span style="color:green;">{new_price:.2f} €</span></li>
        </ul>
        <p>{product["description"] or "Consulta más detalles en nuestra web."}</p>
        <hr />
        <p>Gracias por confiar en EcoFarma 💚</p>
    """

    # 4. Enviar el email a cada usuario suscrito
    for user in subscribed_users:
        try:
            send_email(
                to_email=user["correo"],
                subject=subject,
                content=content
            )
        except Exception as e:
            print(f"❌ Error al enviar newsletter a {user['correo']}: {e}")


def start_scheduler():
    scheduler = BackgroundScheduler()
    scheduler.add_job(check_and_send_reminders, "interval", minutes=60)

    # Job semanal: cada lunes a las 10:00
    scheduler.add_job(
        send_weekly_newsletter,
        trigger="cron",
        day_of_week="mon",
        hour=10,
        minute=0
    )

    scheduler.start()
