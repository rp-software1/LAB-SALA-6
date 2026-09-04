// app/mesa/[mesaId]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Mesa } from '../../../src/types';
import { getMesas } from '../../../src/services/api';
import MesaDetalle from './MesaDetalle';

interface PageProps {
  params: Promise<{ mesaId: string }>;
}

export default async function MesaDetallePage({ params }: PageProps) {
  // 1. Obtener la variable dinamica mesaId de los parametros
  const { mesaId } = await params;

  // 2. Traer la lista de mesas y buscar la mesa correspondiente por su _id, id o numero
  const mesas: Mesa[] = await getMesas();
  const mesa = mesas.find(
    (m) =>
      String(m._id) === mesaId ||
      String((m as any).id) === mesaId ||
      String(m.numero) === mesaId
  );

  if (!mesa) {
    notFound();
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Link href="/mesas" className="text-blue-600 hover:underline mb-4 inline-block text-sm font-medium">
        ← Volver a las mesas
      </Link>

      <h1 className="text-3xl font-bold mb-4">
        Mesa {mesa.numero} <span className="text-lg font-normal text-gray-500">({mesa.estado})</span>
      </h1>

      {/* Renderizar el componente MesaDetalle pasandole los datos correctos de la mesa encontrada */}
      <MesaDetalle mesa={mesa} />
    </div>
  );
}