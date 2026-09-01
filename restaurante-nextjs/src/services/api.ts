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
const SIMULAR_ERROR_MENU = false;

// Declaraciones globales para mantener la persistencia en memoria (100% Frontend)
declare global {
  var _mesasMemoryStore: Mesa[] | undefined;
  var _pedidosMemoryStore: Pedido[] | undefined;
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

if (!global._pedidosMemoryStore) {
  global._pedidosMemoryStore = [];
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
    setTimeout(resolve, 500);
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

// Obtener pedidos desde el store global en memoria (100% Frontend)
export async function getPedidos(): Promise<Pedido[]> {
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 300);
  });

  return global._pedidosMemoryStore!;
}

// Crear un pedido simulado y guardarlo en memoria resolviendo la relación de la mesa
export async function crearPedido(
  datos: any
): Promise<Pedido> {
  const fechaActual = new Date().toISOString();

  // Buscar el objeto Mesa completo si se proporciona un ID o mesaId
  let mesaObjeto = datos.mesa;
  const targetMesaId = datos.mesaId ?? datos.mesa;

  if (targetMesaId && typeof targetMesaId === 'string') {
    const encontrada = global._mesasMemoryStore?.find(
      (m) => String(m._id) === String(targetMesaId) || String(m.numero) === String(targetMesaId)
    );
    if (encontrada) {
      mesaObjeto = encontrada;
    }
  }

  const nuevoPedido: Pedido = {
    ...datos,
    mesa: mesaObjeto,
    estado: datos.estado ?? "pendiente",
    _id: Math.random()
      .toString(36)
      .substring(2, 9),
    creadoEn: fechaActual,
    actualizadoEn: fechaActual,
  };

  global._pedidosMemoryStore!.push(nuevoPedido);
  return nuevoPedido;
}

// Cambiar el estado de un pedido simulado en memoria
export async function cambiarEstadoPedido(
  pedidoId: string,
  estado: EstadoPedido
): Promise<Pedido> {
  const fechaActual = new Date().toISOString();

  const pedidoExistente = global._pedidosMemoryStore!.find(
    (p) => String(p._id) === String(pedidoId)
  );

  if (pedidoExistente) {
    pedidoExistente.estado = estado;
    pedidoExistente.actualizadoEn = fechaActual;
    return pedidoExistente;
  }

  const pedidoMock: Pedido = {
    _id: pedidoId,
    mesa: global._mesasMemoryStore![0],
    items: [],
    estado,
    total: 0,
    creadoEn: fechaActual,
    actualizadoEn: fechaActual,
  };

  global._pedidosMemoryStore!.push(pedidoMock);
  return pedidoMock;
}