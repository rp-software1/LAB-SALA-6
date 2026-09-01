'use server';

import { revalidatePath } from 'next/cache';
import type { EstadoMesa, Mesa } from '../../../src/types';

export async function cambiarEstadoMesa( 
  mesaId: string,
  nuevoEstado: EstadoMesa
): Promise<{ ok: true; mesa: Mesa } | { ok: false; error: string }> {
  try {
    const mesas = global._mesasMemoryStore;
    if (!mesas) {
      return { ok: false, error: 'Store de mesas no inicializado' };  
    }

    const mesaEncontrada = mesas.find(
      (m) => String(m._id) === String(mesaId) || String(m.numero) === String(mesaId)
    );

    if (!mesaEncontrada) {
      return { ok: false, error: 'Mesa no encontrada' };
    }

    // Actualizamos el valor en memoria de forma real
    mesaEncontrada.estado = nuevoEstado;

    revalidatePath('/mesas');
    revalidatePath(`/mesa/${mesaId}`);

    return { ok: true, mesa: { ...mesaEncontrada } };
  } catch (err: unknown) {
    const mensaje = err instanceof Error ? err.message : "Error desconocido";
    return { ok: false, error: mensaje };
  }
}