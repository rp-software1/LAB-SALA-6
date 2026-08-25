// src/context/PedidoContext.tsx
import React, { createContext, useContext, useState } from 'react';
import type {
  Plato,
  TipoPedido,
  EstadoPedidoContext,
  PedidoContextType,
  ItemPedido,
} from '../types';

// 1. Estado inicial tipado explícitamente
const initialState: EstadoPedidoContext = {
  mesaId: null,
  tipo: 'mesa',
  estado: 'pendiente',
  items: [],
  total: 0,
};

// 2. createContext con tipo genérico — undefined como valor por defecto
const PedidoContext = createContext<PedidoContextType | undefined>(undefined);

// Props del Provider
interface PedidoProviderProps {
  children: React.ReactNode;
}

// 3. Provider con estado y acciones tipadas
export function PedidoProvider({ children }: PedidoProviderProps) {
  const [pedido, setPedido] = useState<EstadoPedidoContext>(initialState);

  // Función auxiliar para calcular el total
  const calcularTotal = (items: ItemPedido[]): number =>
    items.reduce((acc, item) => acc + item.precioUnitario * item.cantidad, 0);

  function agregarPlato(plato: Plato): void {
    setPedido((prev) => {
      const platoId = plato._id || (plato as unknown as { id: string }).id;
      const existe = prev.items.find((i) => i.platoId === platoId);

      const nuevosItems: ItemPedido[] = existe
        ? prev.items.map((i) =>
            i.platoId === platoId ? { ...i, cantidad: i.cantidad + 1 } : i
          )
        : [
            ...prev.items,
            {
              platoId: platoId,
              nombre: plato.nombre,
              cantidad: 1,
              precioUnitario: plato.precio,
            },
          ];

      return {
        ...prev,
        items: nuevosItems,
        total: calcularTotal(nuevosItems),
      };
    });
  }

  function quitarPlato(platoId: string): void {
    setPedido((prev) => {
      const nuevosItems = prev.items
        .map((i) =>
          i.platoId === platoId ? { ...i, cantidad: i.cantidad - 1 } : i
        )
        .filter((i) => i.cantidad > 0);

      return {
        ...prev,
        items: nuevosItems,
        total: calcularTotal(nuevosItems),
      };
    });
  }

  function cambiarTipo(tipo: TipoPedido): void {
    setPedido((prev) => ({
      ...prev,
      tipo,
      mesaId: tipo === 'para_llevar' ? null : prev.mesaId,
    }));
  }

  function asignarMesa(mesaId: string): void {
    setPedido((prev) => ({ ...prev, mesaId, tipo: 'mesa' }));
  }

  function limpiarPedido(): void {
    setPedido(initialState);
  }

  const value: PedidoContextType = {
    pedido,
    agregarPlato,
    quitarPlato,
    cambiarTipo,
    asignarMesa,
    limpiarPedido,
  };

  return (
    <PedidoContext.Provider value={value}>
      {children}
    </PedidoContext.Provider>
  );
}

// 4. Hook personalizado — lanza error si se usa fuera del Provider
export function usePedido(): PedidoContextType {
  const context = useContext(PedidoContext);
  if (!context) {
    throw new Error('usePedido debe usarse dentro de un PedidoProvider');
  }
  return context;
}

// Exportación del contexto
export default PedidoContext;