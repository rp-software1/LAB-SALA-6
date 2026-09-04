import type { Metadata } from 'next';
import type { Mesa } from '../../src/types';
import { getMesas } from '../../src/services/api';
import MesaCard from './MesaCard';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
 
export const metadata: Metadata = { 
  title: 'Mesas',
  description: 'Gestiona las mesas del restaurante — ve su estado y asigna comandas.',
};

export default async function MesasPage() {
  const mesas: Mesa[] = await getMesas();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Mesas del Restaurante</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {mesas.map((mesa: Mesa) => (
          <MesaCard key={mesa._id ?? mesa.numero} mesa={mesa} />
        ))}
      </div>
    </div>
  );
}