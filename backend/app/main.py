from fastapi import FastAPI
from app.routes import user_routes  # Importar rutas de usuario

app = FastAPI()

app.include_router(user_routes.router)


@app.get("/")
def home():
    return {"message": "Bienvenido a ecoFarma API"}
