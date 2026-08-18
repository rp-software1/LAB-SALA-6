import PlatoCard from "./components/PlatoCard";
import { platosMock } from "./data/platos.mock";

function App() {
    return (
        <div>
            <h1>Carta del Restaurante</h1>

            <div>
                {platosMock.map(plato => (
                    <PlatoCard
                        key={plato.id}
                        nombre={plato.nombre}
                        categoria={plato.categoria}
                        precio={plato.precio}
                        stock={plato.stock}
                        disponible={plato.disponible}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;