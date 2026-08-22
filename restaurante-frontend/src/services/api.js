import axios from 'axios';
import { platosMock } from "../data/platos.mock";

const BASE_URL = import.meta.env.VITE_API_URL;

// Crear la instancia base de Axios
const api = axios.create({
  baseURL: BASE_URL,
});

// ── Platos ───────────────────────────────────────
export async function getPlatos() {
  try {
    // Intenta hacer la petición real a la API
    const response = await api.get('/api/platos');
    return response.data;
  } catch (error) {
    // Si el backend no está disponible, usa los datos mock de respaldo
    console.warn("Backend no disponible. Cargando datos mock...", error.message);
    return platosMock;
  }
}

// ── Mesas ────────────────────────────────────────
export async function getMesas() {
  const response = await api.get('/api/mesas');
  return response.data;
}

export async function getMesasDisponibles() {
  const response = await api.get('/api/mesas?estado=disponible');
  return response.data;
}

// ── Pedidos ───────────────────────────────────────
export async function crearPedido(pedidoData) {
  // pedidoData: { mesaId, tipo, items[] }
  const response = await api.post('/api/pedidos', pedidoData);
  return response.data; // pedido creado con _id y estado: pendiente
}

export async function getPedido(id) {
  const response = await api.get(`/api/pedidos/${id}`);
  return response.data;
}

export async function cambiarEstadoPedido(id, estado) {
  // estado: 'en_preparacion' | 'lista' | 'entregada' | 'cancelada'
  const response = await api.patch(`/api/pedidos/${id}/estado`, { estado });
  return response.data;
}

export default api;