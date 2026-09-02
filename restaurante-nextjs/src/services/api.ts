// src/services/api.ts
import type {
  Mesa,   
  Plato,
  Pedido,  
  EstadoPedido,
} from "../types";

const SIMULAR_ERROR_MESAS = false;
const SIMULAR_ERROR_MENU = false;

const MESAS_INICIALES: Mesa[] = [
  { _id: "1", numero: 1, capacidad: 4, estado: "disponible" as any, ubicacion: "Salón Principal" },
  { _id: "2", numero: 2, capacidad: 2, estado: "disponible" as any, ubicacion: "Salón Principal" },
  { _id: "3", numero: 3, capacidad: 6, estado: "ocupada" as any, ubicacion: "Terraza" },
  { _id: "4", numero: 4, capacidad: 4, estado: "fuera_servicio" as any, ubicacion: "Terraza" },
];

declare global {
  var _mesasMemoryStore: Mesa[] | undefined;
  var _pedidosMemoryStore: Pedido[] | undefined;
}

// Función auxiliar para obtener las mesas garantizando que nunca sea undefined
function getMesasStore(): Mesa[] {
  if (!global._mesasMemoryStore || global._mesasMemoryStore.length < 4) {
    global._mesasMemoryStore = JSON.parse(JSON.stringify(MESAS_INICIALES));
  }
  return global._mesasMemoryStore!;
}

// Función auxiliar para obtener los pedidos garantizando que nunca sea undefined
function getPedidosStore(): Pedido[] {
  if (!global._pedidosMemoryStore) {
    global._pedidosMemoryStore = [
      {
        _id: "ped-1",
        mesa: getMesasStore()[2],
        mesaId: "3",
        tipo: "mesa",
        items: [{ platoId: "p1", nombre: "Lomo Saltado", cantidad: 2, precioUnitario: 35 }],
        total: 70,
        estado: "pendiente" as EstadoPedido,
        creadoEn: new Date().toISOString(),
        actualizadoEn: new Date().toISOString(),
      } as any,
      {
        _id: "ped-2",
        mesa: getMesasStore()[0],
        mesaId: "1",
        tipo: "llevar",
        items: [{ platoId: "p2", nombre: "Ceviche", cantidad: 1, precioUnitario: 40 }],
        total: 40,
        estado: "en_preparacion" as EstadoPedido,
        creadoEn: new Date().toISOString(),
        actualizadoEn: new Date().toISOString(),
      } as any,
    ];
  }
  return global._pedidosMemoryStore;
}

const platosMock: Plato[] = [
  {
    _id: "p1",
    nombre: "Lomo Saltado",
    descripcion: "Jugoso lomo fino salteado con cebolla y tomate",
    precio: 35,
    categoria: "fondos",
    disponible: true,
  },
  {
    _id: "p2",
    nombre: "Ceviche",
    descripcion: "Pescado fresco del día marinado en limón peruano",
    precio: 40,
    categoria: "entradas",
    disponible: true,
  },
];

export async function getMesas(): Promise<Mesa[]> {
  await new Promise<void>((r) => setTimeout(r, 50));
  if (SIMULAR_ERROR_MESAS) throw new Error("Error simulado al cargar las mesas");

  const store = getMesasStore();
  return JSON.parse(JSON.stringify(store));
}

export async function getMesaById(id: string): Promise<Mesa> {
  await new Promise<void>((r) => setTimeout(r, 50));
  if (SIMULAR_ERROR_MESAS) throw new Error("Error simulado al cargar la mesa");

  const mesas = await getMesas();
  const mesa = mesas.find(
    (m) => String(m._id) === String(id) || String(m.numero) === String(id)
  );

  if (!mesa) throw new Error(`Mesa con ID ${id} no encontrada`);
  return { ...mesa };
}

export async function cambiarEstadoMesa(
  mesaId: string,
  nuevoEstado: string
): Promise<Mesa> {
  await new Promise<void>((r) => setTimeout(r, 50));

  const store = getMesasStore();
  const index = store.findIndex(
    (m) => String(m._id) === String(mesaId) || String(m.numero) === String(mesaId)
  );

  if (index === -1) {
    throw new Error(`Mesa ${mesaId} no encontrada para cambiar estado`);
  }

  const mesaActualizada: Mesa = {
    ...store[index],
    estado: nuevoEstado as any,
  };

  store[index] = mesaActualizada;

  return JSON.parse(JSON.stringify(mesaActualizada));
}

export async function getPlatos(): Promise<Plato[]> {
  await new Promise<void>((r) => setTimeout(r, 50));
  if (SIMULAR_ERROR_MENU) throw new Error("Error simulado al cargar el menú");
  return JSON.parse(JSON.stringify(platosMock));
}

export async function getPedidos(): Promise<Pedido[]> {
  await new Promise<void>((r) => setTimeout(r, 50));
  const store = getPedidosStore();
  return JSON.parse(JSON.stringify(store));
}

export async function crearPedido(datos: any): Promise<Pedido> {
  await new Promise<void>((r) => setTimeout(r, 50));
  const fechaActual = new Date().toISOString();

  let mesaObjeto = datos.mesa;
  const targetMesaId = datos.mesaId ?? datos.mesa;

  if (targetMesaId) {
    const storeMesas = getMesasStore();
    const encontrada = storeMesas.find(
      (m) => String(m._id) === String(targetMesaId) || String(m.numero) === String(targetMesaId)
    );
    if (encontrada) mesaObjeto = encontrada;
  }

  const nuevoPedido: Pedido = {
    _id: Math.random().toString(36).substring(2, 9),
    mesa: mesaObjeto,
    mesaId: mesaObjeto?._id ?? mesaObjeto?.numero ?? datos.mesaId,
    tipo: datos.tipo ?? (mesaObjeto ? 'mesa' : 'llevar'),
    items: datos.items ?? [],
    total: datos.total ?? 0,
    estado: ((datos.estado ?? "pendiente") as string).toLowerCase().trim() as EstadoPedido,
    creadoEn: fechaActual,
    actualizadoEn: fechaActual,
  } as any;

  const storePedidos = getPedidosStore();
  global._pedidosMemoryStore = [nuevoPedido, ...storePedidos];

  return JSON.parse(JSON.stringify(nuevoPedido));
}

export async function cambiarEstadoPedido(
  pedidoId: string,
  estado: EstadoPedido
): Promise<Pedido> {
  await new Promise<void>((r) => setTimeout(r, 50));
  const estadoNormalizado = (estado as string).toLowerCase().trim() as EstadoPedido;
  const fechaActual = new Date().toISOString();

  const storePedidos = getPedidosStore();

  const index = storePedidos.findIndex(
    (p) => String(p._id) === String(pedidoId) || String((p as any).id) === String(pedidoId)
  );

  if (index !== -1) {
    const pedidoActualizado: Pedido = {
      ...storePedidos[index],
      estado: estadoNormalizado,
      actualizadoEn: fechaActual,
    };
    
    storePedidos[index] = pedidoActualizado;
    return JSON.parse(JSON.stringify(pedidoActualizado));
  }

  const mesaFallback = getMesasStore()[0] ?? MESAS_INICIALES[0];
  const pedidoMock: Pedido = {
    _id: pedidoId,
    mesa: mesaFallback,
    mesaId: mesaFallback._id,
    items: [],
    estado: estadoNormalizado,
    total: 0,
    creadoEn: fechaActual,
    actualizadoEn: fechaActual,
  } as any;

  global._pedidosMemoryStore = [pedidoMock, ...storePedidos];
  return JSON.parse(JSON.stringify(pedidoMock));
}