"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function MenuError({
  error,
  reset,
}: ErrorProps) {
  useEffect(() => {
    console.error(
      "Error en /menu:",
      error.message
    );
  }, [error]);

  return (
    <div className="mt-12 text-center">
      <p className="mb-4 text-4xl">⚠️</p>

      <h2 className="mb-2 text-xl font-bold">
        No se pudo cargar el menú
      </h2>

      <p className="mb-6 text-sm text-gray-500">
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