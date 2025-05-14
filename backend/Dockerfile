# Usa una imagen de Python optimizada
FROM python:3.11-slim

# Preinstala dependencias básicas necesarias para varias libs (como cryptography, numpy, transformers, etc.)
RUN apt-get update && apt-get install -y \
    build-essential \
    libffi-dev \
    libssl-dev \
    git \
    && rm -rf /var/lib/apt/lists/*

# Establece el directorio de trabajo
WORKDIR /app

# Copia primero solo los requirements (para cachear)
COPY requirements.txt .

# Instala dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Copia el resto del código (incluyendo modelos locales)
COPY . .

# Expone el puerto para FastAPI (por defecto uvicorn usa el 8000)
EXPOSE 8000

# Comando para arrancar tu app (ajústalo si usas otro archivo)
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
