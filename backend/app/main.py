from fastapi import FastAPI
from app.routes.user_routes import api_router  # Importar rutas agrupadas

app = FastAPI()

# Incluir las rutas de usuarios
app.include_router(api_router)


@app.get("/")
def home():
    return {"message": "Bienvenido a ecoFarma API"}
