import MesaCard from "../components/Mesacard.jsx";
import { mesasMock } from "../data/mesas.mock.js";

function MesasPage() {
    return (
        <section>
            <h1 style={{
                fontFamily: "system-ui, sans-serif",
                textAlign: "center",
                fontSize: "28px",
                color: "#1a202c",
                marginBottom: "20px"
            }}>
                Gestión de Mesas
            </h1>

            <div>
                {mesasMock.map(mesa => (
                    <MesaCard
                        key={mesa.id}
                        id={mesa.id} // 👈 Le enviamos el ID para construir el Link a /mesas/:id
                        numero={mesa.numero}
                        capacidad={mesa.capacidad}
                        estado={mesa.estado}
                        comensales={mesa.comensales}
                    />
                ))}
            </div>
        </section>
    );
}

export default MesasPage;