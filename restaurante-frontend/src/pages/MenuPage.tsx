// src/pages/MenuPage.tsx
import { useState, useEffect } from "react";
import { getPlatos } from "../services/api";
import PlatoCard from "../components/PlatoCard";
import { usePedido } from "../context/PedidoContext";
import type { Plato } from "../types";

export default function MenuPage() {
  const [platos, setPlatos] = useState<Plato[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { pedido } = usePedido();
  const totalItems = pedido.items.reduce((acc, i) => acc + i.cantidad, 0);

  useEffect(() => {
    async function cargarMenu() {
      try {
        setLoading(true);
        setError(null);

        const data = await getPlatos();
        setPlatos(Array.isArray(data) ? data : []);
      } catch (err: unknown) {
        const mensaje = err instanceof Error ? err.message : "Error al cargar los platos";
        setError(mensaje);
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
        {platos.map((plato, index) => {
          const platoConStock = plato as Plato & { id?: string; stock?: number };
          const platoId = plato._id || platoConStock.id || String(index);

          return (
            <PlatoCard
              key={platoId}
              _id={platoId}
              nombre={plato.nombre}
              categoria={plato.categoria || "Plato Principal"}
              precio={plato.precio}
              stock={platoConStock.stock ?? 10}
              disponible={plato.disponible ?? true}
            />
          );
        })}
      </div>

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