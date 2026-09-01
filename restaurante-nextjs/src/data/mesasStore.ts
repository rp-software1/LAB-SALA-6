import type { Mesa } from '../types';

export const mesasStore: Mesa[] = [
  { _id: '1', numero: 1, capacidad: 4, ubicacion: 'Salón Principal', estado: 'disponible' },
  { _id: '2', numero: 2, capacidad: 2, ubicacion: 'Salón Principal', estado: 'ocupada' },
  { _id: '3', numero: 3, capacidad: 6, ubicacion: 'Terraza', estado: 'reservada' },
  { _id: '4', numero: 4, capacidad: 4, ubicacion: 'Terraza', estado: 'fuera_servicio' },
];