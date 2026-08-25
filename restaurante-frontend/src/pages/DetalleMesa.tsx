// src/pages/DetalleMesa.jsx
import { useParams, Link, useNavigate } from 'react-router-dom';
import { mesasMock } from '../data/mesas.mock.js';

export default function DetalleMesa() {
  const { id } = useParams();
  const navigate = useNavigate();

  const mesa = mesasMock?.find(
    (m) => String(m.id) === id || String(m.numero) === id
  );

  if (!mesa) {
    return (
      <div
        style={{
          padding: '40px 20px',
          textAlign: 'center',
          fontFamily: 'system-ui, sans-serif',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          maxWidth: '450px',
          margin: '30px auto',
        }}
      >
        <div style={{ fontSize: '48px', marginBottom: '10px' }}>⚠️</div>
        <h2 style={{ color: '#e53e3e', fontSize: '22px', margin: '0 0 10px 0' }}>
          Mesa #{id} no encontrada
        </h2>
        <p style={{ color: '#718096', marginBottom: '20px' }}>
          La mesa que estás buscando no existe en el sistema.
        </p>
        <button
          onClick={() => navigate('/mesas')}
          style={{
            backgroundColor: '#1a202c',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          Volver a mesas
        </button>
      </div>
    );
  }

  // Configuración de colores suaves según el estado de la mesa
  let configEstado = {
    bg: '#f7fafc',
    border: '#e2e8f0',
    badgeBg: '#edf2f7',
    badgeText: '#4a5568',
    texto: '⚪ Desconocido',
  };

  const estadoLower = mesa.estado?.toLowerCase();

  if (estadoLower === 'libre' || mesa.disponible) {
    configEstado = {
      bg: '#e0f2e1',        // Verde suave (mismo tono que la tarjeta del listado)
      border: '#c8e6c9',
      badgeBg: '#c8e6c9',
      badgeText: '#1b5e20',
      texto: '🟢 LIBRE',
    };
  } else if (estadoLower === 'ocupada') {
    configEstado = {
      bg: '#ffebee',        // Rojo suave (mismo tono que la tarjeta del listado)
      border: '#ffcdd2',
      badgeBg: '#ffcdd2',
      badgeText: '#b71c1c',
      texto: '🔴 OCUPADA',
    };
  } else if (estadoLower === 'reservada') {
    configEstado = {
      bg: '#fff8e1',        // Amarillo suave
      border: '#ffe082',
      badgeBg: '#ffe082',
      badgeText: '#f57f17',
      texto: '🟡 RESERVADA',
    };
  }

  return (
    <div
      style={{
        maxWidth: '520px',
        margin: '20px auto',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Botón de regreso */}
      <Link
        to="/mesas"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          color: '#4a5568',
          textDecoration: 'none',
          fontWeight: '600',
          fontSize: '14px',
          marginBottom: '16px',
          padding: '6px 12px',
          borderRadius: '6px',
          backgroundColor: '#edf2f7',
        }}
      >
        ← Volver al listado de mesas
      </Link>

      {/* Tarjeta principal con fondo dinámico suave */}
      <div
        style={{
          backgroundColor: configEstado.bg,
          borderRadius: '16px',
          padding: '28px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
          border: `1px solid ${configEstado.border}`,
          transition: 'all 0.3s ease',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            borderBottom: '1px solid rgba(0,0,0,0.08)',
            paddingBottom: '16px',
          }}
        >
          <h1 style={{ fontSize: '26px', color: '#1a202c', margin: 0, fontWeight: '800' }}>
            Mesa #{mesa.numero || mesa.id}
          </h1>

          {/* Badge del estado */}
          <span
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: 'bold',
              letterSpacing: '0.5px',
              backgroundColor: configEstado.badgeBg,
              color: configEstado.badgeText,
            }}
          >
            {configEstado.texto}
          </span>
        </div>

        {/* Información en rejilla */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
          }}
        >
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.65)',
              padding: '16px',
              borderRadius: '12px',
              border: '1px solid rgba(0,0,0,0.05)',
            }}
          >
            <span style={{ fontSize: '11px', color: '#718096', textTransform: 'uppercase', fontWeight: 'bold' }}>
              CAPACIDAD
            </span>
            <p style={{ margin: '4px 0 0 0', fontSize: '18px', fontWeight: '700', color: '#2d3748' }}>
              👥 {mesa.capacidad} personas
            </p>
          </div>

          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.65)',
              padding: '16px',
              borderRadius: '12px',
              border: '1px solid rgba(0,0,0,0.05)',
            }}
          >
            <span style={{ fontSize: '11px', color: '#718096', textTransform: 'uppercase', fontWeight: 'bold' }}>
              COMENSALES
            </span>
            <p style={{ margin: '4px 0 0 0', fontSize: '18px', fontWeight: '700', color: '#2d3748' }}>
              🍽️ {mesa.comensales || 0} actuales
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}