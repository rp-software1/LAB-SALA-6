'use server';

import { revalidatePath } from 'next/cache';
import { cambiarEstadoPedido } from '../../src/services/api';
import type { EstadoPedido } from '../../src/types';

export async function avanzarEstadoPedido(pedidoId: string, nuevoEstado: EstadoPedido) {
  try {
    await cambiarEstadoPedido(pedidoId, nuevoEstado);

    // Revalida tanto las comandas como la vista de mesas
    revalidatePath('/comandas');
    revalidatePath('/mesas');

    return { ok: true };
  } catch (error: any) {
    return { ok: false, error: error.message || 'Error desconocido al actualizar pedido' };
  }
}