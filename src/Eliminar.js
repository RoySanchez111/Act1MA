// src/Eliminar.js
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { InventarioContext } from "./InventarioContext";
import "./App.css";

function Eliminar() {
  const { productos, deleteProducto } = useContext(InventarioContext);
  const [formData, setFormData] = useState({
    id: "",
    motivo: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    if (!formData.id) {
      alert("Por favor, seleccione un producto.");
      return;
    }
    const productoExistente = productos.find((p) => p.id === parseInt(formData.id));
    if (!productoExistente) {
      alert("El ID seleccionado no corresponde a ningún producto.");
      return;
    }
    deleteProducto(parseInt(formData.id));
    alert(`🗑️ Producto "${productoExistente.nombre}" eliminado exitosamente.`);
    setFormData({ id: "", motivo: "" });
  };

  return (
    <div className="eliminar-container">
      <nav className="navbar">
        <h2 className="punto-venta">SupMis</h2>
        <div className="nav-botones">
          <Link to="/actualizar" className="btn">Actualizar Productos</Link>
          <Link to="/agregar" className="btn">Agregar Productos</Link>
          <Link to="/inventario" className="btn">Inventario</Link>
        </div>
      </nav>
      <h1 className="titulo-eliminar">Eliminar</h1>
      <form className="form-eliminar" onSubmit={handleConfirm}>
        <div className="form-grid-eliminar">
          <div className="form-group-eliminar">
            <label>Producto:</label>
            <select name="id" value={formData.id} onChange={handleChange}>
              <option value="">Seleccione un producto</option>
              {productos.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nombre} (ID: {p.id})
                </option>
              ))}
            </select>
          </div>
          <div className="form-group-eliminar">
            <label>Motivo:</label>
            <input
              type="text"
              name="motivo"
              placeholder="Motivo (opcional)"
              value={formData.motivo}
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="submit" className="btn eliminar-btn">
          Eliminar Producto
        </button>
      </form>
    </div>
  );
}

export default Eliminar;