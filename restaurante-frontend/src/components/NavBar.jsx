function NavBar({ nombreRestaurante = "Mi Restaurante" }) {
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
        <span style={{ cursor: "pointer", opacity: 0.9 }}>
          Carta
        </span>

        <span style={{ cursor: "pointer", opacity: 0.9 }}>
          Mesas
        </span>

        <span style={{ cursor: "pointer", opacity: 0.9 }}>
          Comandas
        </span>
      </div>
    </nav>
  );
}

export default NavBar;