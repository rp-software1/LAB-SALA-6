// src/pages/MesasPage.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMesas } from '../services/api';
import { usePedido } from '../context/PedidoContext';
import MesaCard from '../components/MesaCard';
import type { Mesa } from '../types';

export default function MesasPage() {
  // Estado tipado explícitamente como Mesa[] para evitar que TypeScript infiera 'never[]'
  const [mesas, setMesas] = useState<Mesa[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { asignarMesa } = usePedido();
  const navigate = useNavigate();

  useEffect(() => {
    const cargarMesas = async (): Promise<void> => {
      try {
        setLoading(true);
        setError(null);
        const data: Mesa[] = await getMesas();
        setMesas(Array.isArray(data) ? data : []);
      } catch (err: unknown) {
        const mensaje = err instanceof Error ? err.message : 'No se pudieron cargar las mesas';
        setError(mensaje);
      } finally {
        setLoading(false);
      }
    };

    cargarMesas();
  }, []);

  const handleSeleccionar = (mesaId: string): void => {
    asignarMesa(mesaId);
    navigate('/carrito');
  };

  if (loading) return <p style={{ textAlign: 'center', padding: '24px', color: '#6b7280' }}>Cargando mesas...</p>;
  if (error) return <p style={{ textAlign: 'center', padding: '24px', color: '#ef4444' }}>{error}</p>;

  return (
    <section style={{ padding: '24px 16px', maxWidth: '650px', margin: '0 auto' }}>
      <h1
        style={{
          fontFamily: 'system-ui, sans-serif',
          textAlign: 'center',
          fontSize: '28px',
          fontWeight: 'bold',
          color: '#1a202c',
          marginBottom: '24px',
        }}
      >
        Gestión de Mesas
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {mesas.map((mesa, index) => {
          const mesaId = mesa._id || (mesa as unknown as { id: string }).id || String(index);
          return (
            <MesaCard
              key={mesaId}
              id={mesaId}
              numero={mesa.numero}
              capacidad={mesa.capacidad}
              estado={mesa.estado}
              comensales={(mesa as unknown as { comensales?: number }).comensales ?? mesa.capacidad}
              onSeleccionar={() => handleSeleccionar(mesaId)}
            />
          );
        })}
      </div>
    </section>
  );
}