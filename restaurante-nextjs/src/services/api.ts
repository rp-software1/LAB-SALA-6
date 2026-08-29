import type { Mesa, Plato, Pedido, EstadoPedido } from '../types';

const mesaMock: Mesa = { 
  _id: '1', 
  numero: 1, 
  capacidad: 4, 
  estado: 'disponible',
  ubicacion: 'Salón Principal'
};

const mesasMock: Mesa[] = [
  mesaMock,
  { _id: '2', numero: 2, capacidad: 2, estado: 'ocupada', ubicacion: 'Salón Principal' },
  { _id: '3', numero: 3, capacidad: 6, estado: 'reservada', ubicacion: 'Terraza' },
  { _id: '4', numero: 4, capacidad: 4, estado: 'fuera_servicio', ubicacion: 'Terraza' },
];

const platosMock: Plato[] = [
  { 
    _id: 'p1', 
    nombre: 'Lomo Saltado', 
    descripcion: 'Jugoso lomo fino salteado con cebolla y tomate', 
    precio: 35.00, 
    categoria: 'fondos', 
    disponible: true 
  },
  { 
    _id: 'p2', 
    nombre: 'Ceviche', 
    descripcion: 'Pescado fresco del día marinado en limón peruano', 
    precio: 40.00, 
    categoria: 'entradas', 
    disponible: true 
  },
];

export async function getMesas(): Promise<Mesa[]> {
  return Promise.resolve(mesasMock);
}

export async function getPlatos(): Promise<Plato[]> {
  return Promise.resolve(platosMock);
}

export async function crearPedido(
  datos: Omit<Pedido, '_id' | 'creadoEn' | 'actualizadoEn'>
): Promise<Pedido> {
  const nuevoPedido: Pedido = {
    ...datos,
    _id: Math.random().toString(36).substring(2, 9),
    creadoEn: new Date().toISOString(),
    actualizadoEn: new Date().toISOString(),
  };
  return Promise.resolve(nuevoPedido);
}

export async function cambiarEstadoPedido(
  pedidoId: string,
  estado: EstadoPedido
): Promise<Pedido> {
  const pedidoMock: Pedido = {
    _id: pedidoId,
    mesa: mesaMock,
    items: [],
    estado: estado,
    total: 0,
    creadoEn: new Date().toISOString(),
    actualizadoEn: new Date().toISOString(),
  };
  return Promise.resolve(pedidoMock);
}