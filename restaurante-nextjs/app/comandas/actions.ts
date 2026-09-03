'use server';

import { revalidatePath } from 'next/cache';
import type { EstadoPedido, Pedido } from '../../src/types';

declare global {
  var _pedidosMemoryStore: Pedido[] | undefined;
}

// Inicializar store si todavía no existe
if (!global._pedidosMemoryStore) {
  global._pedidosMemoryStore = [];
}

// Estados permitidos
const TRANSICIONES: Partial<Record<EstadoPedido, EstadoPedido>> = {
  pendiente: 'en_preparacion',
  en_preparacion: 'lista',
  lista: 'entregada',
};

export async function avanzarEstadoPedido(
  pedidoId: string,
  nuevoEstado: EstadoPedido
): Promise<
  | { ok: true; pedido: Pedido }
  | { ok: false; error: string }
> {
  try {
    const pedidos = global._pedidosMemoryStore;

    if (!pedidos) {
      return {
        ok: false,
        error: 'Store de pedidos no inicializado',
      };
    }

    const pedidoEncontrado = pedidos.find(
      (pedido) => String(pedido._id) === String(pedidoId)
    );

    if (!pedidoEncontrado) {
      return {
        ok: false,
        error: 'Pedido no encontrado',
      };
    }

    const siguienteEstado =
      TRANSICIONES[pedidoEncontrado.estado];

    // Si no tiene siguiente estado, ya terminó su flujo
    if (!siguienteEstado) {
      return {
        ok: false,
        error: 'El pedido ya no puede avanzar de estado',
      };
    }

    // Evita saltar estados
    if (nuevoEstado !== siguienteEstado) {
      return {
        ok: false,
        error: `No se puede pasar de ${pedidoEncontrado.estado} a ${nuevoEstado}`,
      };
    }

    // Actualizar estado en memoria
    pedidoEncontrado.estado = nuevoEstado;

    // Revalidar páginas afectadas
    revalidatePath('/comandas');
    revalidatePath('/mesas');

    return {
      ok: true,
      pedido: { ...pedidoEncontrado },
    };
  } catch (error: unknown) {
    const mensaje =
      error instanceof Error
        ? error.message
        : 'Error desconocido al actualizar pedido';

    return {
      ok: false,
      error: mensaje,
    };
  }
}