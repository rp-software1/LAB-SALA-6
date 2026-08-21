// src/pages/NotFound.jsx
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "60vh",
        textAlign: "center",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "80px", margin: 0, color: "#e53e3e" }}>404</h1>
      <h2 style={{ fontSize: "22px", margin: "10px 0", color: "#2d3748" }}>
        Esta página no existe en el restaurante
      </h2>
      <button
        onClick={() => navigate("/")}
        style={{
          backgroundColor: "#1a202c",
          color: "#ffffff",
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          fontWeight: "bold",
          fontSize: "15px",
          cursor: "pointer",
        }}
      >
        Ir a la carta
      </button>
    </div>
  );
}