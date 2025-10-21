// src/Actualizar.js
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { InventarioContext } from "./InventarioContext";
import "./App.css";

function Actualizar() {
  const { productos, updateProducto } = useContext(InventarioContext);
  const [selectedId, setSelectedId] = useState("");
  const [formData, setFormData] = useState({
    stock: "",
    stockMinimo: "",
    precio: "",
    imagen: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (e) => {
    setSelectedId(e.target.value);
    const producto = productos.find(p => p.id === parseInt(e.target.value));
    if (producto) {
      setFormData({
        stock: producto.stock || "",
        stockMinimo: producto.stockMinimo || "",
        precio: producto.precio || "",
        imagen: producto.imagen || ""
      });
    } else {
      setFormData({ stock: "", stockMinimo: "", precio: "", imagen: "" });
    }
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    if (!selectedId) {
      alert("Por favor, seleccione un producto.");
      return;
    }
    const updatedFields = {};
    if (formData.stock) updatedFields.stock = parseInt(formData.stock);
    if (formData.stockMinimo) updatedFields.stockMinimo = parseInt(formData.stockMinimo);
    if (formData.precio) updatedFields.precio = parseFloat(formData.precio);
    if (formData.imagen) updatedFields.imagen = formData.imagen;
    
    if (Object.keys(updatedFields).length === 0) {
      alert("Por favor, complete al menos un campo para actualizar.");
      return;
    }
    
    updateProducto(parseInt(selectedId), updatedFields);
    alert("✅ Producto actualizado exitosamente.");
    setFormData({ stock: "", stockMinimo: "", precio: "", imagen: "" });
    setSelectedId("");
  };

  return (
    <div className="actualizar-container">
      <nav className="navbar">
        <h2 className="punto-venta">SupMis</h2>
        <div className="nav-botones">
          <Link to="/agregar" className="btn">Agregar Productos</Link>
          <Link to="/eliminar" className="btn">Eliminar Productos</Link>
          <Link to="/inventario" className="btn">Inventario</Link>
        </div>
      </nav>
      <h1 className="titulo-actualizar">Actualizar</h1>
      <p className="subtitulo-actualizar">
        Si no desea actualizar alguno de los campos, déjelo vacío.
      </p>
      <form className="form-actualizar" onSubmit={handleConfirm}>
        <div className="form-grid-actualizar">
          <div className="form-group">
            <label>Producto:</label>
            <select name="id" value={selectedId} onChange={handleSelectChange}>
              <option value="">Seleccione un producto</option>
              {productos.map(p => (
                <option key={p.id} value={p.id}>
                  {p.nombre} (ID: {p.id})
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Stock Actual:</label>
            <input
              type="number"
              name="stock"
              placeholder="Cantidad"
              value={formData.stock}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Stock Mínimo:</label>
            <input
              type="number"
              name="stockMinimo"
              placeholder="Cantidad"
              value={formData.stockMinimo}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Precio del Producto:</label>
            <input
              type="number"
              name="precio"
              placeholder="Precio"
              value={formData.precio}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Imagen del Producto:</label>
            <input
              type="text"
              name="imagen"
              placeholder="URL de la imagen (ej. /Images/nombre.png)"
              value={formData.imagen}
              onChange={handleChange}
            />
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