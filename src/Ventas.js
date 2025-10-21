// src/Ventas.js
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { InventarioContext } from "./InventarioContext";
import Ticket from "./Ticket";
import "./App.css";

function Ventas() {
  const {
    productos,
    updateProducto,
    reducirStock = () => console.warn("reducirStock not provided"),
    aumentarStock = () => console.warn("aumentarStock not provided"),
  } = useContext(InventarioContext);

  const [venta, setVenta] = useState([]);
  const [total, setTotal] = useState(0);
  const [ticket, setTicket] = useState(null);
  const [mostrarTicket, setMostrarTicket] = useState(false);

  // Obtener el rol del usuario desde localStorage
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const esAdmin = usuario?.rol === "Administrador";

  const buscarProducto = () => {
    const id = parseInt(prompt("Ingresa el ID del producto:"));
    if (Number.isNaN(id)) return;
    const producto = productos.find((p) => p.id === id);
    if (!producto) return alert("Producto no encontrado.");
    const cantidad = parseInt(prompt("Cantidad a agregar:"), 10);
    if (isNaN(cantidad) || cantidad <= 0) return alert("Cantidad inválida");
    if (cantidad > producto.stock) return alert("No hay suficiente stock");

    if (esAdmin) {
      updateProducto(id, { stock: producto.stock - cantidad });
    } else {
      reducirStock(id, cantidad);
    }

    const precio = parseFloat(String(producto.precio).replace("$", "")) || 0;
    const item = {
      id: producto.id,
      nombre: producto.nombre,
      cantidad,
      total: precio * cantidad,
    };
    setVenta((prev) => [...prev, item]);
    setTotal((prev) => prev + item.total);
  };

  const eliminarProducto = () => {
    if (venta.length === 0) return alert("No hay productos para eliminar.");
    const id = parseInt(prompt("Ingresa el ID del producto a eliminar:"));
    if (Number.isNaN(id)) return;
    const item = venta.find((p) => p.id === id);
    if (!item) return alert("Producto no está en la venta.");

    if (esAdmin) {
      const productoActual = productos.find((p) => p.id === id);
      updateProducto(id, { stock: productoActual.stock + item.cantidad });
    } else {
      aumentarStock(id, item.cantidad);
    }

    setVenta((prev) => prev.filter((p) => p.id !== id));
    setTotal((prev) => prev - item.total);
  };

  const cobrar = () => {
    if (venta.length === 0) return alert("No hay productos para cobrar.");
    const pago = parseFloat(prompt(`Total a pagar: $${total.toFixed(2)}\nMonto recibido:`));
    if (isNaN(pago) || pago < total) return alert("Monto insuficiente.");

    const cambio = pago - total;

    const nuevoTicket = {
      id: `T-${Date.now()}`,
      fecha: Date.now(),
      venta: [...venta],
      total,
      pago,
      cambio,
    };

    // Guardar ticket en localStorage
    const tickets = JSON.parse(localStorage.getItem("tickets") || "[]");
    localStorage.setItem("tickets", JSON.stringify([...tickets, nuevoTicket]));

    setTicket(nuevoTicket);
    setMostrarTicket(true);

    setVenta([]);
    setTotal(0);
  };

  return (
    <div className="pv-shell">
      <header className="pv-header">
        <div className="pv-brand">SupMis</div>
        <div className="nav-botones">
          <Link to="/inventario" className="btn ventas-btn">Inventario</Link>
          {esAdmin && (
            <Link to="/historial" className="btn ventas-btn">Historial de Tickets</Link>
          )}
        </div>
      </header>

      <main className="pv-main">
        <section className="pv-table">
          <div className="pv-head">
            <span>ID</span>
            <span>Artículos</span>
            <span>Cantidad</span>
            <span>Total</span>
          </div>

          <div className="pv-rows">
            {venta.length === 0 ? (
              <p style={{ padding: "1rem" }}>No hay productos agregados</p>
            ) : (
              venta.map((p, index) => (
                <div key={`${p.id}-${index}`} className="pv-row">
                  <span>{p.id}</span>
                  <span>{p.nombre}</span>
                  <span>{p.cantidad}</span>
                  <span>${p.total.toFixed(2)}</span>
                </div>
              ))
            )}
          </div>
        </section>

        <aside className="pv-side">
          <button className="pv-card" onClick={cobrar}>Cobrar</button>
          <button className="pv-card purple" onClick={buscarProducto}>Buscar producto</button>
          <button className="pv-card red" onClick={eliminarProducto}>Eliminar</button>
          {ticket && (
            <button className="pv-card blue" onClick={() => setMostrarTicket(true)}>
              Ver ticket
            </button>
          )}
        </aside>
      </main>

      <footer className="pv-bottom">
        <div><strong>Cambio (M.N):</strong> —</div>
        <div style={{ textAlign: "center" }}>
          <strong>Por pagar (M.N): ${total.toFixed(2)}</strong>
        </div>
        <Link to="/" className="pv-exit">Salir</Link>
      </footer>

      {mostrarTicket && (
        <div className="ticket-modal">
          <Ticket ticket={ticket} onClose={() => setMostrarTicket(false)} />
        </div>
      )}
    </div>
  );
}

export default Ventas;