// app/comandas/page.tsx 
import type { Metadata } from 'next';
import type { Pedido } from "../../src/types";
import { getPedidos } from '../../src/services/api';
import ComandaCard from "./ComandaCard";

export const metadata: Metadata = {
  title: 'Comandas — Restaurante',
};

const ORDEN: Record<string, number> = {
  pendiente: 0, 
  en_preparacion: 1, 
  lista: 2, 
  entregada: 3, 
  cancelada: 4,
};

export default async function ComandasPage() {
  const pedidos: Pedido[] = await getPedidos();
  const ord = [...pedidos].sort((a, b) => (ORDEN[a.estado] ?? 5) - (ORDEN[b.estado] ?? 5));
  const activos = ord.filter(p => (p.estado as string) !== 'entregada' && (p.estado as string) !== 'cancelada');
  const cerrados = ord.filter(p => !activos.includes(p));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Panel de Comandas</h1>
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Activas ({activos.length})</h2>
        {activos.length === 0 ? (
          <p className="text-gray-400 text-sm">No hay comandas activas</p>
        ) : (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {activos.map((pedido: Pedido) => (
              <ComandaCard key={pedido._id} pedido={pedido} />
            ))}
          </div>
        )}
      </section>
      {cerrados.length > 0 && (
        <section className="opacity-60">
          <h2 className="text-lg font-semibold text-gray-400 mb-3">Cerradas ({cerrados.length})</h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {cerrados.map((p: Pedido) => (
              <ComandaCard key={p._id} pedido={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}