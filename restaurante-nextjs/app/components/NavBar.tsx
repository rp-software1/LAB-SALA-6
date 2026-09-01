// app/components/NavBar.tsx
'use client'; // NavBar usa usePathname y usePedido (hooks) → necesita ser Client Component
 
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { usePedido } from '../../src/context/PedidoProvider';

export default function NavBar() {
  const pathname = usePathname();
  const { pedido } = usePedido();    

  // Total de unidades en el carrito (suma de cantidades)
  const totalItems = pedido.items.reduce((acc, item) => acc + item.cantidad, 0);

  // Función helper — detecta si la ruta está activa
  const esActiva = (ruta: string): string =>
    pathname === ruta
      ? 'font-bold text-blue-700 underline'
      : 'text-gray-700 hover:text-blue-600';

  return (
    <nav className='bg-white shadow px-6 py-3 flex gap-6 items-center'>
      <span className='font-bold text-lg mr-4'>🍽 Restaurante</span>
      <Link href='/mesas'   className={esActiva('/mesas')}>Mesas</Link>
      <Link href='/menu'    className={esActiva('/menu')}>Menú</Link>
      <Link href='/comandas' className={esActiva('/comandas')}>Comandas</Link>
      <Link href='/carrito' className={`${esActiva('/carrito')} relative`}>
        Carrito
        {totalItems > 0 && (
          <span className="ml-1 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
            {totalItems}
          </span>
        )}
      </Link>
    </nav>
  );
}