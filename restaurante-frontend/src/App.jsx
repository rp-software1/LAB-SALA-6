// src/App.jsx
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

        {/* Contenedor principal con estilos de maquetación */}
        <main
          style={{
            maxWidth: "800px",
            margin: "20px auto",
            padding: "0 15px",
          }}
        >
          <Routes>
            {/* Definición de rutas principales del sistema */}
            <Route path="/" element={<MenuPage />} />
            <Route path="/mesas" element={<MesasPage />} />
            <Route path="/carrito" element={<CarritoPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}