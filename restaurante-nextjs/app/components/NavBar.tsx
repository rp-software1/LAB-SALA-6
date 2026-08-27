// app/components/NavBar.tsx
'use client'; // NavBar usa usePathname (hook) → necesita ser Client Component

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const pathname = usePathname();

  // Función helper — detecta si la ruta está activa
  const esActiva = (ruta: string): string =>
    pathname === ruta
      ? 'font-bold text-blue-700 underline'
      : 'text-gray-700 hover:text-blue-600';

  return (
    <nav className='bg-white shadow px-6 py-3 flex gap-6'>
      <span className='font-bold text-lg mr-4'>🍽 Restaurante</span>
      <Link href='/mesas'   className={esActiva('/mesas')}>Mesas</Link>
      <Link href='/menu'    className={esActiva('/menu')}>Menú</Link>
      <Link href='/carrito' className={esActiva('/carrito')}>Carrito</Link>
    </nav>
  );
}