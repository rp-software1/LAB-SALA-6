import axios from 'axios';
import { platosMock } from "../data/platos.mock";

const BASE_URL = import.meta.env.VITE_API_URL;

export async function getPlatos() {
  try {
    // Intenta hacer la petición real con Axios a localhost:3000
    const response = await axios.get(`${BASE_URL}/api/platos`);
    return response.data;
  } catch (error) {
    // Si el backend no está encendido, usa el mock de respaldo para que no falle
    console.warn("Backend no disponible en localhost:3000. Cargando datos mock...", error.message);
    return platosMock;
  }
}