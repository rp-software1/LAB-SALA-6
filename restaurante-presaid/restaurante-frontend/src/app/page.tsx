"use client";

import { useEffect, useState } from "react";

interface Plato {
  id: number;
  nombre: string;
  precio: number;
  disponible: boolean;
}

export default function PlatosPage() {
  const [platos, setPlatos] = useState<Plato[]>([]);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [disponible, setDisponible] = useState(true);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(true);

  const API_URL = "http://localhost:3000";

  async function cargarPlatos() {
    try {
      setCargando(true);
      setError("");

      const respuesta = await fetch(`${API_URL}/platos`);

      if (!respuesta.ok) {
        throw new Error("No se pudieron cargar los platos");
      }

      const datos = await respuesta.json();
      setPlatos(datos);
    } catch (error) {
      setError("No se pudo conectar con el backend");
    } finally {
      setCargando(false);
    }
  }

  async function crearPlato(event: React.FormEvent) {
    event.preventDefault();

    try {
      const respuesta = await fetch(`${API_URL}/platos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          precio: Number(precio),
          disponible,
        }),
      });

      if (!respuesta.ok) {
        throw new Error("Error al crear el plato");
      }

      setNombre("");
      setPrecio("");
      setDisponible(true);

      await cargarPlatos();
    } catch (error) {
      setError("No se pudo crear el plato");
    }
  }

  useEffect(() => {
    cargarPlatos();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">
        Gestión de Platos
      </h1>

      <a
        href="/"
        className="mb-6 inline-block text-blue-600 hover:underline"
      >
        ← Volver al inicio
      </a>

      <form
        onSubmit={crearPlato}
        className="mb-8 max-w-lg rounded-xl bg-white p-6 shadow"
      >
        <h2 className="mb-4 text-xl font-bold">Crear nuevo plato</h2>

        <input
          type="text"
          placeholder="Nombre del plato"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="mb-4 w-full rounded-lg border p-3"
          required
        />

        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          className="mb-4 w-full rounded-lg border p-3"
          min="0"
          step="0.01"
          required
        />

        <label className="mb-4 flex gap-2">
          <input
            type="checkbox"
            checked={disponible}
            onChange={(e) => setDisponible(e.target.checked)}
          />
          Disponible
        </label>

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          Crear plato
        </button>
      </form>

      {error && (
        <p className="mb-4 rounded-lg bg-red-100 p-4 text-red-700">
          {error}
        </p>
      )}

      <div className="rounded-xl bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-bold">Lista de platos</h2>

        {cargando ? (
          <p>Cargando platos...</p>
        ) : platos.length === 0 ? (
          <p>No hay platos registrados.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="p-3">Nombre</th>
                  <th className="p-3">Precio</th>
                  <th className="p-3">Disponible</th>
                </tr>
              </thead>

              <tbody>
                {platos.map((plato) => (
                  <tr key={plato.id} className="border-b">
                    <td className="p-3">{plato.nombre}</td>
                    <td className="p-3">S/ {plato.precio}</td>
                    <td className="p-3">
                      {plato.disponible ? "Sí" : "No"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}