"use client";

import { useState } from "react";
import type { Mesa, EstadoMesa } from "../../../src/types";
import { cambiarEstadoMesa } from "./actions";

export default function MesaDetalle({ mesa: initialMesa }: { mesa: Mesa }) {
  const [mesa, setMesa] = useState<Mesa>(initialMesa);

  const handleCambiarEstado = async (nuevoEstado: EstadoMesa) => {
    try {
      await cambiarEstadoMesa(mesa._id, nuevoEstado);
      setMesa({ ...mesa, estado: nuevoEstado });
    } catch (err) {
      console.error(err);
    }
  };

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