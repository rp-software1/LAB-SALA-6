// app/comandas/ComandaCard.tsx
import type { Pedido } from "../../src/types";

export default function ComandaCard({ pedido }: { pedido: Pedido }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white">
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold text-gray-800">Mesa: {pedido.mesa?.numero ?? 'N/D'}</span>
        <span className="px-2 py-1 text-xs rounded-full font-semibold uppercase bg-gray-100 text-gray-700">
          {pedido.estado}
        </span> 
      </div>
      <div className="text-sm text-gray-600 mb-2">
        {pedido.items && pedido.items.length > 0 ? (
          pedido.items.map((item: any, index: number) => (
            <div key={index}>
              {item.cantidad}x {item.plato?.nombre ?? item.nombre ?? 'Plato'}
            </div>
          ))
        ) : (
          <p className="text-gray-400 italic">Sin items</p>
        )}
      </div>
      <div className="flex justify-between items-center text-xs text-gray-400 border-t pt-2">
        <span>Total: S/. {pedido.total}</span>
        <span>{pedido.creadoEn ? new Date(pedido.creadoEn).toLocaleTimeString() : ''}</span>
      </div>
    </div>
  );
}