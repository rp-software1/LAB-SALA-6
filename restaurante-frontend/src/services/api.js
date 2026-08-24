import axios from 'axios';
import { platosMock } from "../data/platos.mock";
import { mesasMock } from "../data/mesas.mock"; // Importamos las mesas mock de respaldo

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Crear la instancia base de Axios
const api = axios.create({
  baseURL: BASE_URL,
});

// ── Platos ───────────────────────────────────────
export async function getPlatos() {
  try {
    const response = await api.get('/api/platos');
    return response.data;
  } catch (error) {
    console.warn("Backend no disponible. Cargando platos mock...", error.message);
    return platosMock;
  }
}

// ── Mesas ────────────────────────────────────────
export async function getMesas() {
  try {
    const response = await api.get('/api/mesas');
    return response.data;
  } catch (error) {
    console.warn("Backend no disponible. Cargando mesas mock...", error.message);
    return mesasMock; // Retorna los datos locales si el servidor falla
  }
}

export async function getMesasDisponibles() {
  try {
    const response = await api.get('/api/mesas?estado=disponible');
    return response.data;
  } catch (error) {
    console.warn("Backend no disponible. Filtrando mesas mock disponibles...", error.message);
    return mesasMock.filter(m => m.estado === 'disponible' || m.estado === 'libre');
  }
}

// ── Pedidos ───────────────────────────────────────
export async function crearPedido(pedidoData) {
  const response = await api.post('/api/pedidos', pedidoData);
  return response.data;
}

export async function getPedido(id) {
  const response = await api.get(`/api/pedidos/${id}`);
  return response.data;
}

export async function cambiarEstadoPedido(id, estado) {
  const response = await api.patch(`/api/pedidos/${id}/estado`, { estado });
  return response.data;
}

export default api;