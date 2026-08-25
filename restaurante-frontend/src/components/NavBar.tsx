// src/components/NavBar.tsx

import type { CSSProperties } from "react";
import { NavLink } from "react-router-dom";

interface NavBarProps {
  nombreRestaurante?: string;
}

function NavBar({
  nombreRestaurante = "Mi Restaurante",
}: NavBarProps) {
  const getLinkStyle = ({
    isActive,
  }: {
    isActive: boolean;
  }): CSSProperties => ({
    cursor: "pointer",
    opacity: isActive ? 1 : 0.7,
    color: isActive ? "#facc15" : "#ffffff",
    fontWeight: isActive ? "bold" : "normal",
    textDecoration: "none",
    borderBottom: isActive ? "2px solid #facc15" : "none",
    paddingBottom: "2px",
    transition: "all 0.2s ease",
  });

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 32px",
        backgroundColor: "#1a202c",
        color: "#ffffff",
        fontFamily: "system-ui, -apple-system, sans-serif",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <h2
        style={{
          margin: 0,
          fontSize: "20px",
          fontWeight: "700",
        }}
      >
        {nombreRestaurante}
      </h2>

      <div
        style={{
          display: "flex",
          gap: "24px",
          fontSize: "16px",
        }}
      >
        <NavLink to="/" style={getLinkStyle}>
          Carta
        </NavLink>

        <NavLink to="/mesas" style={getLinkStyle}>
          Mesas
        </NavLink>

        <NavLink to="/carrito" style={getLinkStyle}>
          Comandas
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
export type { NavBarProps };