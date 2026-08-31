'use client';

import { useState, useTransition } from 'react';
import type { Mesa, EstadoMesa } from '../../../src/types';
import { cambiarEstadoMesa } from './actions';

interface MesaDetalleProps {
  mesa: Mesa;
}

const ESTADOS: { valor: EstadoMesa; etiqueta: string; color: string }[] = [
  { valor: 'disponible',    etiqueta: 'Disponible',         color: 'bg-green-600 hover:bg-green-700' },
  { valor: 'ocupada',       etiqueta: 'Ocupada',            color: 'bg-red-600 hover:bg-red-700' },
  { valor: 'reservada',     etiqueta: 'Reservada',          color: 'bg-yellow-500 hover:bg-yellow-600' },
  { valor: 'fuera_servicio', etiqueta: 'Fuera de servicio', color: 'bg-gray-500 hover:bg-gray-600' },
];

export default function MesaDetalle({ mesa: initialMesa }: MesaDetalleProps) {
  const [mesa, setMesa] = useState<Mesa>(initialMesa);
  const [isPending, startTransition] = useTransition();

  const handleCambiarEstado = (nuevoEstado: EstadoMesa): void => {
    if (nuevoEstado === mesa.estado) return;

    startTransition(async () => {
      try {
        await cambiarEstadoMesa(mesa._id, nuevoEstado);
        setMesa({ ...mesa, estado: nuevoEstado });
      } catch (err: any) {
        console.error("Error al cambiar estado:", err);
        alert(`Error: ${err.message || "No se pudo cambiar el estado"}`);
      }
    });
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

      <div className="pt-4 border-t">
        <p className="text-sm text-gray-500 mb-3 font-medium">Cambiar estado de la mesa:</p>
        <div className="flex flex-wrap gap-2">
          {ESTADOS.map(({ valor, etiqueta, color }) => {
            const esActivo = valor === mesa.estado;
            return (
              <button
                key={valor}
                onClick={() => handleCambiarEstado(valor)}
                disabled={isPending || esActivo}
                className={`px-4 py-2 rounded text-white text-sm font-medium transition-colors ${color} ${
                  esActivo ? 'opacity-100 ring-2 ring-offset-2 ring-gray-400 font-bold' : ''
                } ${isPending ? 'opacity-50 cursor-wait' : ''}`}
              >
                {esActivo ? `✓ ${etiqueta}` : etiqueta}
              </button>
            );
          })}
        </div>
        {isPending && <p className="text-xs text-gray-400 mt-2">Actualizando...</p>}
      </div>
    </div>
  );
}