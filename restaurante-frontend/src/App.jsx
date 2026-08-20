import NavBar from "./components/NavBar.jsx";
import PlatoCard from "./components/PlatoCard.jsx";
import MesaCard from "./components/MesaCard.jsx";
import CarritoPage from "./pages/CarritoPage.jsx";

import { platosMock } from "./data/platos.mock.js";
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

        {/* CARTA */}

        <h1 style={{ textAlign: "center" }}>
          Carta del Restaurante
        </h1>

        {platosMock.map((plato) => (
          <PlatoCard
            key={plato.id}
            {...plato}
          />
        ))}

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