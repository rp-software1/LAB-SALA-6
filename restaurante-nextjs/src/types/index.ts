// src/types/index.ts

export type EstadoMesa =
  | "disponible"
  | "ocupada"
  | "reservada"
  | "fuera_servicio";

export interface Mesa {
  _id: string;
  numero: number;
  capacidad: number;
  estado: EstadoMesa;
  ubicacion?: string;
}

export type CategoriaPlato =
  | "entradas"
  | "fondos"
  | "bebidas"
  | "postres";

export interface Plato {
  _id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: CategoriaPlato;
  imagen?: string;
  disponible: boolean;
}

export type EstadoPedido =
  | "pendiente"
  | "en_preparacion"
  | "servido"
  | "pagado";

export type TipoPedido =
  | "mesa"
  | "para_llevar";

export interface ItemPedido {
  plato: Plato;
  cantidad: number;
  observaciones?: string;
}

export interface EstadoPedidoContext {
  mesaId: string | null;
  tipo: TipoPedido;
  estado: EstadoPedido;
  items: ItemPedido[];
  total: number;
}

export interface Pedido {
  _id: string;
  mesa: Mesa;
  items: ItemPedido[];
  estado: EstadoPedido;
  total: number;
  creadoEn: string;
  actualizadoEn: string;
}