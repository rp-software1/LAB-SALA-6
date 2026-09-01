import type {
  Mesa,
  Plato,
  Pedido,
  EstadoPedido,
} from "../types";

// true muestra error.tsx.
// false muestra los datos simulados.
const SIMULAR_ERROR_MESAS = false;
const SIMULAR_ERROR_MENU = false;

// Declaración global para mantener la persistencia real de las mesas entre Server Actions y la API
declare global {
  var _mesasMemoryStore: Mesa[] | undefined;
}

if (!global._mesasMemoryStore) {
  global._mesasMemoryStore = [
    {
      _id: "1",
      numero: 1,
      capacidad: 4,
      estado: "disponible",
      ubicacion: "Salón Principal",
    },
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
}

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

// Obtener mesas simuladas desde el store global compartido
export async function getMesas(): Promise<Mesa[]> {
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 500); // Reducido ligeramente para agilizar pruebas
  });

  if (SIMULAR_ERROR_MESAS) {
    throw new Error(
      "Error simulado al cargar las mesas"
    );
  }

  return global._mesasMemoryStore!;
}

// Obtener una mesa por ID simulada
export async function getMesaById(id: string): Promise<Mesa> {
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 200);
  });

  if (SIMULAR_ERROR_MESAS) {
    throw new Error(
      "Error simulado al cargar la mesa"
    );
  }

  const mesa = global._mesasMemoryStore!.find((m) => String(m._id) === String(id));
  if (!mesa) {
    throw new Error(`Mesa con ID ${id} no encontrada`);
  }

  return mesa;
}

// Obtener platos simulados
export async function getPlatos(): Promise<Plato[]> {
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 1000);
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
    mesa: global._mesasMemoryStore![0],
    items: [],
    estado,
    total: 0,
    creadoEn: fechaActual,
    actualizadoEn: fechaActual,
  };

  return Promise.resolve(pedidoMock);
}