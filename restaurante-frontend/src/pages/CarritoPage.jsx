import { useState, useEffect } from "react";
import { platosMock } from "../data/platos.mock";

function CarritoPage() {
  const [platos, setPlatos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setPlatos(platosMock);
      setLoading(false);
    }, 800);
  }, []);

  const agregarAlCarrito = (plato) => {
    setCarrito((prevCarrito) => [...prevCarrito, plato]);
  };

  const quitarPlato = (id) => {
    setCarrito((prevCarrito) => {
      const index = prevCarrito.findIndex(
        (item) => item._id === id
      );

      if (index === -1) {
        return prevCarrito;
      }

      return prevCarrito.filter((_, i) => i !== index);
    });
  };

  if (loading) {
    return (
      <div style={styles.loading}>
        <p>Cargando menú...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🍽️ Menú del Restaurante</h1>

      <div style={styles.menu}>
        {platos.map((plato) => (
          <div style={styles.plato} key={plato._id}>
            <div>
              <h3 style={styles.nombre}>{plato.nombre}</h3>
              <p style={styles.precio}>S/ {plato.precio}</p>
            </div>

            <button
              style={styles.agregar}
              onClick={() => agregarAlCarrito(plato)}
            >
              + Agregar
            </button>
          </div>
        ))}
      </div>

      <div style={styles.carrito}>
        <h2 style={styles.carritoTitulo}>🛒 Carrito</h2>

        {carrito.length === 0 ? (
          <p style={styles.vacio}>El carrito está vacío.</p>
        ) : (
          <div>
            {carrito.map((item, index) => (
              <div
                style={styles.itemCarrito}
                key={`${item._id}-${index}`}
              >
                <div>
                  <span style={styles.itemNombre}>
                    {item.nombre}
                  </span>

                  <span style={styles.itemPrecio}>
                    S/ {item.precio}
                  </span>
                </div>

                <button
                  style={styles.quitar}
                  onClick={() => quitarPlato(item._id)}
                >
                  Quitar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "750px",
    margin: "40px auto",
    padding: "25px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f8f8f8",
    borderRadius: "15px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  },

  title: {
    textAlign: "center",
    color: "#333",
    marginBottom: "30px",
  },

  menu: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  plato: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 18px",
    backgroundColor: "white",
    borderRadius: "10px",
    border: "1px solid #ddd",
  },

  nombre: {
    margin: "0 0 5px 0",
    color: "#333",
  },

  precio: {
    margin: 0,
    color: "#777",
    fontWeight: "bold",
  },

  agregar: {
    padding: "9px 15px",
    border: "none",
    borderRadius: "7px",
    backgroundColor: "#2e7d32",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },

  carrito: {
    marginTop: "30px",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "12px",
    border: "1px solid #ddd",
  },

  carritoTitulo: {
    marginTop: 0,
    color: "#333",
  },

  itemCarrito: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px",
    marginBottom: "8px",
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
  },

  itemNombre: {
    fontWeight: "bold",
    color: "#333",
    marginRight: "15px",
  },

  itemPrecio: {
    color: "#2e7d32",
    fontWeight: "bold",
  },

  quitar: {
    padding: "7px 12px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#d32f2f",
    color: "white",
    cursor: "pointer",
  },

  vacio: {
    color: "#777",
    fontStyle: "italic",
  },

  loading: {
    textAlign: "center",
    marginTop: "50px",
    fontSize: "20px",
    color: "#555",
  },
};

export default CarritoPage;