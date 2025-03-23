import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"; // Cambiar por la URL real
//cuando tenga la real hay q ponerla en el .env.local NEXT_PUBLIC_API_URL=https://mi-backend.com/api

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
