import { useState, useEffect } from "react";
import { getPlatos, crearPedido } from "../services/api.js";
import { usePedido } from "../context/PedidoContext.jsx";

function CarritoPage() {
  const [platos, setPlatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMenu, setErrorMenu] = useState(null);

  // Estados para enviar la comanda
  const [enviando, setEnviando] = useState(false);
  const [errorPedido, setErrorPedido] = useState(null);
  const [pedidoCreado, setPedidoCreado] = useState(null);

  // Consumir PedidoContext
  const {
    pedido,
    agregarPlato,
    quitarPlato,
    limpiarPedido,
    cambiarTipo,
  } = usePedido();

  // Cargar platos
  useEffect(() => {
    const fetchPlatos = async () => {
      try {
        setLoading(true);
        setErrorMenu(null);

        const data = await getPlatos();

        setPlatos(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error al obtener platos:", err);

        setErrorMenu("No se pudieron cargar los platos");
      } finally {
        setLoading(false);
      }
    };

    fetchPlatos();
  }, []);

  // Enviar pedido al backend
  const handleEnviarComanda = async () => {
    if (pedido.items.length === 0) {
      return;
    } 

    setEnviando(true);
    setErrorPedido(null);

    const body = {
      mesaId: pedido.mesaId,
      tipo: pedido.tipo,
      items: pedido.items,
    };

    console.log("Pedido enviado al backend:", body);

    try {
      const nuevoPedido = await crearPedido(body);

      console.log("Pedido creado:", nuevoPedido);

      setPedidoCreado(nuevoPedido);

      // Solo limpiar si el POST fue exitoso
      limpiarPedido();
    } catch (err) {
      console.error("Error al crear pedido:", err);

      setErrorPedido(
        "No se pudo crear el pedido. Intenta nuevamente."
      );
    } finally {
      setEnviando(false);
    }
  };

  if (loading) {
    return (
      <div style={styles.loading}>
        <p>Cargando menú...</p>
      </div>
    );
  }

  if (errorMenu) {
    return (
      <div style={styles.loading}>
        <p style={{ color: "#d32f2f" }}>
          {errorMenu}
        </p>
      </div>
    );
  }

  // Confirmación después de crear el pedido
  if (pedidoCreado) {
    return (
      <div style={styles.confirmacion}>
        <div style={{ fontSize: "55px" }}>
          ✅
        </div>

        <h2 style={{ color: "#2e7d32" }}>
          Comanda enviada
        </h2>

        <p>
          Pedido #
          {pedidoCreado._id
            ? pedidoCreado._id.slice(-6).toUpperCase()
            : "Creado"}
        </p>

        <p>
          Estado:{" "}
          <strong>{pedidoCreado.estado}</strong>
        </p>

        {pedidoCreado.total !== undefined && (
          <p>
            Total: S/{" "}
            {Number(pedidoCreado.total).toFixed(2)}
          </p>
        )}

        <button
          style={styles.nuevoPedido}
          onClick={() => setPedidoCreado(null)}
        >
          Crear nueva comanda
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        🍽️ Menú del Restaurante
      </h1>

      {/* LISTA DE PLATOS */}
      <div style={styles.menu}>
        {platos.map((plato, index) => {
          const platoId =
            plato._id || plato.id || index;

          return (
            <div
              style={styles.plato}
              key={platoId}
            >
              <div>
                <h3 style={styles.nombre}>
                  {plato.nombre}
                </h3>

                <p style={styles.precio}>
                  S/ {plato.precio}
                </p>
              </div>

              <button
                style={styles.agregar}
                onClick={() =>
                  agregarPlato(plato)
                }
              >
                + Agregar
              </button>
            </div>
          );
        })}
      </div>

      {/* CARRITO */}
      <div style={styles.carrito}>
        <h2 style={styles.carritoTitulo}>
          🛒 Carrito / Comanda Activa
        </h2>

        <p style={styles.infoPedido}>
          Tipo: <strong>{pedido.tipo}</strong>
          {" · "}
          Estado:{" "}
          <strong>{pedido.estado}</strong>
        </p>

        {/* TIPO DE PEDIDO */}
        <div style={styles.tipoPedido}>
          <button
            style={styles.botonTipo}
            onClick={() => cambiarTipo("mesa")}
          >
            🍽️ Mesa
          </button>

          <button
            style={styles.botonTipo}
            onClick={() =>
              cambiarTipo("para_llevar")
            }
          >
            🛍️ Para llevar
          </button>
        </div>

        {pedido.items.length === 0 ? (
          <p style={styles.vacio}>
            El carrito está vacío.
          </p>
        ) : (
          <div>
            {pedido.items.map((item) => (
              <div
                style={styles.itemCarrito}
                key={item.platoId}
              >
                <div>
                  <span style={styles.itemNombre}>
                    {item.nombre} (x{item.cantidad})
                  </span>

                  <span style={styles.itemPrecio}>
                    S/{" "}
                    {(
                      item.precioUnitario *
                      item.cantidad
                    ).toFixed(2)}
                  </span>
                </div>

                <button
                  style={styles.quitar}
                  onClick={() =>
                    quitarPlato(item.platoId)
                  }
                >
                  Quitar
                </button>
              </div>
            ))}

            {/* TOTAL */}
            <div style={styles.resumen}>
              <h3 style={styles.totalTexto}>
                Total: S/{" "}
                {pedido.total.toFixed(2)}
              </h3>

              <button
                style={styles.limpiar}
                onClick={limpiarPedido}
              >
                Limpiar comanda
              </button>
            </div>
          </div>
        )}

        {/* ERROR AL ENVIAR */}
        {errorPedido && (
          <p style={styles.error}>
            {errorPedido}
          </p>
        )}

        {/* ENVIAR COMANDA */}
        <button
          style={{
            ...styles.enviar,
            opacity:
              enviando ||
              pedido.items.length === 0
                ? 0.5
                : 1,
            cursor:
              enviando ||
              pedido.items.length === 0
                ? "not-allowed"
                : "pointer",
          }}
          onClick={handleEnviarComanda}
          disabled={
            enviando ||
            pedido.items.length === 0
          }
        >
          {enviando
            ? "Enviando comanda..."
            : "Enviar comanda a cocina"}
        </button>
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
    marginBottom: "4px",
  },

  infoPedido: {
    color: "#777",
    marginBottom: "12px",
    fontSize: "14px",
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

  resumen: {
    marginTop: "20px",
    paddingTop: "15px",
    borderTop: "2px dashed #eee",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  totalTexto: {
    margin: 0,
    color: "#2e7d32",
    fontSize: "20px",
  },

  limpiar: {
    padding: "9px 15px",
    border: "none",
    borderRadius: "7px",
    backgroundColor: "#e65100",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },

  tipoPedido: {
    display: "flex",
    gap: "10px",
    marginBottom: "15px",
  },

  botonTipo: {
    padding: "9px 15px",
    border: "none",
    borderRadius: "7px",
    backgroundColor: "#2b6cb0",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },

  enviar: {
    width: "100%",
    marginTop: "20px",
    padding: "13px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#e6a700",
    color: "white",
    fontWeight: "bold",
    fontSize: "16px",
  },

  error: {
    color: "#d32f2f",
    fontWeight: "bold",
    marginTop: "15px",
  },

  confirmacion: {
    maxWidth: "500px",
    margin: "40px auto",
    padding: "30px",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "white",
    borderRadius: "15px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  },

  nuevoPedido: {
    padding: "10px 18px",
    marginTop: "15px",
    border: "none",
    borderRadius: "7px",
    backgroundColor: "#2e7d32",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default CarritoPage;