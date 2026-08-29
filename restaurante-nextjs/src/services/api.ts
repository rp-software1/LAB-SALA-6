// src/services/api.ts

import type {
  Mesa,
  Plato,
  Pedido,
  EstadoPedido,
} from "../types";

// true muestra error.tsx.
// false muestra los datos simulados.
const SIMULAR_ERROR_MESAS = false;
const SIMULAR_ERROR_MENU = true;

const mesaMock: Mesa = {
  _id: "1",
  numero: 1,
  capacidad: 4,
  estado: "disponible",
  ubicacion: "Salón Principal",
};

const mesasMock: Mesa[] = [
  mesaMock,
  {
    _id: "2",
    numero: 2,
    capacidad: 2,
    estado: "ocupada",
    ubicacion: "Salón Principal",
  },
  {
    _id: "3",
    numero: 3,
    capacidad: 6,
    estado: "reservada",
    ubicacion: "Terraza",
  },
  {
    _id: "4",
    numero: 4,
    capacidad: 4,
    estado: "fuera_servicio",
    ubicacion: "Terraza",
  },
];

const platosMock: Plato[] = [
  {
    _id: "p1",
    nombre: "Lomo Saltado",
    descripcion:
      "Jugoso lomo fino salteado con cebolla y tomate",
    precio: 35,
    categoria: "fondos",
    disponible: true,
  },
  {
    _id: "p2",
    nombre: "Ceviche",
    descripcion:
      "Pescado fresco del día marinado en limón peruano",
    precio: 40,
    categoria: "entradas",
    disponible: true,
  },
];

// Obtener mesas simuladas
export async function getMesas(): Promise<Mesa[]> {
  // Esperar 3 segundos para mostrar loading.tsx
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 3000);
  });

  if (SIMULAR_ERROR_MESAS) {
    throw new Error(
      "Error simulado al cargar las mesas"
    );
  }

  return mesasMock;
}

// Obtener platos simulados
export async function getPlatos(): Promise<Plato[]> {
  // Esperar 3 segundos para mostrar loading.tsx
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 3000);
  });

  if (SIMULAR_ERROR_MENU) {
    throw new Error(
      "Error simulado al cargar el menú"
    );
  }

  return platosMock;
}

// Crear un pedido simulado
export async function crearPedido(
  datos: Omit<
    Pedido,
    "_id" | "creadoEn" | "actualizadoEn"
  >
): Promise<Pedido> {
  const fechaActual = new Date().toISOString();

  const nuevoPedido: Pedido = {
    ...datos,
    _id: Math.random()
      .toString(36)
      .substring(2, 9),
    creadoEn: fechaActual,
    actualizadoEn: fechaActual,
  };

  return Promise.resolve(nuevoPedido);
}

// Cambiar el estado de un pedido simulado
export async function cambiarEstadoPedido(
  pedidoId: string,
  estado: EstadoPedido
): Promise<Pedido> {
  const fechaActual = new Date().toISOString();

  const pedidoMock: Pedido = {
    _id: pedidoId,
    mesa: mesaMock,
    items: [],
    estado,
    total: 0,
    creadoEn: fechaActual,
    actualizadoEn: fechaActual,
  };

  return Promise.resolve(pedidoMock);
}