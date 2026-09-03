'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function MesaPageError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="text-center mt-12">
      <p className="text-4xl mb-4">⚠️</p>

      <h2 className="text-xl font-bold mb-2">
        Error al cargar la mesa
      </h2>

      <p className="text-gray-500 mb-4 text-sm">
        {error.message}
      </p>

      <div className="flex gap-3 justify-center">
        <button
          onClick={reset}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Reintentar
        </button>

        <Link
          href="/mesas"
          className="border border-gray-300 px-4 py-2 rounded text-gray-600"
        >
          Volver a mesas
        </Link>
      </div>
    </div>
  );
}