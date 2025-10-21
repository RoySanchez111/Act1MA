// src/Agregar.js
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { InventarioContext } from "./InventarioContext";
import "./App.css";

function Agregar() {
  const { addProducto } = useContext(InventarioContext);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    stock: "",
    stockMinimo: "",
    precio: "",
    categoria: "",
    unidad: "",
    imagen: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.precio || !formData.stock) {
      alert("Por favor, complete los campos obligatorios: Nombre, Precio, Stock.");
      return;
    }
    const nuevoProducto = {
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      stock: parseInt(formData.stock) || 0,
      stockMinimo: parseInt(formData.stockMinimo) || 0,
      precio: parseFloat(formData.precio) || 0,
      categoria: formData.categoria,
      unidad: formData.unidad,
      imagen: formData.imagen || "public/Images/Default.png" // Imagen por defecto si está vacío
    };
    addProducto(nuevoProducto);
    alert("➕ Producto agregado exitosamente al inventario.");
    setFormData({
      nombre: "",
      descripcion: "",
      stock: "",
      stockMinimo: "",
      precio: "",
      categoria: "",
      unidad: "",
      imagen: ""
    });
  };

  return (
    <div className="agregar-container">
      <nav className="navbar">
        <h2 className="punto-venta">SupMis</h2>
        <div className="nav-botones">
          <Link to="/actualizar" className="btn">Actualizar Productos</Link>
          <Link to="/eliminar" className="btn">Eliminar Productos</Link>
          <Link to="/inventario" className="btn">Inventario</Link>
        </div>
      </nav>
      <h1 className="titulo-agregar">Agregar</h1>
      <form className="form-agregar" onSubmit={handleConfirm}>
        <div className="form-grid">
          <div className="form-group">
            <label>Nombre del Producto:</label>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Descripción:</label>
            <input
              type="text"
              name="descripcion"
              placeholder="Descripción"
              value={formData.descripcion}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Stock Inicial:</label>
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
            <label>Precio del Nuevo Producto:</label>
            <input
              type="number"
              name="precio"
              placeholder="Precio"
              value={formData.precio}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Categoría:</label>
            <input
              type="text"
              name="categoria"
              placeholder="Categoría"
              value={formData.categoria}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Unidad de Medida:</label>
            <select
              name="unidad"
              value={formData.unidad}
              onChange={handleChange}
            >
              <option value="">Seleccione una unidad</option>
              <option value="Enteros">Enteros</option>
              <option value="Gramos">Gramos</option>
              <option value="Mililitros">Mililitros</option>
            </select>
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
        <button type="submit" className="btn agregar-btn">
          Agregar Producto
        </button>
      </form>
    </div>
  );
}

export default Agregar;