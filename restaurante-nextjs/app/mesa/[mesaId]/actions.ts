'use server';

import { revalidatePath } from 'next/cache';
import type { EstadoMesa, Mesa } from '../../../src/types';

// Datos iniciales de las mesas
const mesasIniciales: Mesa[] = [
  {
    _id: '1',
    numero: 1,
    capacidad: 4,
    estado: 'disponible',
    ubicacion: 'Salón',
  },
  {
    _id: '2',
    numero: 2,
    capacidad: 4,
    estado: 'ocupada',
    ubicacion: 'Salón',
  },
  {
    _id: '3',
    numero: 3,
    capacidad: 6,
    estado: 'reservada',
    ubicacion: 'Terraza',
  },
];

// Declaramos el store global
declare global {
  var _mesasMemoryStore: Mesa[] | undefined;
}

// Si todavía no existe, lo inicializamos
if (!global._mesasMemoryStore) {
  global._mesasMemoryStore = mesasIniciales;
}

// Obtener todas las mesas
export async function obtenerMesas(): Promise<Mesa[]> {
  return global._mesasMemoryStore ?? [];
}

// Obtener una mesa
export async function obtenerMesa(
  mesaId: string
): Promise<Mesa | null> {

  const mesas = global._mesasMemoryStore ?? [];

  const mesa = mesas.find(
    (m) =>
      String(m._id) === String(mesaId) ||
      String(m.numero) === String(mesaId)
  );

  return mesa ? { ...mesa } : null;
}

// Cambiar estado de una mesa
export async function cambiarEstadoMesa(
  mesaId: string,
  nuevoEstado: EstadoMesa
): Promise<
  { ok: true; mesa: Mesa } |
  { ok: false; error: string }
> {

  try {
    const mesas = global._mesasMemoryStore;

    if (!mesas) {
      return {
        ok: false,
        error: 'Store de mesas no inicializado',
      };
    }

    const mesaEncontrada = mesas.find(
      (m) =>
        String(m._id) === String(mesaId) ||
        String(m.numero) === String(mesaId)
    );

    if (!mesaEncontrada) {
      return {
        ok: false,
        error: 'Mesa no encontrada',
      };
    }

    // Cambiar el estado en memoria
    mesaEncontrada.estado = nuevoEstado;

    // Actualizar las rutas
    revalidatePath('/mesas');
    revalidatePath(`/mesa/${mesaId}`);

    return {
      ok: true,
      mesa: { ...mesaEncontrada },
    };

  } catch (err: unknown) {

    const mensaje =
      err instanceof Error
        ? err.message
        : 'Error desconocido';

    return {
      ok: false,
      error: mensaje,
    };
  }
}