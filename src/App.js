import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Agregar from "./Agregar";
import Actualizar from "./Actualizar";
import Eliminar from "./Eliminar";

function Inventario() {
  const productos = [
    {
      id: 1,
      nombre: "Jamón de Pavo Virginia",
      precio: "$45",
      descripcion: "Jamón muy rico de pavo",
      categoria: "Alimento Procesado",
      unidad: "290 Gramos",
      stock: 50,
      stockMinimo: 5,
      imagen: "/Images/jamonFud290g.webp",
    },
    {
      id: 2,
      nombre: "Coca Cola",
      precio: "$25",
      descripcion: "Refresco muy rico",
      categoria: "Refrescos",
      unidad: "600 ml",
      stock: 50,
      stockMinimo: 5,
      imagen: "/Images/cocacola600ml.webp",
    },
  ];

  return (
    <div className="inventario-container">
      <nav className="navbar">
        <h2 className="punto-venta">SupMis</h2>
        <div className="nav-botones">
          <Link to="/actualizar" className="btn">Actualizar Productos</Link>
          <Link to="/agregar" className="btn">Agregar Productos</Link>
          <Link to="/eliminar" className="btn">Eliminar Productos</Link>
        </div>
      </nav>

      <header className="inventario-header" style={{ backgroundImage: `url('/Images/Inventario.jpg')` }}>
        <div className="header-overlay">
          <h1 className="titulo">Inventario</h1>
        </div>
      </header>

      <div className="buscador-container">
        <input type="text" placeholder="Buscar" />
      </div>

      <section className="tabla-section">
        <table className="tabla-inventario">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Descripción</th>
              <th>Categoría</th>
              <th>Unidad de Medida</th>
              <th>Stock</th>
              <th>Stock Mínimo</th>
              <th>Imagen del Producto</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nombre}</td>
                <td>{p.precio}</td>
                <td>{p.descripcion}</td>
                <td>{p.categoria}</td>
                <td>{p.unidad}</td>
                <td>{p.stock}</td>
                <td>{p.stockMinimo}</td>
                <td>
                  <img
                    src={p.imagen}
                    alt={p.nombre}
                    className="imagen-producto"
                    onError={(e) => {
                      e.target.src = "/Images/placeholder.jpg"; // Imagen de respaldo
                      console.error(`Error al cargar la imagen: ${p.imagen}`);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inventario />} />
        <Route path="/agregar" element={<Agregar />} />
        <Route path="/actualizar" element={<Actualizar />} />
        <Route path="/eliminar" element={<Eliminar />} />
      </Routes>
    </Router>
  );
}

export default App;