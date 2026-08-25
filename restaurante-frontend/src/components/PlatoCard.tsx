// src/components/PlatoCard.tsx
import type { Plato } from "../types";

// Reutiliza Plato importado desde types/
interface PlatoCardProps {
  _id?: string;
  id?: string;
  nombre: string;
  categoria: string;
  precio: number;
  stock?: number;
  disponible: boolean;
  onAgregar?: (plato: Plato) => void;
}

function PlatoCard({
  _id,
  id,
  nombre,
  categoria,
  precio,
  stock,
  disponible,
  onAgregar,
}: PlatoCardProps) {
  const backgroundColor = disponible ? "#e0f2e1" : "#ffebee";
  const borderColor = disponible ? "#c8e6c9" : "#ffcdd2";
  const badgeBg = disponible ? "#c8e6c9" : "#ffcdd2";
  const badgeColor = disponible ? "#1b5e20" : "#b71c1c";

  // Objeto estructurado alineado a la interface Plato
  const platoObj: Plato = {
    _id: _id || id || "",
    nombre,
    descripcion: "",
    precio,
    categoria,
    disponible,
  };

  return (
    <div
      style={{
        padding: "20px 24px",
        margin: "16px 0",
        borderRadius: "16px",
        fontFamily: "system-ui, -apple-system, sans-serif",
        color: "#2d3748",
        boxSizing: "border-box",
        backgroundColor,
        border: `1px solid ${borderColor}`,
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.04)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
    >
      {/* Encabezado con Nombre y Badge de Disponibilidad */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "12px",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
          paddingBottom: "10px",
        }}
      >
        <h2 style={{ margin: 0, fontSize: "22px", color: "#1a202c", fontWeight: "700" }}>
          {nombre}
        </h2>
        <span
          style={{
            padding: "4px 12px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: "bold",
            backgroundColor: badgeBg,
            color: badgeColor,
          }}
        >
          {disponible ? "🟢 Disponible" : "🔴 Agotado"}
        </span>
      </div>

      {/* Información del Plato */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", fontSize: "15px" }}>
        <p style={{ margin: "4px 0" }}>
          <strong>Categoría:</strong> {categoria}
        </p>
        {stock !== undefined && (
          <p style={{ margin: "4px 0" }}>
            <strong>Stock:</strong> {stock} unids.
          </p>
        )}
      </div>

      {/* Precio y Botón de Agregar */}
      <div
        style={{
          marginTop: "12px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            padding: "6px 14px",
            borderRadius: "8px",
            fontWeight: "800",
            fontSize: "18px",
            color: "#2b6cb0",
          }}
        >
          S/ {precio}
        </div>

        {disponible && onAgregar && (
          <button
            onClick={() => onAgregar(platoObj)}
            style={{
              backgroundColor: "#f59e0b",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            + Agregar a comanda
          </button>
        )}
      </div>
    </div>
  );
}

export default PlatoCard;