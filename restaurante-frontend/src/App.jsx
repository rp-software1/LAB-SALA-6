import NavBar from "./components/NavBar.jsx";
import MesaCard from "./components/MesaCard.jsx";
import CarritoPage from "./pages/CarritoPage.jsx";
import { mesasMock } from "./data/mesas.mock.js";

function App() {
  return (
    <div>
      <NavBar nombreRestaurante="Sabor & Tradición" />

      <main
        style={{
          maxWidth: "800px",
          margin: "20px auto",
          padding: "0 15px",
        }}
      >
        <CarritoPage />

        <hr
          style={{
            margin: "40px 0",
            border: "none",
            borderTop: "2px dashed #cbd5e0",
          }}
        />

        <h1 style={{ textAlign: "center", color: "#2d3748" }}>
          Gestión de Mesas
        </h1>

        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {mesasMock.map((mesa) => (
            <MesaCard key={mesa.id} {...mesa} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;