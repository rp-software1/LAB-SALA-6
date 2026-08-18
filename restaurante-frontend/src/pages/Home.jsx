// src/pages/Home.jsx
import PlatoCard from "../components/PlatoCard.jsx";
import { platosMock } from "../data/platos.mock.js";

export function Home() {
  return (
    <main style={{ padding: "20px" }}>
      <h1>Menú del Restaurante</h1>
      <div className="platos-lista">
        {platosMock.map((plato) => (
          <PlatoCard key={plato.id} {...plato} />
        ))}
      </div>
    </main>
  );
}

export default Home;