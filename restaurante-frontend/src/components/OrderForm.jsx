import { useState, useEffect } from "react";

function OrderForm({ mesaNumero }) {
  const [plato, setPlato] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    console.log("OrderForm montado — mesa:", mesaNumero);
  }, [mesaNumero]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "plato") setPlato(value);
    if (name === "cantidad") setCantidad(Number(value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setEnviando(true);
    setMensaje("");

    setTimeout(() => {
      setEnviando(false);
      setMensaje(`Comanda enviada: ${plato} x${cantidad}`);
      setPlato("");
      setCantidad(1);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Comanda — Mesa {mesaNumero}</h2>

      <input
        name="plato"
        value={plato}
        onChange={handleChange}
        placeholder="Nombre del plato"
      />

      <input
        type="number"
        name="cantidad"
        value={cantidad}
        onChange={handleChange}
        min="1"
      />

      <button type="submit" disabled={enviando}>
        {enviando ? "Enviando..." : "Agregar a comanda"}
      </button>

      {mensaje && <p>{mensaje}</p>}
    </form>
  );
}

export default OrderForm;