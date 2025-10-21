import { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { FaFilter } from "react-icons/fa";
import { InventarioContext } from "./InventarioContext";
import "./App.css";

function InventarioVista() {
  const { productos } = useContext(InventarioContext);
  const [mostrarFiltro, setMostrarFiltro] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("Todas las categorías");
  const filtroRef = useRef(null);

  // Filtrar productos
  const productosFiltrados = productos.filter((p) => {
    const coincideBusqueda = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria =
      categoria === "Todas las categorías" || p.categoria === categoria;
    return coincideBusqueda && coincideCategoria;
  });

  // Detectar clics fuera del menú
  useEffect(() => {
    function manejarClickFuera(event) {
      if (filtroRef.current && !filtroRef.current.contains(event.target)) {
        setMostrarFiltro(false);
      }
    }
    if (mostrarFiltro) {
      document.addEventListener("mousedown", manejarClickFuera);
    } else {
      document.removeEventListener("mousedown", manejarClickFuera);
    }
    return () => document.removeEventListener("mousedown", manejarClickFuera);
  }, [mostrarFiltro]);

  // Obtener categorías únicas
  const categorias = ["Todas las categorías", ...new Set(productos.map(p => p.categoria))];

  return (
    <div className="inventario-container">
      <nav className="navbar">
        <h2 className="punto-venta">SupMis</h2>
        <div className="nav-botones">
          <Link to="/ventasVista" className="btn">Ventas</Link>
        </div>
      </nav>
      <header className="inventario-header">
        <div className="header-overlay">
          <h1 className="titulo">Inventario</h1>
        </div>
      </header>
      <div className="buscador-container" ref={filtroRef}>
        <input
          type="text"
          placeholder="Buscar"
          className="buscador-input"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <div
          className="filtro-icono"
          onClick={() => setMostrarFiltro(!mostrarFiltro)}
        >
          <FaFilter />
        </div>
        {mostrarFiltro && (
          <div className="filtro-dropdown">
            <ul>
              {categorias.map((cat) => (
                <li key={cat} onClick={() => { setCategoria(cat); setMostrarFiltro(false); }}>
                  {cat}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <section className="tabla-section">
        <div className="tabla-responsive-wrapper">
          <table className="tabla-inventario">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Descripción</th>
                <th>Categoría</th>
                <th>Unidad</th>
                <th>Stock</th>
                <th>Stock Mínimo</th>
                <th>Imagen</th>
              </tr>
            </thead>
            <tbody>
              {productosFiltrados.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.nombre}</td>
                  <td>${p.precio}</td>
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
                      style={{ width: "50px" }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default InventarioVista