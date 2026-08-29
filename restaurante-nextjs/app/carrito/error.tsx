"use client";

import { useEffect } from "react";

interface CarritoErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function CarritoError({
  error,
  reset,
}: CarritoErrorProps) {
  useEffect(() => {
    console.error(
      "Error en el carrito:",
      error.message
    );
  }, [error]);

  return (
    <div className="mt-12 text-center">
      <p className="mb-4 text-4xl">⚠️</p>

      <h2 className="mb-2 text-xl font-bold">
        Error en el carrito
      </h2>

      <p className="mb-4 text-sm text-gray-500">
        {error.message}
      </p>

      <button
        type="button"
        onClick={reset}
        className="rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
      >
        Reintentar
      </button>
    </div>
  );
}