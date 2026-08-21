// src/App.jsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// Componentes y Páginas
import NavBar from "./components/NavBar.jsx";
import MenuPage from "./pages/MenuPage.jsx";
import MesasPage from "./pages/MesasPage.jsx";
import CarritoPage from "./pages/CarritoPage.jsx";
import DetalleMesa from "./pages/DetalleMesa.jsx";

// Componente para la página 404 (Ruta no encontrada)
function NotFoundPage() {
  return (
    <div style={{ textAlign: "center", padding: "40px 20px" }}>
      <h1 style={{ fontSize: "48px", marginBottom: "10px", color: "#e53e3e" }}>
        404
      </h1>
      <h2 style={{ fontSize: "22px", marginBottom: "15px" }}>
        Página no encontrada
      </h2>
      <p style={{ color: "#718096", marginBottom: "20px" }}>
        La ruta a la que intentas acceder no existe en el sistema.
      </p>
      <Link
        to="/"
        style={{
          display: "inline-block",
          padding: "10px 20px",
          backgroundColor: "#1a202c",
          color: "#ffffff",
          borderRadius: "6px",
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        Volver a la Carta
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <NavBar nombreRestaurante="Sabor & Tradición" />

        <main
          style={{
            maxWidth: "800px",
            margin: "20px auto",
            padding: "0 15px",
          }}
        >
          <Routes>
            <Route path="/" element={<MenuPage />} />
            <Route path="/mesas" element={<MesasPage />} />
            
            {/* Ruta dinámica del Bloque C */}
            <Route path="/mesas/:id" element={<DetalleMesa />} />

            <Route path="/carrito" element={<CarritoPage />} />

            {/* Ruta comodín 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}