// pages/ComandasPage.jsx
import React, { useState } from "react";
import OrderForm from "../components/OrderForm";

// Mock de mesas de referencia
const mesasMock = [
  { id: 1, numero: 1 },
  { id: 2, numero: 2 },
  { id: 3, numero: 3 },
  { id: 4, numero: 4 },
];

function ComandasPage() {
  // Estado para recordar la mesa seleccionada
  const [mesaSeleccionada, setMesaSeleccionada] = useState(1);

  return (
    <div style={{ padding: "20px", fontFamily: "system-ui, sans-serif" }}>
      <h1>Gestión de Comandas</h1>
      
      <label style={{ fontWeight: "bold", marginRight: "10px" }}>
        Seleccionar Mesa:
      </label>
      <select
        value={mesaSeleccionada}
        onChange={(e) => setMesaSeleccionada(Number(e.target.value))}
        style={{ padding: "8px", borderRadius: "4px", marginBottom: "20px" }}
      >
        {mesasMock.map((m) => (
          <option key={m.id} value={m.numero}>
            Mesa #{m.numero}
          </option>
        ))}
      </select>

      {/* Render de OrderForm pasándole la prop mesaNumero */}
      <OrderForm mesaNumero={mesaSeleccionada} />
    </div>
  );
}

export default ComandasPage;