import { Link } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Inventario from "./Inventario";
import Agregar from "./Agregar";
import Actualizar from "./Actualizar";
import Eliminar from "./Eliminar";
import Ventas from "./Ventas";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/inventario" element={<Inventario />} />
        <Route path="/agregar" element={<Agregar />} />
        <Route path="/actualizar" element={<Actualizar />} />
        <Route path="/eliminar" element={<Eliminar />} />
        <Route path="/ventas" element={<Ventas />} />
      </Routes>
    </Router>
  );
}

export default App;


function Inicio() {
  return (
    <div className="Inicio-container">
      <h1 className="titulo-Inicio">SupMis</h1>

      <h2 className="punto-venta-inicio">Punto de Venta</h2>

      <form className="form-Inicio">
        <div className="form-grid-Inicio">
          <div className="form-group-Inicio">
            <label>Usuario:</label>
            <input type="text" placeholder="Vendedor / Administrador" />
          </div>

          <div className="form-group-Inicio">
            <label>Contraseña:</label>
            <input type="password" placeholder="Contraseña" />
          </div>
        </div>

        <Link to="/ventas" className="btn iniciar-btn">
          Iniciar Sesión
        </Link>
      </form>
    </div>
  );
}
