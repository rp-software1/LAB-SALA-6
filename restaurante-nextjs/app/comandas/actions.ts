'use server';

import { revalidatePath } from 'next/cache';
import type { EstadoPedido, Pedido } from '../../src/types';

declare global {
  var _pedidosMemoryStore: Pedido[] | undefined;
}

if (!global._pedidosMemoryStore) {
  global._pedidosMemoryStore = [];
}

const TRANSICIONES: Record<string, EstadoPedido> = {
  pendiente: 'en_preparacion' as EstadoPedido,
  en_preparacion: 'listo' as EstadoPedido,
  preparacion: 'listo' as EstadoPedido,
  listo: 'entregado' as EstadoPedido,
  lista: 'entregado' as EstadoPedido,
  entregado: 'pagado' as EstadoPedido,
  entregada: 'pagado' as EstadoPedido,
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
      return { ok: false, error: 'Store de pedidos no inicializado' };
    }

    const pedidoEncontrado = pedidos.find(
      (pedido) => String(pedido._id ?? (pedido as any).id) === String(pedidoId)
    );
  
    if (!pedidoEncontrado) {
      return { ok: false, error: 'Pedido no encontrado' };
    }

    const estadoActual = (pedidoEncontrado.estado ?? 'pendiente').toString().toLowerCase().trim();
    const siguienteEstado = TRANSICIONES[estadoActual];

    if (!siguienteEstado) {
      return { ok: false, error: 'El pedido ya no puede avanzar de estado' };
    }

    // Actualizar estado en memoria de forma flexible
    pedidoEncontrado.estado = nuevoEstado;

    revalidatePath('/comandas');
    revalidatePath('/mesas');

    return {
      ok: true,
      pedido: { ...pedidoEncontrado },
    };
  } catch (error: unknown) {
    const mensaje = error instanceof Error ? error.message : 'Error desconocido al actualizar pedido';
    return { ok: false, error: mensaje };
  }
}