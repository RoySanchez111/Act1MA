import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Ticket from "./Ticket";
import "./App.css";

function Historial() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  // Obtener el rol del usuario desde localStorage
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const esAdmin = usuario?.rol === "Administrador";

  // Redirigir a vendedores a /ventas
  useEffect(() => {
    if (!esAdmin) {
      navigate("/ventas");
    }
  }, [esAdmin, navigate]);

  // Cargar tickets desde localStorage
  useEffect(() => {
    const storedTickets = JSON.parse(localStorage.getItem("tickets") || "[]");
    setTickets(storedTickets);
  }, []);

  // Mostrar detalles de un ticket
  const handleVerTicket = (ticket) => {
    setSelectedTicket(ticket);
  };

  if (!esAdmin) return null;

  return (
    <div className="pv-shell">
      {/* HEADER */}
      <header className="pv-header">
        <div className="pv-brand">SupMis</div>
        <div className="nav-botones">
          <Link to="/inventario" className="btn ventas-btn">Inventario</Link>
          <Link to="/ventas" className="btn ventas-btn">Ventas</Link>
          <Link to="/agregar" className="btn ventas-btn">Agregar Productos</Link>
          <Link to="/actualizar" className="btn ventas-btn">Actualizar Productos</Link>
          <Link to="/eliminar" className="btn ventas-btn">Eliminar Productos</Link>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="pv-main">
        <section className="pv-table pv-table-uniform">
          <h2 className="titulo">Historial de Tickets</h2>

          <div className="pv-table-wrapper">
            <table className="tabla-inventario">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Fecha</th>
                  <th>Total</th>
                  <th>Pago</th>
                  <th>Cambio</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {tickets.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center", padding: "1rem" }}>
                      No hay tickets en el historial
                    </td>
                  </tr>
                ) : (
                  tickets.map((ticket) => (
                    <tr key={ticket.id}>
                      <td>{ticket.id}</td>
                      <td>{new Date(ticket.fecha).toLocaleString()}</td>
                      <td>${ticket.total.toFixed(2)}</td>
                      <td>${ticket.pago.toFixed(2)}</td>
                      <td>${ticket.cambio.toFixed(2)}</td>
                      <td>
                        <button
                          className="pv-card blue"
                          onClick={() => handleVerTicket(ticket)}
                        >
                          Ver Detalles
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="pv-bottom" style={{ justifyContent: "center" }}>
        <strong>Total de tickets: {tickets.length}</strong>
      </footer>

      {/* MODAL DEL TICKET */}
      {selectedTicket && (
        <div className="ticket-modal">
          <Ticket ticket={selectedTicket} onClose={() => setSelectedTicket(null)} />
        </div>
      )}
    </div>
  );
}

export default Historial;