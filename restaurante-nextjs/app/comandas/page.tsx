import type { Metadata } from 'next';
import type { Pedido } from "../../src/types";
import { getPedidos } from '../../src/services/api';
import ComandaCard from "./ComandaCard";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Comandas — Restaurante',
};

const ORDEN: Record<string, number> = {
  pendiente: 0, 
  en_preparacion: 1, 
  preparacion: 1,
  lista: 2, 
  listo: 2,
  entregada: 3, 
  cancelada: 4,
  cerrada: 5,
};

export default async function ComandasPage() {
  const pedidos: Pedido[] = await getPedidos();
  
  const ord = [...pedidos].sort((a, b) => {
    const estA = (a.estado ?? 'pendiente').toString().toLowerCase().trim();
    const estB = (b.estado ?? 'pendiente').toString().toLowerCase().trim();
    return (ORDEN[estA] ?? 99) - (ORDEN[estB] ?? 99);
  });

  const activos = ord.filter(p => {
    const est = (p.estado ?? 'pendiente').toString().toLowerCase().trim();
    return est !== 'entregada' && est !== 'cancelada' && est !== 'cerrada';
  });
  
  const cerrados = ord.filter(p => {
    const est = (p.estado ?? 'pendiente').toString().toLowerCase().trim();
    return est === 'entregada' || est === 'cancelada' || est === 'cerrada';
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Panel de Comandas</h1>
      
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Activas ({activos.length})</h2>
        {activos.length === 0 ? (
          <p className="text-gray-400 text-sm">No hay comandas activas</p>
        ) : (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {activos.map((pedido: Pedido, index: number) => (
              <ComandaCard key={pedido._id ?? (pedido as any).id ?? index} pedido={pedido} />
            ))}
          </div>
        )}
      </section>

      {cerrados.length > 0 && (
        <section className="opacity-60">
          <h2 className="text-lg font-semibold text-gray-400 mb-3">Cerradas ({cerrados.length})</h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {cerrados.map((pedido: Pedido, index: number) => (
              <ComandaCard key={pedido._id ?? (pedido as any).id ?? index} pedido={pedido} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}