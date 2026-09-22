// src/components/MesaCard.tsx
import { Link } from "react-router-dom";
import type { EstadoMesa } from "../types";

export interface MesaCardProps {
  id: string | number;
  numero: number;
  capacidad: number;
  estado: EstadoMesa;
  comensales?: number;
  onSeleccionar?: () => void;
}

function MesaCard({
  id,
  numero,
  capacidad,
  estado,
  comensales = 0,
  onSeleccionar,
}: MesaCardProps) {
  let bgColor = "#f9fafb";
  let borderColor = "#e5e7eb";
  let badgeBg = "#e5e7eb";
  let badgeColor = "#374151";
  let texto = "⚪ Fuera de servicio";

  const esDisponible = estado === "disponible";

  if (esDisponible) {
    bgColor = "#edf7ed";
    borderColor = "#c8e6c9";
    badgeBg = "#c8e6c9";
    badgeColor = "#1b5e20";
    texto = "🟢 Disponible";
  } else if (estado === "ocupada") {
    bgColor = "#fde8e8";
    borderColor = "#fbd5d5";
    badgeBg = "#fbd5d5";
    badgeColor = "#9b1c1c";
    texto = "🔴 Ocupada";
  } else if (estado === "reservada") {
    bgColor = "#fef9c3";
    borderColor = "#fef08a";
    badgeBg = "#fef08a";
    badgeColor = "#854d0e";
    texto = "🟡 Reservada";
  }

  const idMesa = id || numero;

  return (
    <div
      style={{
        padding: "20px 24px",
        borderRadius: "16px",
        fontFamily: "system-ui, sans-serif",
        color: "#2d3748",
        backgroundColor: bgColor,
        border: `1px solid ${borderColor}`,
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      }}
    >
      {/* Encabezado */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <h2
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            margin: 0,
            color: "#1a202c",
          }}
        >
          Mesa #{numero}
        </h2>

        <span
          style={{
            backgroundColor: badgeBg,
            color: badgeColor,
            padding: "4px 12px",
            borderRadius: "9999px",
            fontSize: "13px",
            fontWeight: "600",
          }}
        >
          {texto}
        </span>
      </div>

      {/* Información de la mesa */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "14px",
          color: "#4a5568",
          marginBottom: "16px",
        }}
      >
        <span>
          <strong>Capacidad:</strong> {capacidad} personas
        </span>

        {comensales > 0 && (
          <span>
            <strong>Comensales actuales:</strong> {comensales}
          </span>
        )}
      </div>

      <hr
        style={{
          border: "none",
          borderTop: `1px solid ${borderColor}`,
          margin: "12px 0 16px",
        }}
      />

      {/* Acciones */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link
          to={`/mesas/${idMesa}`}
          style={{
            color: "#3182ce",
            fontWeight: "600",
            textDecoration: "none",
            fontSize: "14px",
          }}
        >
          Ver detalle →
        </Link>

        {esDisponible && onSeleccionar && (
          <button
            type="button"
            onClick={onSeleccionar}
            style={{
              backgroundColor: "#2f855a",
              color: "white",
              padding: "8px 20px",
              border: "none",
              borderRadius: "8px",
              fontWeight: "600",
              fontSize: "14px",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
          >
            Seleccionar mesa
          </button>
        )}
      </div>
    </div>
  );
}

export default MesaCard;