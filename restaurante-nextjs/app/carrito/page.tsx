// app/carrito/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { usePedido } from '../../src/context/PedidoProvider';

export default function CarritoPage() {
  const { pedido, quitarPlato, limpiarPedido } = usePedido();
  const router = useRouter();

  const totalVisual = pedido.items.reduce(
    (acc: number, item: any) => acc + (item.precioUnitario ?? item.plato?.precio ?? 0) * item.cantidad,
    0
  );

  if (pedido.items.length === 0) {
    return (
      <div className="text-center mt-16">
        <p className="text-5xl mb-4">🛒</p>
        <h1 className="text-2xl font-bold mb-4">El carrito está vacío</h1>
        <button
          onClick={() => router.push("/menu")}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Ver el menú
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Tu Carrito</h1>

      <div className="space-y-3 mb-6">
        {pedido.items.map((item: any) => {
          const id = item.platoId ?? item.plato?._id;
          const nombre = item.nombre ?? item.plato?.nombre;
          const precio = item.precioUnitario ?? item.plato?.precio ?? 0;

          return (
            <div key={id} className="flex justify-between items-center bg-white rounded-lg p-4 shadow-sm">
              <div>
                <p className="font-medium">{nombre}</p>
                <p className="text-sm text-gray-500">
                  S/ {precio.toFixed(2)} × {item.cantidad}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold">
                  S/ {(precio * item.cantidad).toFixed(2)}
                </span>
                <button
                  onClick={() => quitarPlato(id)}
                  className="text-red-500 hover:text-red-700 text-lg font-bold"
                >
                  −
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>S/ {totalVisual.toFixed(2)}</span>
        </div>
      </div>

      <div className="mb-3">
        <p className="text-sm text-gray-400 text-center">
          Botón de envío — se conecta en Bloque D
        </p>
      </div>

      <button
        onClick={limpiarPedido}
        className="w-full mt-2 border border-gray-300 rounded py-2 text-gray-500 hover:bg-gray-50"
      >
        Vaciar carrito
      </button>
    </div>
  );
}