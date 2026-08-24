import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMesas } from '../services/api';
import { usePedido } from '../context/PedidoContext';
import MesaCard from '../components/MesaCard.jsx';

export default function MesasPage() {
  const [mesas, setMesas]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const { asignarMesa }       = usePedido();
  const navigate              = useNavigate();

  useEffect(() => {
    getMesas()
      .then(data => setMesas(data))
      .catch(() => setError('No se pudieron cargar las mesas'))
      .finally(() => setLoading(false));
  }, []);

  const handleSeleccionar = (mesaId) => {
    asignarMesa(mesaId);
    navigate('/carrito');
  };

  if (loading) return <p style={{ textAlign: 'center', padding: '24px', color: '#6b7280' }}>Cargando mesas...</p>;
  if (error)   return <p style={{ textAlign: 'center', padding: '24px', color: '#ef4444' }}>{error}</p>;

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
        {mesas.map((mesa) => (
          <MesaCard
            key={mesa._id || mesa.id}
            id={mesa._id || mesa.id}
            numero={mesa.numero}
            capacidad={mesa.capacidad}
            estado={mesa.estado}
            comensales={mesa.comensales}
            onSeleccionar={() => handleSeleccionar(mesa._id || mesa.id)}
          />
        ))}
      </div>
    </section>
  );
}