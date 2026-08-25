// src/services/api.ts

import axios from "axios";
import { platosMock } from "../data/platos.mock";
import { mesasMock } from "../data/mesas.mock";

export type EstadoMesa =
  | "disponible"
  | "ocupada"
  | "reservada"
  | "fuera_servicio";

export type EstadoPedido =
  | "pendiente"
  | "en_preparacion"
  | "lista"
  | "entregada"
  | "cancelada"
  | "cerrada";

export type TipoPedido = "mesa" | "para_llevar";

export interface Plato {
  _id: string;
  id?: string | number;
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
  disponible: boolean;
}

export interface Mesa {
  _id: string;
  id?: string | number;
  numero: number;
  capacidad: number;
  estado: EstadoMesa;
  pedidoActivoId: string | null;
  comensales?: number;
}

export interface ItemPedido {
  platoId: string;
  nombre: string;
  cantidad: number;
  precioUnitario: number;
}

export interface Pedido {
  _id: string;
  mesaId: string | null;
  tipo: TipoPedido;
  estado: EstadoPedido;
  items: ItemPedido[];
  total: number;
  creadoEn: string;
  actualizadoEn: string;
}

export type CrearPedidoData = Omit<
  Pedido,
  "_id" | "creadoEn" | "actualizadoEn"
>;

const BASE_URL =
  (import.meta as ImportMeta & { env?: { VITE_API_URL?: string } }).env
    ?.VITE_API_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: BASE_URL,
});

function obtenerMensajeError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Error desconocido";
}

function normalizarMesa(mesa: {
  _id?: string;
  id?: string | number;
  numero: number;
  capacidad: number;
  estado: string;
  pedidoActivoId?: string | null;
  comensales?: number;
}): Mesa {
  let estadoNormalizado: EstadoMesa = "fuera_servicio";

  if (mesa.estado === "libre" || mesa.estado === "disponible") {
    estadoNormalizado = "disponible";
  } else if (mesa.estado === "ocupada") {
    estadoNormalizado = "ocupada";
  } else if (mesa.estado === "reservada") {
    estadoNormalizado = "reservada";
  } else if (mesa.estado === "fuera_servicio") {
    estadoNormalizado = "fuera_servicio";
  }

  return {
    _id: mesa._id ?? String(mesa.id ?? mesa.numero),
    id: mesa.id ?? mesa._id ?? mesa.numero,
    numero: mesa.numero,
    capacidad: mesa.capacidad,
    estado: estadoNormalizado,
    pedidoActivoId: mesa.pedidoActivoId ?? null,
    comensales: mesa.comensales ?? 0,
  };
}

// ───────────── PLATOS ─────────────

export async function getPlatos(): Promise<Plato[]> {
  try {
    const response = await api.get<Plato[]>("/api/platos");
    return response.data;
  } catch (error: unknown) {
    console.warn(
      "Backend no disponible. Cargando platos mock...",
      obtenerMensajeError(error)
    );

    return platosMock.map((plato) => ({
      ...plato,
      _id: String(plato.id),
    })) as Plato[];
  }
}

// ───────────── MESAS ─────────────

export async function getMesas(): Promise<Mesa[]> {
  try {
    const response = await api.get<Mesa[]>("/api/mesas");
    return response.data;
  } catch (error: unknown) {
    console.warn(
      "Backend no disponible. Cargando mesas mock...",
      obtenerMensajeError(error)
    );

    return mesasMock.map(normalizarMesa);
  }
}

export async function getMesasDisponibles(): Promise<Mesa[]> {
  try {
    const response = await api.get<Mesa[]>(
      "/api/mesas?estado=disponible"
    );

    return response.data;
  } catch (error: unknown) {
    console.warn(
      "Backend no disponible. Filtrando mesas mock disponibles...",
      obtenerMensajeError(error)
    );

    return mesasMock
      .map(normalizarMesa)
      .filter((mesa) => mesa.estado === "disponible");
  }
}

// ───────────── PEDIDOS ─────────────

export async function crearPedido(
  pedidoData: CrearPedidoData
): Promise<Pedido> {
  try {
    const response = await api.post<Pedido>(
      "/api/pedidos",
      pedidoData
    );

    return response.data;
  } catch (error: unknown) {
    console.warn(
      "Backend no disponible. Simulando creación de pedido mock...",
      obtenerMensajeError(error)
    );

    const fechaActual = new Date().toISOString();

    return {
      _id: `mock_pedido_${Date.now()}`,
      ...pedidoData,
      creadoEn: fechaActual,
      actualizadoEn: fechaActual,
    };
  }
}

export async function getPedido(id: string): Promise<Pedido> {
  try {
    const response = await api.get<Pedido>(
      `/api/pedidos/${id}`
    );

    return response.data;
  } catch (error: unknown) {
    console.warn(
      "Backend no disponible. Simulando lectura de pedido mock...",
      obtenerMensajeError(error)
    );

    const fechaActual = new Date().toISOString();

    return {
      _id: id,
      mesaId: null,
      tipo: "para_llevar",
      estado: "pendiente",
      items: [],
      total: 0,
      creadoEn: fechaActual,
      actualizadoEn: fechaActual,
    };
  }
}

export async function cambiarEstadoPedido(
  id: string,
  estado: EstadoPedido
): Promise<Pedido> {
  try {
    const response = await api.patch<Pedido>(
      `/api/pedidos/${id}/estado`,
      { estado }
    );

    return response.data;
  } catch (error: unknown) {
    console.warn(
      "Backend no disponible. Simulando cambio de estado mock...",
      obtenerMensajeError(error)
    );

    const fechaActual = new Date().toISOString();

    return {
      _id: id,
      mesaId: null,
      tipo: "para_llevar",
      estado,
      items: [],
      total: 0,
      creadoEn: fechaActual,
      actualizadoEn: fechaActual,
    };
  }
}

export default api;