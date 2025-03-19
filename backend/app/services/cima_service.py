import requests

def get_medicine_data(medicine_name):
    url = f"https://cima.aemps.es/cima/rest/medicamento?nombre={medicine_name}"
    response = requests.get(url)
    return response.json()
