// src/App.jsx
import Home from "./pages/Home.jsx";
import MesasPage from "./pages/MesasPage.jsx";

function App() {
  return (
    <div>
      {/* 1. Vista del Menú de Platos */}
      <Home />

      <hr style={{ margin: "40px 0", border: "1px solid #eee" }} />

      {/* 2. Vista de la Gestión de Mesas */}
      <MesasPage />
    </div>
  );
}

export default App;