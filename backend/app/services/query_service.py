from fastapi import HTTPException
from app.repositories.query_repository import QueryRepository
from app.models.query_model import Query
from app.services.email_service import send_email


class QueryService:
    def __init__(self):
        self.query_repo = QueryRepository()

    def get_queries(self):
        queries = self.query_repo.get_queries()
        return queries

    def get_queries_by_user(self, user: str):
        query = self.query_repo.get_queries_by_user(user)
        return query

    def add_query(self, query: Query):
        return self.query_repo.add_query(query)

    def send_email_change_status(self, query: Query):
        subject = "Cambio de estado de tu consulta en ecoFarma"
        html_content = f"""
        <html>
        <body style="font-family: Arial, sans-serif; color: #333;">
            <h2>Hola,</h2>
            <p>Te escribimos desde <strong>ecoFarma</strong> para informarte que el estado de tu consulta ha cambiado.</p>

            <h3>Detalles de la consulta</h3>
            <ul>
            <li><strong>Asunto:</strong> {query.subject}</li>
            <li><strong>Fecha de envío:</strong> {query.date}</li>
            <li><strong>Estado actual:</strong> {query.status}</li>
            <li><strong>Farmacéutico asignado:</strong> {query.pharmacist}</li>
            </ul>

            <h3>Tu pregunta</h3>
            <p style="background-color: #f9f9f9; padding: 10px; border-left: 4px solid #007b8f;">
            {query.question}
            </p>
        """

        if query.answer:
            html_content += f"""
            <h3>Respuesta del farmacéutico</h3>
            <p style="background-color: #e8f5e9; padding: 10px; border-left: 4px solid #4caf50;">
            {query.answer}
            </p>
            """

        html_content += """
            <p>Gracias por confiar en nosotros.<br>Atentamente,<br><strong>El equipo de ecoFarma</strong></p>
        </body>
        </html>
        """

        status_code = send_email(
            to_email=query.user,
            subject=subject,
            content=html_content
        )

        if status_code != 200:
            raise HTTPException(
                status_code=500,
                detail="El correo no pudo ser enviado"
            )
        return status_code

    def update_query_status(self, query_id: str, answer: str, status: str):
        query = self.query_repo.update_query_status(query_id, answer, status)
        if not query:
            raise HTTPException(
                status_code=404,
                detail="Consulta no encontrada"
            )
        self.send_email_change_status(query)
        return query
