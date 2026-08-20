import { useState, useEffect } from "react";
import { getPlatos } from "../services/api.js";

export default function MenuPage() {
  const [platos, setPlatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    return <p>Cargando el menú del restaurante...</p>;
  }

  if (error) {
    return (
      <p>
        Error: {error} — verifica que el backend está corriendo.
      </p>
    );
  }

  return (
    <div>
      <h2>Menú del Restaurante</h2>

      {platos.map((plato) => (
        <div key={plato._id}>
          <strong>{plato.nombre}</strong> — S/ {plato.precio}
        </div>
      ))}
    </div>
  );
}