"use server";

import type {
  EstadoPedidoContext,
} from "../../src/types";

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
    // Simula una espera del servidor
    await new Promise<void>((resolve) => {
      setTimeout(resolve, 2000);
    });

    // Validar que el pedido tenga platos
    if (pedido.items.length === 0) {
      return {
        ok: false,
        error: "La comanda no contiene platos",
      };
    }

    // Generar un ID simulado
    const pedidoId = `pedido-${Math.random()
      .toString(36)
      .substring(2, 9)}`;

    console.log("Comanda simulada:", {
      _id: pedidoId,
      mesaId: pedido.mesaId,
      tipo: pedido.tipo,
      estado: "pendiente",
      items: pedido.items,
      total: pedido.total,
      creadoEn: new Date().toISOString(),
    });

    return {
      ok: true,
      pedidoId,
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