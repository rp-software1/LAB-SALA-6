// src/context/PedidoProvider.tsx
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// Tipos definidos localmente o asegúrate de que existan en ../types
export type TipoPedido = 'mesa' | 'para_llevar';

export interface Plato {
  _id: string;
  nombre: string;
  precio: number;
}

export interface ItemPedido {
  platoId: string;
  nombre: string;
  cantidad: number;
  precioUnitario: number;
}

export interface EstadoPedidoContext {
  mesaId: string | null;
  tipo: TipoPedido;
  estado: string;
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

const initialState: EstadoPedidoContext = {
  mesaId: null,
  tipo: 'para_llevar',
  estado: 'pendiente',
  items: [],
  total: 0,
};

const PedidoContext = createContext<PedidoContextType | undefined>(undefined);

export function usePedido(): PedidoContextType {
  const ctx = useContext(PedidoContext);
  if (!ctx) throw new Error('usePedido debe usarse dentro de PedidoProvider');
  return ctx;
}

export default function PedidoProvider({ children }: { children: ReactNode }) {
  const [pedido, setPedido] = useState<EstadoPedidoContext>(initialState);

  function agregarPlato(plato: Plato): void {
    setPedido((prev: EstadoPedidoContext) => {
      const existente = prev.items.find((i: ItemPedido) => i.platoId === plato._id);
      if (existente) {
        return {
          ...prev,
          items: prev.items.map((i: ItemPedido) =>
            i.platoId === plato._id ? { ...i, cantidad: i.cantidad + 1 } : i
          ),
          total: prev.total + plato.precio,
        };
      }
      return {
        ...prev,
        items: [
          ...prev.items,
          { platoId: plato._id, nombre: plato.nombre, cantidad: 1, precioUnitario: plato.precio },
        ],
        total: prev.total + plato.precio,
      };
    });
  }

  function quitarPlato(platoId: string): void {
    setPedido((prev: EstadoPedidoContext) => {
      const item = prev.items.find((i: ItemPedido) => i.platoId === platoId);
      if (!item) return prev;
      if (item.cantidad === 1) {
        return { ...prev, items: prev.items.filter((i: ItemPedido) => i.platoId !== platoId), total: prev.total - item.precioUnitario };
      } 
      return {
        ...prev,
        items: prev.items.map((i: ItemPedido) => i.platoId === platoId ? { ...i, cantidad: i.cantidad - 1 } : i),
        total: prev.total - item.precioUnitario,
      };
    });
  }

  function cambiarTipo(tipo: TipoPedido): void {
    setPedido((prev: EstadoPedidoContext) => ({ ...prev, tipo }));
  }

  function asignarMesa(mesaId: string): void {
    setPedido((prev: EstadoPedidoContext) => ({ ...prev, mesaId, tipo: 'mesa' }));
  }

  function limpiarPedido(): void {
    setPedido(initialState);
  }

  return (
    <PedidoContext.Provider value={{ pedido, agregarPlato, quitarPlato, cambiarTipo, asignarMesa, limpiarPedido }}>
      {children}
    </PedidoContext.Provider>
  );
}