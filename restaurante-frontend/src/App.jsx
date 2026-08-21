// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import MenuPage from './pages/MenuPage';
import MesasPage from './pages/MesasPage';
import DetalleMesa from './pages/DetalleMesa';
import CarritoPage from './pages/CarritoPage';
import NotFound from './pages/NotFound'; // 👈 Importación correcta desde pages

export default function App() {
  return (
    <BrowserRouter>
      <NavBar nombreRestaurante='Restaurante El Sabor' />
      <Routes>
        <Route path='/' element={<MenuPage />} />
        <Route path='/mesas' element={<MesasPage />} />
        <Route path='/mesas/:id' element={<DetalleMesa />} />
        <Route path='/carrito' element={<CarritoPage />} />
        
        {/* Ruta catch-all al final */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}