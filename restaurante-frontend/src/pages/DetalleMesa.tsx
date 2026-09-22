// src/pages/DetalleMesa.tsx

import type { CSSProperties } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { mesasMock } from "../data/mesas.mock";

type EstadoMesa =
  | "disponible"
  | "libre"
  | "ocupada"
  | "reservada"
  | "fuera_servicio";

interface Mesa {
  id: string | number;
  numero: number;
  capacidad: number;
  estado: EstadoMesa;
  comensales?: number;
}

interface ConfigEstado {
  bg: string;
  border: string;
  badgeBg: string;
  badgeText: string;
  texto: string;
}

export default function DetalleMesa() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Guard obligatorio porque id puede ser undefined.
  if (!id) {
    return (
      <div style={styles.mensaje}>
        <div style={styles.icono}>⚠️</div>

        <h2 style={styles.tituloError}>
          Identificador de mesa no encontrado
        </h2>

        <p style={styles.textoError}>
          La dirección no contiene un identificador válido.
        </p>

        <button
          type="button"
          onClick={() => navigate("/mesas")}
          style={styles.boton}
        >
          Volver a mesas
        </button>
      </div>
    );
  }

  const mesas: Mesa[] = mesasMock as Mesa[];

  const mesa: Mesa | undefined = mesas.find(
    (mesa) =>
      String(mesa.id) === id ||
      String(mesa.numero) === id
  );

  if (!mesa) {
    return (
      <div style={styles.mensaje}>
        <div style={styles.icono}>⚠️</div>

        <h2 style={styles.tituloError}>
          Mesa #{id} no encontrada
        </h2>

        <p style={styles.textoError}>
          La mesa que estás buscando no existe en el sistema.
        </p>

        <button
          type="button"
          onClick={() => navigate("/mesas")}
          style={styles.boton}
        >
          Volver a mesas
        </button>
      </div>
    );
  }

  const estadoLower = mesa.estado.toLowerCase();

  let configEstado: ConfigEstado = {
    bg: "#f7fafc",
    border: "#e2e8f0",
    badgeBg: "#edf2f7",
    badgeText: "#4a5568",
    texto: "⚪ FUERA DE SERVICIO",
  };

  if (
    estadoLower === "libre" ||
    estadoLower === "disponible"
  ) {
    configEstado = {
      bg: "#e0f2e1",
      border: "#c8e6c9",
      badgeBg: "#c8e6c9",
      badgeText: "#1b5e20",
      texto: "🟢 DISPONIBLE",
    };
  } else if (estadoLower === "ocupada") {
    configEstado = {
      bg: "#ffebee",
      border: "#ffcdd2",
      badgeBg: "#ffcdd2",
      badgeText: "#b71c1c",
      texto: "🔴 OCUPADA",
    };
  } else if (estadoLower === "reservada") {
    configEstado = {
      bg: "#fff8e1",
      border: "#ffe082",
      badgeBg: "#ffe082",
      badgeText: "#f57f17",
      texto: "🟡 RESERVADA",
    };
  }

  return (
    <div style={styles.contenedor}>
      <Link to="/mesas" style={styles.enlace}>
        ← Volver al listado de mesas
      </Link>

      <div
        style={{
          ...styles.tarjeta,
          backgroundColor: configEstado.bg,
          border: `1px solid ${configEstado.border}`,
        }}
      >
        <div style={styles.encabezado}>
          <h1 style={styles.titulo}>
            Mesa #{mesa.numero || mesa.id}
          </h1>

          <span
            style={{
              ...styles.badge,
              backgroundColor: configEstado.badgeBg,
              color: configEstado.badgeText,
            }}
          >
            {configEstado.texto}
          </span>
        </div>

        <div style={styles.rejilla}>
          <div style={styles.informacion}>
            <span style={styles.etiqueta}>CAPACIDAD</span>

            <p style={styles.valor}>
              👥 {mesa.capacidad} personas
            </p>
          </div>

          <div style={styles.informacion}>
            <span style={styles.etiqueta}>COMENSALES</span>

            <p style={styles.valor}>
              🍽️ {mesa.comensales ?? 0} actuales
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  contenedor: {
    maxWidth: "520px",
    margin: "20px auto",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },

  mensaje: {
    padding: "40px 20px",
    textAlign: "center",
    fontFamily: "system-ui, sans-serif",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
    maxWidth: "450px",
    margin: "30px auto",
  },

  icono: {
    fontSize: "48px",
    marginBottom: "10px",
  },

  tituloError: {
    color: "#e53e3e",
    fontSize: "22px",
    margin: "0 0 10px",
  },

  textoError: {
    color: "#718096",
    marginBottom: "20px",
  },

  boton: {
    backgroundColor: "#1a202c",
    color: "#ffffff",
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    fontWeight: "bold",
    cursor: "pointer",
  },

  enlace: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    color: "#4a5568",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "14px",
    marginBottom: "16px",
    padding: "6px 12px",
    borderRadius: "6px",
    backgroundColor: "#edf2f7",
  },

  tarjeta: {
    borderRadius: "16px",
    padding: "28px",
    boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)",
    transition: "all 0.3s ease",
  },

  encabezado: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    borderBottom: "1px solid rgba(0,0,0,0.08)",
    paddingBottom: "16px",
  },

  titulo: {
    fontSize: "26px",
    color: "#1a202c",
    margin: 0,
    fontWeight: "800",
  },

  badge: {
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "bold",
    letterSpacing: "0.5px",
  },

  rejilla: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },

  informacion: {
    backgroundColor: "rgba(255,255,255,0.65)",
    padding: "16px",
    borderRadius: "12px",
    border: "1px solid rgba(0,0,0,0.05)",
  },

  etiqueta: {
    fontSize: "11px",
    color: "#718096",
    textTransform: "uppercase",
    fontWeight: "bold",
  },

  valor: {
    margin: "4px 0 0",
    fontSize: "18px",
    fontWeight: "700",
    color: "#2d3748",
  },
};