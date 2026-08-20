import NavBar from "./components/NavBar.jsx";
import MesaCard from "./components/MesaCard.jsx";
import CarritoPage from "./pages/CarritoPage.jsx";
import MenuPage from "./pages/MenuPage.jsx";

import { mesasMock } from "./data/mesas.mock.js";

function App() {
  return (
    <div>
      <NavBar nombreRestaurante="Sabor & Tradición" />

      <main
        style={{
          maxWidth: "600px",
          margin: "20px auto",
          padding: "0 10px",
        }}
      >
        {/* COMANDA */}
        <CarritoPage />

        <hr
          style={{
            margin: "40px 0",
            border: "none",
            borderTop: "2px dashed #cbd5e0",
          }}
        />

        {/* CARTA DESDE LA API */}
        <MenuPage />

        <hr
          style={{
            margin: "40px 0",
            border: "none",
            borderTop: "2px dashed #cbd5e0",
          }}
        />

        {/* MESAS */}
        <h1 style={{ textAlign: "center" }}>
          Gestión de Mesas
        </h1>

        {mesasMock.map((mesa) => (
          <MesaCard
            key={mesa.id}
            {...mesa}
          />
        ))}
      </main>
    </div>
  );
}

export default App;