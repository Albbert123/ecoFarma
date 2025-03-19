import axios from 'axios';

const API_URL = "https://tu-backend.com/api"; // Cambiar por la URL real

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
