"use client";

import { useState } from "react";
import type { Plato } from "../../src/types";
import { usePedido } from "../../src/context/PedidoProvider";

interface PlatoCardProps {
  plato: Plato; 
}

export default function PlatoCard({
  plato,
}: PlatoCardProps) {
  const { agregarPlato } = usePedido();
  const [agregado, setAgregado] = useState<boolean>(false);

  const handleAgregar = (): void => {
    agregarPlato(plato); // Agrega el plato al estado global del contexto
    setAgregado(true);

    setTimeout(() => {
      setAgregado(false);
    }, 1500);
  };

  const btnClass = agregado
    ? "rounded bg-green-600 px-4 py-2 text-white"
    : "rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700";

  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <h3 className="mb-1 text-lg font-bold">
        {plato.nombre}
      </h3>   

      <p className="mb-2 text-sm text-gray-500">
        {plato.descripcion}
      </p>

      <p className="mb-3 text-sm capitalize text-gray-400">
        {plato.categoria}
      </p>

      <div className="flex items-center justify-between">
        <span className="font-bold text-blue-700">
          S/ {plato.precio.toFixed(2)}
        </span>

        <button
          type="button"
          onClick={handleAgregar}
          className={btnClass}
        >
          {agregado ? "✓ Agregado" : "Agregar"}
        </button>
      </div>
    </div>
  );
}