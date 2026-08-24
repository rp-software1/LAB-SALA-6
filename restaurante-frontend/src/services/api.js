import axios from "axios";

import { platosMock } from "../data/platos.mock";
import { mesasMock } from "../data/mesas.mock";

const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

// Crear instancia base de Axios
const api = axios.create({
  baseURL: BASE_URL,
});

// ───────────── PLATOS ─────────────

export async function getPlatos() {
  try {
    const response = await api.get("/api/platos");

    return response.data;
  } catch (error) {
    console.warn(
      "Backend no disponible. Cargando platos mock...",
      error.message
    );

    return platosMock;
  }
}

// ───────────── MESAS ─────────────

export async function getMesas() {
  try {
    const response = await api.get("/api/mesas");

    return response.data;
  } catch (error) {
    console.warn(
      "Backend no disponible. Cargando mesas mock...",
      error.message
    );

    return mesasMock;
  }
}

export async function getMesasDisponibles() {
  try {
    const response = await api.get(
      "/api/mesas?estado=disponible"
    );

    return response.data;
  } catch (error) {
    console.warn(
      "Backend no disponible. Filtrando mesas mock disponibles...",
      error.message
    );

    return mesasMock.filter(
      (mesa) =>
        mesa.estado === "disponible" ||
        mesa.estado === "libre"
    );
  }
}

// ───────────── PEDIDOS ─────────────

export async function crearPedido(pedidoData) {
  try {
    const response = await api.post(
      "/api/pedidos",
      pedidoData
    );

    return response.data;
  } catch (error) {
    console.warn(
      "Backend no disponible. Simulando creación de pedido mock...",
      error.message
    );

    // Retorna una respuesta simulada exitosa
    return {
      _id: "mock_pedido_" + Date.now(),
      ...pedidoData,
      estado: "pendiente",
      createdAt: new Date().toISOString(),
    };
  }
}

export async function getPedido(id) {
  try {
    const response = await api.get(
      `/api/pedidos/${id}`
    );

    return response.data;
  } catch (error) {
    console.warn(
      "Backend no disponible. Simulando lectura de pedido mock...",
      error.message
    );

    return {
      _id: id,
      estado: "pendiente",
      items: [],
      total: 0,
    };
  }
}

export async function cambiarEstadoPedido(id, estado) {
  try {
    const response = await api.patch(
      `/api/pedidos/${id}/estado`,
      {
        estado: estado,
      }
    );

    return response.data;
  } catch (error) {
    console.warn(
      "Backend no disponible. Simulando cambio de estado mock...",
      error.message
    );

    return {
      _id: id,
      estado: estado,
    };
  }
}

export default api;