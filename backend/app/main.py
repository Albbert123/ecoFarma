from fastapi import FastAPI
from app.routes.user_routes import api_router as user_router
from app.routes.images_routes import api_router as image_router
from app.routes.google_routes import api_router as google_router
from app.routes.product_routes import api_router as product_router
from app.routes.prescription_routes import api_router as prescription_router
from app.routes.order_routes import api_router as order_router
from app.routes.query_routes import api_router as query_router
from app.services.scheduler_service import start_scheduler
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

# Middleware de sesión
app.add_middleware(
    SessionMiddleware,
    secret_key=os.getenv("SECRET_KEY", "supersecretkey"),
)

# Middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Cambiar en producción
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir las rutas
app.include_router(user_router)
app.include_router(image_router)
app.include_router(google_router)
app.include_router(product_router)
app.include_router(prescription_router)
app.include_router(order_router)
app.include_router(query_router)


@app.get("/")
def home():
    return {"message": "Bienvenido a ecoFarma API"}


start_scheduler()
