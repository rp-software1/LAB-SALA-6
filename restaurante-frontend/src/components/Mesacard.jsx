import { Link } from 'react-router-dom';

function MesaCard({
  id, // 👈 Agregamos el id de la mesa
  numero,
  capacidad,
  estado,
  comensales,
}) {
  let color = "#f5f5f5";
  let texto = "⚪ Desconocido";

  if (estado === "libre") {
    color = "#e0f2e1";
    texto = "🟢 Libre";
  }

  if (estado === "ocupada") {
    color = "#ffebee";
    texto = "🔴 Ocupada";
  }

  if (estado === "reservada") {
    color = "#fff8e1";
    texto = "🟡 Reservada";
  }

  // Si id no viene, usamos numero como identificador
  const idMesa = id || numero;

  return (
    <div
      style={{
        padding: "20px 24px",
        margin: "16px 0",
        borderRadius: "12px",
        fontFamily: "system-ui, sans-serif",
        color: "#2d3748",
        boxSizing: "border-box",
        backgroundColor: color,
      }}
    >
      <h2>Mesa #{numero}</h2>

      <p>
        <strong>Capacidad:</strong> {capacidad} personas
      </p>

      <p>
        <strong>Comensales actuales:</strong> {comensales}
      </p>

      <p>
        <strong>{texto}</strong>
      </p>

      {/* Enlace para navegar a la ruta dinámica del Bloque C */}
      <div style={{ marginTop: "12px" }}>
        <Link
          to={`/mesas/${idMesa}`}
          style={{
            display: "inline-block",
            color: "#3182ce",
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          Ver detalle →
        </Link>
      </div>
    </div>
  );
}

export default MesaCard;