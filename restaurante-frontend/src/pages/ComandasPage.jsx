import { useState } from "react";
import OrderForm from "./OrderForm.jsx";
import { mesasMock } from "../data/mesas.mock.js";

function ComandasPage() {
  const [mesaSeleccionada, setMesaSeleccionada] =
    useState(1);

  return (
    <div
      style={{
        backgroundColor: "#edf2f7",
        padding: "20px",
        borderRadius: "12px",
        marginTop: "20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          margin: "0 0 16px 0",
        }}
      >
        Gestión de Comandas
      </h1>

      <div
        style={{
          textAlign: "center",
          marginBottom: "16px",
        }}
      >
        <label
          style={{
            fontWeight: "bold",
            marginRight: "10px",
          }}
        >
          Seleccionar Mesa:
        </label>

        <select
          value={mesaSeleccionada}
          onChange={(event) =>
            setMesaSeleccionada(
              Number(event.target.value)
            )
          }
          style={{
            padding: "8px 12px",
            borderRadius: "6px",
            fontSize: "16px",
            border: "1px solid #cbd5e0",
          }}
        >
          {mesasMock.map((mesa) => (
            <option
              key={mesa.id}
              value={mesa.numero}
            >
              Mesa #{mesa.numero}
            </option>
          ))}
        </select>
      </div>

      <OrderForm mesaNumero={mesaSeleccionada} />
    </div>
  );
}

export default ComandasPage;