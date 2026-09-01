'use client';

import { useRouter } from 'next/navigation';
import type { Mesa } from '../../src/types';

interface MesaCardProps {
  mesa: Mesa;
}

// Colores según el estado de la mesa
const colorPorEstado: Record<string, string> = {
  disponible:     'bg-green-100 border-green-400 hover:bg-green-200',
  ocupada:        'bg-red-100   border-red-400   hover:bg-red-200',
  reservada:      'bg-yellow-100 border-yellow-400 hover:bg-yellow-200',
  fuera_servicio: 'bg-gray-100  border-gray-400   hover:bg-gray-200',
};

export default function MesaCard({ mesa }: MesaCardProps) {
  const router = useRouter();

  const handleClick = (): void => {
    // Permitir navegar siempre al detalle para poder cambiar el estado desde ahí
    router.push(`/mesa/${mesa._id}`);
  };

  const estadoKey = mesa.estado?.toLowerCase() || 'disponible';

  return (
    <button
      onClick={handleClick}
      className={`border-2 rounded-lg p-4 text-left w-full cursor-pointer transition-colors
        ${colorPorEstado[estadoKey] || 'bg-white border-gray-200'}
      `}
    >
      <p className="font-bold text-lg">Mesa {mesa.numero}</p>
      <p className="text-sm text-gray-600">Cap: {mesa.capacidad}</p>
      <p className="text-sm capitalize font-medium mt-1">{mesa.estado.replace("_", " ")}</p>
    </button>
  );
}