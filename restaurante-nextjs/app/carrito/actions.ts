// app/carrito/actions.ts
"use server";

import type {
  EstadoPedidoContext,
} from "../../src/types";
import { crearPedido } from "../../src/services/api";

type ResultadoEnvio =
  | {
      ok: true;
      pedidoId: string;
    }
  | {
      ok: false;
      error: string;
    };

export async function enviarComanda(
  pedido: EstadoPedidoContext
): Promise<ResultadoEnvio> {
  try {
    if (pedido.items.length === 0) {
      return {
        ok: false,
        error: "La comanda no contiene platos",
      };
    }

    const nuevoPedido = await crearPedido({
      mesa: pedido.mesaId ? (pedido.mesaId as unknown as import("../../src/types").Mesa) : (undefined as unknown as import("../../src/types").Mesa),
      items: pedido.items,
      total: pedido.total,
    } as any);

    return {
      ok: true,
      pedidoId: nuevoPedido._id,
    };
  } catch (error: unknown) {
    const mensaje =
      error instanceof Error
        ? error.message
        : "Error desconocido";

    return {
      ok: false,
      error: mensaje,
    };
  }
}