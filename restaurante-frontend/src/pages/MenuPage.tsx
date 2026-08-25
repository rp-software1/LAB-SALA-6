// src/pages/MenuPage.jsx
import { useState, useEffect } from "react";
import { getPlatos } from "../services/api.js";
import PlatoCard from "../components/PlatoCard.jsx";
import { usePedido } from "../context/PedidoContext.jsx";

export default function MenuPage() {
  const [platos, setPlatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Consumir el estado compartido del Pedido
  const { pedido } = usePedido();
  const totalItems = pedido.items.reduce((acc, i) => acc + i.cantidad, 0);

  useEffect(() => {
    async function cargarMenu() {
      try {
        setLoading(true);
        setError(null);

        const data = await getPlatos();
        setPlatos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    cargarMenu();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "40px 20px", fontFamily: "system-ui" }}>
        <p style={{ color: "#4a5568", fontSize: "18px", fontWeight: "600" }}>
          ⏳ Cargando el menú del restaurante...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "30px",
          backgroundColor: "#ffebee",
          borderRadius: "12px",
          border: "1px solid #ffcdd2",
          maxWidth: "500px",
          margin: "20px auto",
          fontFamily: "system-ui",
        }}
      >
        <p style={{ color: "#b71c1c", fontWeight: "bold", margin: 0 }}>
          ⚠️ Error: {error}
        </p>
        <small style={{ color: "#718096", display: "block", marginTop: "8px" }}>
          Verifica que el servidor backend esté encendido y corriendo.
        </small>
      </div>
    );
  }

  return (
    <section style={{ maxWidth: "650px", margin: "0 auto", fontFamily: "system-ui", paddingBottom: "80px" }}>
      <h1
        style={{
          textAlign: "center",
          fontSize: "28px",
          color: "#1a202c",
          marginBottom: "24px",
          fontWeight: "800",
        }}
      >
        Menú del Restaurante
      </h1>

      <div>
        {platos.map((plato) => (
          <PlatoCard
            key={plato._id || plato.id}
            _id={plato._id || plato.id}
            nombre={plato.nombre}
            categoria={plato.categoria || "Plato Principal"}
            precio={plato.precio}
            stock={plato.stock ?? 10}
            disponible={plato.disponible ?? true}
          />
        ))}
      </div>

      {/* Badge flotante del Bloque B */}
      {totalItems > 0 && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            backgroundColor: "#f59e0b",
            color: "white",
            padding: "12px 24px",
            borderRadius: "30px",
            fontWeight: "bold",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            zIndex: 1000,
          }}
        >
          🛒 Comanda: {totalItems} items
        </div>
      )}
    </section>
  );
}