// restaurante-frontend/src/context/PedidoContext.jsx
import { createContext, useContext, useState } from 'react';

// 1. Crear el contexto
const PedidoContext = createContext(null);

// 2. Estado inicial
const estadoInicial = {
  mesaId: null,
  tipo: 'mesa',
  estado: 'pendiente',
  items: [],
  total: 0,
};

// 3. Provider con estado y acciones (Bloque A + Bloque C)
export function PedidoProvider({ children }) {
  const [pedido, setPedido] = useState(estadoInicial);

  const calcularTotal = (items) =>
    items.reduce((acc, item) => acc + item.precioUnitario * item.cantidad, 0);

  const agregarPlato = (plato) => {
    setPedido((prev) => {
      const existe = prev.items.find((i) => i.platoId === (plato._id || plato.id));
      const nuevosItems = existe
        ? prev.items.map((i) =>
            i.platoId === (plato._id || plato.id)
              ? { ...i, cantidad: i.cantidad + 1 }
              : i
          )
        : [
            ...prev.items,
            {
              platoId: plato._id || plato.id,
              nombre: plato.nombre,
              cantidad: 1,
              precioUnitario: plato.precio,
            },
          ];
      return { ...prev, items: nuevosItems, total: calcularTotal(nuevosItems) };
    });
  };

  const quitarPlato = (platoId) => {
    setPedido((prev) => {
      const nuevosItems = prev.items
        .map((i) => (i.platoId === platoId ? { ...i, cantidad: i.cantidad - 1 } : i))
        .filter((i) => i.cantidad > 0);
      return { ...prev, items: nuevosItems, total: calcularTotal(nuevosItems) };
    });
  };

  const cambiarTipo = (tipo) => {
    setPedido((prev) => ({
      ...prev,
      tipo,
      mesaId: tipo === 'para_llevar' ? null : prev.mesaId,
    }));
  };

  const asignarMesa = (mesaId) => {
    setPedido((prev) => ({ ...prev, mesaId, tipo: 'mesa' }));
  };

  const limpiarPedido = () => setPedido(estadoInicial);

  return (
    <PedidoContext.Provider
      value={{
        pedido,
        agregarPlato,
        quitarPlato,
        cambiarTipo,
        asignarMesa,
        limpiarPedido,
      }}
    >
      {children}
    </PedidoContext.Provider>
  );
}

// 4. Custom Hook
export function usePedido() {
  const context = useContext(PedidoContext);
  if (!context) throw new Error('usePedido debe usarse dentro de PedidoProvider');
  return context;
}