"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function MesaError({
  error,
  reset,
}: ErrorProps) {
  useEffect(() => {
    console.error("Error en /mesa/[mesaId]:", error.message);
  }, [error]);

  return (
    <div className="max-w-4xl mx-auto p-6 mt-12 text-center bg-red-50 border border-red-200 rounded-lg">
      <p className="mb-4 text-4xl">⚠️</p>

      <h2 className="mb-2 text-xl font-bold text-red-700">
        No se pudo cargar la información de la mesa
      </h2>

      <p className="mb-6 text-sm text-red-600">
        {error.message}
      </p>

      <button
        type="button"
        onClick={reset}
        className="rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 transition"
      >
        Reintentar
      </button>
    </div>
  );
}