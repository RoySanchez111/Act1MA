// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { InventarioProvider } from "./InventarioContext";
import "./App.css";
import Inventario from "./Inventario";
import Ventas from "./Ventas";
import Agregar from "./Agregar";
import Actualizar from "./Actualizar";
import Eliminar from "./Eliminar";
import Inicio from "./Inicio";
import Historial from "./Historial";

function App() {
  return (
    <InventarioProvider>
      <Router basename="/Act1MA">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/inventario" element={<Inventario />} />
          <Route path="/agregar" element={<Agregar />} />
          <Route path="/actualizar" element={<Actualizar />} />
          <Route path="/eliminar" element={<Eliminar />} />
          <Route path="/ventas" element={<Ventas />} />
          <Route path="/historial" element={<Historial />} />
        </Routes>
      </Router>
    </InventarioProvider>
  );
}

export default App;