function PlatoCard({
  nombre,
  categoria,
  precio,
  stock,
  disponible,
}) {
  const backgroundColor = disponible
    ? "#e0f2e1"
    : "#ffebee";

  const borderColor = disponible
    ? "#c8e6c9"
    : "#ffcdd2";

  return (
    <div
      style={{
        padding: "20px 24px",
        margin: "16px 0",
        borderRadius: "12px",
        fontFamily: "system-ui, sans-serif",
        color: "#2d3748",
        boxSizing: "border-box",
        backgroundColor,
        border: `1px solid ${borderColor}`,
      }}
    >
      <h2>{nombre}</h2>

      <p>
        <strong>Categoría:</strong> {categoria}
      </p>

      <p>
        <strong>Precio:</strong> S/ {precio}
      </p>

      <p>
        <strong>Stock:</strong> {stock}
      </p>

      <p>
        {disponible
          ? "🟢 Disponible"
          : "🔴 Agotado"}
      </p>
    </div>
  );
}

export default PlatoCard;