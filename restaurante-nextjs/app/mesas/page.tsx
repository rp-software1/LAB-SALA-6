// app/mesas/page.tsx
// Server Component — SIN "use client", SIN useState, SIN useEffect
import type { Metadata } from 'next';
import type { Mesa } from '../../src/types';
import { getMesas } from '../../src/services/api';
import MesaCard from './MesaCard';

export const metadata: Metadata = {
  title: 'Mesas — Restaurante',
};

// La función es async — puede hacer await directamente
export default async function MesasPage() {
  // fetch ocurre en el servidor — el browser nunca ve esta llamada
  const mesas: Mesa[] = await getMesas();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Mesas del Restaurante</h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {mesas.map((mesa: Mesa) => (
          <MesaCard key={mesa._id} mesa={mesa} />
        ))}
      </div>
    </div>
  );
}