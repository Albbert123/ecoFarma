from fastapi import FastAPI
from app.routes.user_routes import api_router  # Importar rutas agrupadas
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir todas las URLs (cámbialo en producción)
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos HTTP
    allow_headers=["*"],  # Permitir todos los headers
)

# Incluir las rutas de usuarios
app.include_router(api_router)


@app.get("/")
def home():
    return {"message": "Bienvenido a ecoFarma API"}
