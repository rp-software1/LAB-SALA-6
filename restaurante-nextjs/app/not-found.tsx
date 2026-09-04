import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Página no encontrada',
};

export default function NotFound() {
  return (
    <div className="text-center mt-20">
      <p className="text-6xl mb-4">🍽</p>
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-gray-500 mb-8">Esta página no existe en el restaurante</p>
      <Link
        href="/mesas"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Volver a las mesas
      </Link>
    </div>
  );
}