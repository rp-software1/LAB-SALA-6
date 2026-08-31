"use client";

import { useEffect, useState } from "react";
import { getMesaById } from "../../../src/services/api"; // Ruta relativa
import { Mesa, EstadoMesa } from "../../../src/types"; // Ruta relativa
import { cambiarEstadoMesa } from "./actions";

export default function MesaDetalle({ mesaId }: { mesaId: string }) {
  const [mesa, setMesa] = useState<Mesa | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getMesaById(mesaId)
      .then((data: Mesa) => setMesa(data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [mesaId]);

  const handleCambiarEstado = async (nuevoEstado: EstadoMesa) => {
    if (!mesa) return;
    try {
      await cambiarEstadoMesa(mesa._id, nuevoEstado);
      setMesa({ ...mesa, estado: nuevoEstado });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="text-gray-500">Cargando detalles de la mesa...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!mesa) return <p className="text-gray-500">Mesa no encontrada.</p>;

  return (
    <div className="bg-white shadow rounded-lg p-6 space-y-4">
      <p>
        ID recibido: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{mesa._id}</span>
      </p>
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
        <div>
          <span className="font-semibold">Número:</span> {mesa.numero}
        </div>
        <div>
          <span className="font-semibold">Capacidad:</span> {mesa.capacidad} personas
        </div>
        <div>
          <span className="font-semibold">Ubicación:</span> {mesa.ubicacion}
        </div>
        <div>
          <span className="font-semibold">Estado actual:</span>{" "}
          <span className="uppercase font-bold text-blue-600">{mesa.estado}</span>
        </div>
      </div>

      <div className="pt-4 border-t flex gap-2">
        <button
          onClick={() => handleCambiarEstado("disponible")}
          className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition"
        >
          Marcar Disponible
        </button>
        <button
          onClick={() => handleCambiarEstado("ocupada")}
          className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition"
        >
          Marcar Ocupada
        </button>
      </div>
    </div>
  );
}