import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Carrito — Restaurante',
};

export default function CarritoPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Carrito</h1>
      <p className="text-gray-500">Aquí irá el carrito de comandas — conectar en Día 4</p>
    </div>
  );
}