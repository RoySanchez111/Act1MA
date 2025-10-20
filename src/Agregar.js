import { Link } from "react-router-dom";
import "./App.css";

function Agregar() {

  return (
    <div className="agregar-container">
      <nav className="navbar">
        <h2 className="punto-venta">SupMis</h2>

        <div className="nav-botones">
          <Link to="/actualizar" className="btn">
            Actualizar Productos
          </Link>
          <Link to="/eliminar" className="btn">
            Eliminar Productos
          </Link>
          <Link to="/inventario" className="btn">
            Inventario
          </Link>
        </div>
      </nav>

      <h1 className="titulo-agregar">Agregar</h1>

      <form className="form-agregar">
        <div className="form-grid">
          <div className="form-group">
            <label>ID del Nuevo Producto:</label>
            <input type="text" placeholder="ID" />
          </div>

          <div className="form-group">
            <label>Descripción:</label>
            <input type="text" placeholder="Descripción" />
          </div>

          <div className="form-group">
            <label>Stock Inicial:</label>
            <input type="text" placeholder="Cantidad" />
          </div>

          <div className="form-group">
            <label>Nombre del Producto:</label>
            <input type="text" placeholder="Nombre" />
          </div>

          <div className="form-group">
            <label>Categoría:</label>
            <input type="text" placeholder="Categoría" />
          </div>

          <div className="form-group">
            <label>Stock Mínimo:</label>
            <input type="text" placeholder="Cantidad" />
          </div>

          <div className="form-group">
            <label>Precio del Nuevo Producto:</label>
            <input type="text" placeholder="Precio" />
          </div>

          <div className="form-group">
            <label>Unidad de Medida:</label>
            <input type="text" placeholder="Enteros / Gramos / Mililitros" />
          </div>

          <div className="form-group">
            <label>Imagen del Producto:</label>
            <input type="text" placeholder="Archivo tipo PNG" />
          </div>
        </div>

        <button type="submit" className="btn agregar-btn">
          Agregar Producto
        </button>
      </form>
    </div>
  );
}

export default Agregar;
