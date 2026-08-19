import { useState } from "react";
import { platosMock } from "../data/platos.mock.js";

export default function CarritoPage() {
  const [carrito, setCarrito] = useState([]);

  function agregarPlato(plato) {
    setCarrito([...carrito, plato]);
  }

  function quitarPlato(id) {
    setCarrito(carrito.filter((item) => item.id !== id));
  }

  return (
    <div>
      <h2>Armar Comanda</h2>

      {/* PLATOS DISPONIBLES */}

      <h3>Platos disponibles</h3>

      {platosMock.map((plato) => (
        <div key={plato.id}>
          <span>
            {plato.nombre} — S/ {plato.precio}
          </span>

          <button onClick={() => agregarPlato(plato)}>
            Agregar
          </button>
        </div>
      ))}

      {/* CARRITO */}

      <h3>Comanda ({carrito.length} ítems)</h3>

      {carrito.map((item, index) => (
        <div key={`${item.id}-${index}`}>
          <span>{item.nombre}</span>

          <button onClick={() => quitarPlato(item.id)}>
            Quitar
          </button>
        </div>
      ))}
    </div>
  );
}