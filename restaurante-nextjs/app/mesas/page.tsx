import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mesas — Restaurante',
};

export default function MesasPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Mesas</h1>
      <p className="text-gray-500">Aquí irá la lista de mesas — conectar en Día 4</p>
    </div>
  );
}