import { Link } from "react-router-dom";
import "./App.css";

function Actualizar() {

  return (
    <div className="actualizar-container">
      <nav className="navbar">
        <h2 className="punto-venta">SupMis</h2>

        <div className="nav-botones">
          <Link to="/agregar" className="btn">
            Agregar Productos
          </Link>
          <Link to="/eliminar" className="btn">
            Eliminar Productos
          </Link>
          <Link to="/inventario" className="btn">
            Inventario
          </Link>
        </div>
      </nav>

      <h1 className="titulo-actualizar">Actualizar</h1>
      <p className="subtitulo-actualizar">
        Si no desea actualizar alguno de los campos, déjelo vacío.
      </p>

      <form className="form-actualizar">
        <div className="form-grid-actualizar">
          <div className="form-group">
            <label>Stock Actual:</label>
            <input type="text" placeholder="Cantidad" />
          </div>

          <div className="form-group">
            <label>Stock Minimo:</label>
            <input type="text" placeholder="Cantidad" />
          </div>

          <div className="form-group">
            <label>Precio del Producto:</label>
            <input type="text" placeholder="Precio" />
          </div>

          <div className="form-group">
            <label>Imagen del Producto:</label>
            <input type="text" placeholder="Archivo tipo PNG" />
          </div>
        </div>

        <button type="submit" className="btn actualizar-btn">
          Actualizar Producto
        </button>
      </form>
    </div>
  );
}

export default Actualizar;
