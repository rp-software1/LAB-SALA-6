// Importaciones relativas desde sus respectivas carpetas
import NavBar from "./components/NavBar.jsx";
import PlatoCard from "./components/PlatoCard.jsx";
import MesaCard from "./components/MesaCard.jsx";
import { platosMock } from "./data/platos.mock.js";
import { mesasMock } from "./data/mesas.mock.js";

function App() {
    return (
        <div>
            {/* Bloque C: NavBar como primer hijo de App */}
            <NavBar nombreRestaurante="Sabor & Tradición" />

            <main style={{ maxWidth: "600px", margin: "20px auto", padding: "0 10px" }}>
                <h1 style={{ textAlign: "center", fontFamily: "system-ui" }}>Carta del Restaurante</h1>
                <div>
                    {platosMock.map(plato => (
                        <PlatoCard key={plato.id} {...plato} />
                    ))}
                </div>

                <hr style={{ margin: "40px 0", borderTop: "2px dashed #cbd5e0" }} />

                <h1 style={{ textAlign: "center", fontFamily: "system-ui" }}>Gestión de Mesas</h1>
                <div>
                    {mesasMock.map(mesa => (
                        <MesaCard key={mesa.id} {...mesa} />
                    ))}
                </div>
            </main>
        </div>
    );
}

export default App;