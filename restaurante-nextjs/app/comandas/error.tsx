'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function ComandasError({
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

      <p className="text-4xl mb-4">
        ⚠️
      </p>

      <h2 className="text-xl font-bold mb-2">
        Error al cargar las comandas
      </h2>

      <p className="text-gray-500 mb-6 text-sm">
        {error.message}
      </p>

      <div className="flex gap-3 justify-center">

        <button
          onClick={reset}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Reintentar
        </button>

        <Link
          href="/mesas"
          className="border border-gray-300 px-4 py-2 rounded text-gray-600 hover:bg-gray-100"
        >
          Ir a mesas
        </Link>

      </div>

    </div>
  );
}