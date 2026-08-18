// src/pages/MesasPage.jsx
import MesaCard from "../components/MesaCard.jsx";
import { mesasMock } from "../data/mesas.mock.js";

export function MesasPage() {
  return (
    <section style={{ padding: "20px" }}>
      <h2>Gestión de Mesas</h2>
      <div className="mesas-lista">
        {mesasMock.map((mesa) => (
          <MesaCard key={mesa.id} {...mesa} />
        ))}s
      </div>
    </section>
  );
}

export default MesasPage;