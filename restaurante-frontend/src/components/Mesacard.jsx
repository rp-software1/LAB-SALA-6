// src/components/MesaCard.jsx
import PropTypes from 'prop-types';

export function MesaCard({ numero, capacidad, estado, comensales }) {
  const obtenerIconoEstado = (est) => {
    switch (est) {
      case "libre":
        return "🟢 Libre";
      case "ocupada":
        return "🔴 Ocupada";
      case "reservada":
        return "🟡 Reservada";
      default:
        return "⚪ Desconocido";
    }
  };

  return (
    <div className={`mesa-card mesa-${estado}`} style={{
      border: '1px solid #ccc',
      padding: '16px',
      borderRadius: '8px',
      marginBottom: '10px'
    }}>
      <h3>Mesa #{numero}</h3>
      <p><strong>Capacidad:</strong> {capacidad} personas</p>
      <p><strong>Comensales actuales:</strong> {comensales}</p>
      <p><strong>Estado:</strong> {obtenerIconoEstado(estado)}</p>
    </div>
  );
}

MesaCard.propTypes = {
  numero: PropTypes.number.isRequired,
  capacidad: PropTypes.number.isRequired,
  estado: PropTypes.oneOf(['libre', 'ocupada', 'reservada']).isRequired,
  comensales: PropTypes.number.isRequired
};

export default MesaCard;