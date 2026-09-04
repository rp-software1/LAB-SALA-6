'use client';

import { useTransition } from 'react';
import type { Pedido, EstadoPedido } from '../../src/types';
import { avanzarEstadoPedido } from './actions';

interface ComandaCardProps {  
  pedido: Pedido;
}

const SIGUIENTE: Partial<Record<string, EstadoPedido>> = {
  pendiente: 'en_preparacion' as EstadoPedido,
  en_preparacion: 'listo' as EstadoPedido,
  preparacion: 'listo' as EstadoPedido,
  listo: 'entregado' as EstadoPedido,
  lista: 'entregado' as EstadoPedido,
  entregado: 'pagado' as EstadoPedido,
};

const CONFIG: Record<string, { color: string; label: string }> = {
  pendiente:      { color: 'bg-orange-100 border-orange-400 text-orange-800', label: 'Pendiente' },
  en_preparacion: { color: 'bg-blue-100 border-blue-400 text-blue-800',   label: 'En preparación' },
  preparacion:    { color: 'bg-blue-100 border-blue-400 text-blue-800',   label: 'En preparación' },
  listo:          { color: 'bg-purple-100 border-purple-400 text-purple-800', label: 'Lista' },
  lista:          { color: 'bg-purple-100 border-purple-400 text-purple-800', label: 'Lista' },
  entregado:      { color: 'bg-green-100 border-green-400 text-green-800',  label: 'Entregada' },
  pagado:         { color: 'bg-teal-100 border-teal-400 text-teal-800',      label: 'Pagado' },
  cancelada:      { color: 'bg-gray-100 border-gray-400 text-gray-600',    label: 'Cancelada' },
  cerrada:        { color: 'bg-gray-100 border-gray-400 text-gray-600',    label: 'Cerrada' },
};

export default function ComandaCard({ pedido }: ComandaCardProps) {
  const [isPending, startTransition] = useTransition();

  const pedAny = pedido as any;
  const estadoActual = (pedido.estado ?? 'pendiente').toString().toLowerCase().trim();
  const config = CONFIG[estadoActual] ?? CONFIG.pendiente;
  
  // Evitamos que 'pagado' o estados finales intenten buscar un siguiente estado y rompan la lógica
  const siguiente = estadoActual === 'pagado' ? undefined : SIGUIENTE[estadoActual];

  const pedidoId = pedido._id ?? pedAny.id;
  const hora = pedido.creadoEn 
    ? new Date(pedido.creadoEn).toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' }) 
    : '';
  
  const numeroMesa = pedAny.mesaId ?? pedAny.mesa?.numero ?? pedAny.mesa ?? '?';
  const esMesa = pedAny.tipo === 'mesa' || Boolean(pedAny.mesa) || Boolean(pedAny.mesaId);

  const handleAvanzar = (): void => {
    if (!siguiente || !pedidoId) return;
    startTransition(async () => {
      const r = await avanzarEstadoPedido(pedidoId, siguiente);
      if (!r.ok) {
        alert(`Error: ${r.error}`);
      }
    });
  };

  return (
    <div className={`border-2 rounded-lg p-4 ${config.color}`}>
      <div className="flex justify-between items-start mb-2">
        <div>
          <span className="font-bold text-sm">
            {esMesa ? `Mesa ${numeroMesa}` : 'Para llevar'}
          </span>
          <span className="ml-2 text-xs opacity-75">{hora}</span>
        </div>
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/50 border">
          {config.label}
        </span>
      </div>

      <ul className="text-sm mb-3 space-y-1">
        {pedido.items && pedido.items.length > 0 ? (
          pedido.items.map((item: any, index: number) => {
            const nombre = item.nombre ?? item.plato?.nombre ?? 'Plato';
            const precio = item.precioUnitario ?? item.precio ?? item.plato?.precio ?? 0;
            return (
              <li key={item.platoId ?? index} className="flex justify-between">
                <span>{item.cantidad}x {nombre}</span>
                <span>S/ {(precio * item.cantidad).toFixed(2)}</span>
              </li>
            ); 
          })
        ) : (
          <li className="text-xs opacity-60 italic">Sin items registrados</li>
        )}
      </ul>

      <div className="flex justify-between font-bold text-sm border-t border-current/20 pt-2 mb-3">
        <span>Total</span>
        <span>S/ {(pedido.total ?? 0).toFixed(2)}</span>
      </div>

      {siguiente && (
        <button
          type="button"
          onClick={handleAvanzar}
          disabled={isPending}
          className="w-full py-2 rounded bg-white/70 hover:bg-white/90 text-sm font-medium disabled:opacity-50 cursor-pointer transition-colors"
        >
          {isPending ? 'Actualizando...' : `Marcar como: ${CONFIG[siguiente]?.label ?? siguiente}`}
        </button>
      )}
    </div>
  );
}