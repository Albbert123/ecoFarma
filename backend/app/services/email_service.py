from googleapiclient.discovery import build
from google.oauth2 import service_account

def send_email(to_email, subject, body):
    credentials = service_account.Credentials.from_service_account_file("credentials.json")
    service = build("gmail", "v1", credentials=credentials)
    
    message = {
        "raw": "Mensaje codificado aquí..."
    }
    service.users().messages().send(userId="me", body=message).execute()
