import re
import ollama
import requests
import fitz  # PyMuPDF
from bs4 import BeautifulSoup


# Descargar HTML desde URL
def download_html(url):
    response = requests.get(url)
    response.encoding = 'utf-8'
    return response.text


# Extraer texto limpio del HTML
def extract_text_from_html(html_content):
    soup = BeautifulSoup(html_content, 'html.parser')
    text = soup.get_text(separator="\n")
    return text.strip()


# Extraer sección entre dos títulos
def extract_section(text, section_name, next_section=None):
    pattern = rf"{section_name}.*?(?:(?={next_section})|$)"
    matches = re.findall(pattern, text, re.DOTALL | re.IGNORECASE)
    return matches[0].strip() if matches else None


# Función para descargar el PDF
def download_pdf(url, filename):
    response = requests.get(url)
    with open(filename, "wb") as file:
        file.write(response.content)


# Extraer texto del PDF
def extract_text_from_pdf(pdf_path):
    doc = fitz.open(pdf_path)
    text = "\n".join([page.get_text("text") for page in doc])
    return text.strip()


# Llamar a DeepSeek R1 7B para resumir
def extract_product_sections(text):
    prompt = f"""Resume la siguiente informacion de manera clara y concisa.

    El resumen debe contener solo la información más relevante.
    - No incluyas información adicional o irrelevante.
    - No incluyas información redundante.
    - Maximo 200 palabras. No hay mínimo de palabras.

    No incluyas encabezados ni títulos, solo el texto resumido.
    No incluyas introducciones ni conclusiones, solo el resumen.

    Texto:
    {text}
    """

    response = ollama.chat(
        model='deepseek-r1:7b',
        messages=[{"role": "user", "content": prompt}]
    )
    # Imprimir la respuesta para depuración
    return response['message']['content'].strip()


# Función para generar embedding con Ollama
def generate_embedding(text):
    response = ollama.embeddings(model='nomic-embed-text', prompt=text)
    return response['embedding']  # Devuelve la lista de valores del embedding
