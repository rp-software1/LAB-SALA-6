import { BrowserRouter, Routes, Route } from "react-router-dom";

// Componentes y Páginas
import NavBar from "./components/NavBar.jsx";
import MenuPage from "./pages/MenuPage.jsx";
import MesasPage from "./pages/MesasPage.jsx";
import CarritoPage from "./pages/CarritoPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        {/* Tu NavBar global visible en todas las rutas */}
        <NavBar nombreRestaurante="Sabor & Tradición" />

        {/* Tu contenedor principal con tus estilos en línea exactos */}
        <main
          style={{
            maxWidth: "800px",
            margin: "20px auto",
            padding: "0 15px",
          }}
        >
          <Routes>
            {/* Cada ruta muestra una sola página en lugar de todo amontonado */}
            <Route path="/" element={<MenuPage />} />
            <Route path="/mesas" element={<MesasPage />} />
            <Route path="/carrito" element={<CarritoPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}