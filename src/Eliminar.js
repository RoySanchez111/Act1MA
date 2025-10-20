import { Link } from "react-router-dom";
import "./App.css";

function Eliminar() {

  const handleConfirm = () => {
    alert("🗑️ Producto eliminado exitosamente."); 
  };

  return (
    <div className="eliminar-container">
      <nav className="navbar">
        <h2 className="punto-venta">SupMis</h2>

        <div className="nav-botones">
          <Link to="/actualizar" className="btn">
            Actualizar Productos
          </Link>
          <Link to="/agregar" className="btn">
            Agregar Productos
          </Link>
          <Link to="/inventario" className="btn">
            Inventario
          </Link>
        </div>
      </nav>

      <h1 className="titulo-eliminar">Eliminar</h1>

      <form className="form-eliminar">
        <div className="form-grid-eliminar">
          <div className="form-group-eliminar">
            <label>ID del Producto:</label>
            <input type="text" placeholder="ID" />
          </div>

          <div className="form-group-eliminar">
            <label>Motivo:</label>
            <input type="text" placeholder="Motivo" />
          </div>
        </div>

        <button type="submit" className="btn eliminar-btn" onClick={handleConfirm}>
          Eliminar Producto
        </button>
      </form>
    </div>
  );
}

export default Eliminar;
