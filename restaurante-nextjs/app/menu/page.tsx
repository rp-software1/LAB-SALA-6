import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Menú — Restaurante',
};

export default function MenuPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Menú</h1>
      <p className="text-gray-500">Aquí irá el menú de platos — conectar en Día 4</p>
    </div>
  );
}