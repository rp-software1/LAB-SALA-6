// app/carrito/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePedido } from "../../src/context/PedidoProvider";
import { enviarComanda } from "./actions";

export default function CarritoPage() {
  const {
    pedido,
    quitarPlato,
    limpiarPedido,
  } = usePedido();

  const router = useRouter();

  const [enviando, setEnviando] =
    useState<boolean>(false);

  const [confirmacion, setConfirmacion] =
    useState<string | null>(null);

  const [errorEnvio, setErrorEnvio] =
    useState<string | null>(null);

  const totalVisual = pedido.items.reduce(
    (acc: number, item: any) => {
      const precio =
        item.precioUnitario ??
        item.plato?.precio ??
        0;

      return acc + precio * item.cantidad;
    },
    0
  );

  const handleEnviar = async (): Promise<void> => {
    setEnviando(true);
    setErrorEnvio(null);

    try {
      const resultado = await enviarComanda(pedido);

      if (resultado.ok) {
        setConfirmacion(resultado.pedidoId);
        limpiarPedido();
      } else {
        setErrorEnvio(resultado.error);
      }
    } catch (error: unknown) {
      const mensaje =
        error instanceof Error
          ? error.message
          : "Error al enviar la comanda";

      setErrorEnvio(mensaje);
    } finally {
      setEnviando(false);
    }
  };

  // Se coloca antes de comprobar si el carrito está vacío
  if (confirmacion) {
    return (
      <div className="mt-16 text-center">
        <p className="mb-4 text-5xl">✅</p>

        <h1 className="mb-2 text-2xl font-bold">
          ¡Comanda enviada!
        </h1>

        <p className="mb-2 font-mono text-sm text-gray-500">
          ID: {confirmacion}
        </p>

        <button
          type="button"
          onClick={() => {
            setConfirmacion(null);
            router.push("/mesas");
          }}
          className="mt-4 rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
        >
          Volver a las mesas
        </button>
      </div>
    );
  }

  if (pedido.items.length === 0) {
    return (
      <div className="mt-16 text-center">
        <p className="mb-4 text-5xl">🛒</p>

        <h1 className="mb-4 text-2xl font-bold">
          El carrito está vacío
        </h1>

        <button
          type="button"
          onClick={() => router.push("/menu")}
          className="rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
        >
          Ver el menú
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold">
        Tu Carrito
      </h1>

      <div className="mb-6 space-y-3">
        {pedido.items.map((item: any) => {
          const id =
            item.platoId ?? item.plato?._id;

          const nombre =
            item.nombre ?? item.plato?.nombre;

          const precio =
            item.precioUnitario ??
            item.plato?.precio ??
            0;

          return (
            <div
              key={id}
              className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm"
            >
              <div>
                <p className="font-medium">
                  {nombre}
                </p>

                <p className="text-sm text-gray-500">
                  S/ {precio.toFixed(2)} ×{" "}
                  {item.cantidad}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-bold">
                  S/{" "}
                  {(precio * item.cantidad).toFixed(
                    2
                  )}
                </span>

                <button
                  type="button"
                  onClick={() => quitarPlato(id)}
                  className="text-lg font-bold text-red-500 hover:text-red-700"
                >
                  −
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mb-6 rounded-lg bg-white p-4 shadow-sm">
        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>

          <span>
            S/ {totalVisual.toFixed(2)}
          </span>
        </div>
      </div>

      {errorEnvio && (
        <p className="mb-3 text-sm text-red-500">
          {errorEnvio}
        </p>
      )}

      <button
        type="button"
        onClick={handleEnviar}
        disabled={enviando}
        className="w-full rounded bg-blue-600 py-3 font-bold text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {enviando
          ? "Enviando comanda..."
          : "Enviar comanda"}
      </button>

      <button
        type="button"
        onClick={limpiarPedido}
        disabled={enviando}
        className="mt-2 w-full rounded border border-gray-300 py-2 text-gray-500 hover:bg-gray-50 disabled:opacity-50"
      >
        Vaciar carrito
      </button>
    </div>
  );
}