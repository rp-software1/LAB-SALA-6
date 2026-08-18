import NavBar from "./components/NavBar.jsx";
import PlatoCard from "./components/PlatoCard.jsx";
import MesaCard from "./components/MesaCard.jsx";
import OrderForm from "./components/OrderForm.jsx";
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
        <h1 style={{ textAlign: "center" }}>
          Carta del Restaurante
        </h1>

        {platosMock.map((plato) => (
          <PlatoCard key={plato.id} {...plato} />
        ))}

        <hr />

        <h1 style={{ textAlign: "center" }}>
          Gestión de Mesas
        </h1>

        {mesasMock.map((mesa) => (
          <MesaCard key={mesa.id} {...mesa} />
        ))}

        <hr />

        <h1 style={{ textAlign: "center" }}>
          Nueva Comanda
        </h1>

        <OrderForm mesaNumero={1} />
      </main>
    </div>
  );
}

export default App;