// src/types/index.ts
// Archivo central de tipos del restaurante-frontend
// Todos los tipos se exportan desde aquí — no declarar en otros archivos

// ─── Union types de estados ─────────────────────────────────────────────
export type EstadoMesa =
  | 'disponible' | 'ocupada' | 'reservada' | 'fuera_servicio';

export type TipoPedido = 'mesa' | 'para_llevar';

export type EstadoPedido =
  | 'pendiente' | 'en_preparacion' | 'lista' | 'entregada' | 'cancelada' | 'cerrada';

// ─── Interfaces de entidades ────────────────────────────────────────────
export interface Mesa {
  _id: string;
  numero: number;
  capacidad: number;
  estado: EstadoMesa;
  pedidoActivoId: string | null;
}

export interface Plato {
  _id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  disponible: boolean;
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

// ─── Tipos del Context ─────────────────────────────────────────────────
export interface EstadoPedidoContext {
  mesaId: string | null;
  tipo: TipoPedido;
  estado: EstadoPedido;
  items: ItemPedido[];
  total: number;
}

export interface PedidoContextType {
  pedido: EstadoPedidoContext;
  agregarPlato: (plato: Plato) => void;
  quitarPlato: (platoId: string) => void;
  cambiarTipo: (tipo: TipoPedido) => void;
  asignarMesa: (mesaId: string) => void;
  limpiarPedido: () => void;
}