'use client';

import { useRouter } from 'next/navigation';
import type { Mesa } from '../../src/types';
import { usePedido } from '../../src/context/PedidoProvider';

interface MesaCardProps {
  mesa: Mesa;
}

const colorPorEstado: Record<string, string> = {
  disponible:     'bg-green-100 border-green-400 hover:bg-green-200 text-green-900',
  ocupada:        'bg-red-100 border-red-400 hover:bg-red-200 text-red-900',
  reservada:      'bg-yellow-100 border-yellow-400 hover:bg-yellow-200 text-yellow-900',
  fuera_servicio: 'bg-gray-100 border-gray-400 hover:bg-gray-200 text-gray-800',
  mantenimiento:  'bg-gray-100 border-gray-400 hover:bg-gray-200 text-gray-800',
};

export default function MesaCard({ mesa }: MesaCardProps) {
  const router = useRouter();
  const { asignarMesa } = usePedido();

  // Obtener el ID real de la mesa (prioriza _id, luego id, y finalmente numero)
  const idMesa = String(mesa._id ?? (mesa as any).id ?? mesa.numero);

  const handleClick = (): void => {
    // 1. Guarda en el contexto la mesa seleccionada dinámicamente
    asignarMesa(idMesa);

    // 2. Redirige a la ruta individual de la mesa
    router.push(`/mesa/${idMesa}`);
  };

  const estadoKey = (mesa.estado ?? 'disponible').toString().toLowerCase().trim();
  const estadoTexto = estadoKey.replace("_", " ");

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`border-2 rounded-lg p-4 text-left w-full cursor-pointer transition-colors ${
        colorPorEstado[estadoKey] || 'bg-white border-gray-200 text-gray-800'
      }`}
    >
      <p className="font-bold text-lg">Mesa {mesa.numero}</p>
      <p className="text-sm opacity-80">Cap: {mesa.capacidad}</p>
      <p className="text-sm capitalize font-medium mt-1">{estadoTexto}</p>
    </button>
  );
}