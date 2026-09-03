'use client';

import { useState, useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import type { Mesa, EstadoMesa } from '../../../src/types';
import { cambiarEstadoMesa } from './actions';

interface MesaDetalleProps {
  mesa: Mesa;
}

const ESTADOS: { valor: EstadoMesa; etiqueta: string; color: string }[] = [
  { valor: 'disponible',     etiqueta: 'Disponible',        color: 'bg-green-600 hover:bg-green-700' },
  { valor: 'ocupada',        etiqueta: 'Ocupada',           color: 'bg-red-600 hover:bg-red-700' },
  { valor: 'reservada',      etiqueta: 'Reservada',         color: 'bg-yellow-500 hover:bg-yellow-600' },
  { valor: 'fuera_servicio', etiqueta: 'Fuera de servicio', color: 'bg-gray-500 hover:bg-gray-600' },
];

export default function MesaDetalle({ mesa: initialMesa }: MesaDetalleProps) {
  const [mesa, setMesa] = useState<Mesa>(initialMesa);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // Sincroniza el estado local si las props cambian desde el Server Component
  useEffect(() => {
    if (initialMesa) {
      setMesa(initialMesa);
    }
  }, [initialMesa]);

  const handleCambiarEstado = (nuevoEstado: EstadoMesa): void => {
    if (nuevoEstado === mesa.estado || isPending) return;

    startTransition(async () => {
      try {
        const idMesa = String(mesa._id ?? mesa.numero);
        const resultado = await cambiarEstadoMesa(idMesa, nuevoEstado);
        
        if (resultado && resultado.ok) {
          setMesa(resultado.mesa);
          router.refresh();
        } else {
          alert(`Error: ${resultado?.error || "No se pudo actualizar la mesa"}`);
        }
      } catch (err: any) {
        alert("Ocurrió un error al intentar cambiar el estado.");
      }
    });
  };

  const estadoLimpio = (mesa.estado ?? 'disponible').toString().replace("_", " ");

  return (
    <div className="bg-white shadow rounded-lg p-6 space-y-4 border border-gray-100">
      <p className="text-xs text-gray-500">
        ID recibido: <span className="font-mono bg-gray-100 px-2 py-1 rounded text-gray-700">{String(mesa._id ?? mesa.numero)}</span>
      </p>

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
        <div>
          <span className="font-semibold">Número:</span> {mesa.numero}
        </div>
        <div>
          <span className="font-semibold">Capacidad:</span> {mesa.capacidad} personas
        </div> 
        <div>
          <span className="font-semibold">Ubicación:</span> {mesa.ubicacion || 'Salón Principal'}
        </div>
        <div>
          <span className="font-semibold">Estado actual:</span>{" "}
          <span className="uppercase font-bold text-blue-600">{estadoLimpio}</span>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-500 mb-3 font-medium">Cambiar estado de la mesa:</p>
        <div className="flex flex-wrap gap-2">
          {ESTADOS.map(({ valor, etiqueta, color }) => {
            const esActivo = valor === mesa.estado;
            return (
              <button
                key={valor}
                type="button"
                onClick={() => handleCambiarEstado(valor)}
                disabled={isPending || esActivo}
                className={`px-4 py-2 rounded text-white text-sm font-medium transition-all ${color} ${
                  esActivo 
                    ? 'ring-2 ring-offset-2 ring-blue-500 font-bold opacity-100 cursor-default' 
                    : 'opacity-90 hover:opacity-100'
                } ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {esActivo ? `✓ ${etiqueta}` : etiqueta}
              </button>
            );
          })}
        </div>
        {isPending && <p className="text-xs text-blue-600 mt-2 font-medium">Actualizando estado...</p>}
      </div>
    </div>
  );
}