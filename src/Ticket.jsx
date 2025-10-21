// src/Ticket.jsx
import React from "react";
import "./App.css"; // Opcional, si necesitas estilos

export default function Ticket({ ticket, onClose }) {
  return (
    <div className="ticket-container">
      <div className="ticket">
        <h2>Ticket de Venta</h2>
        <p>ID: {ticket.id}</p>
        <p>Fecha: {new Date(ticket.fecha).toLocaleString()}</p>
        <hr />
        {ticket.venta.map((item, index) => (
          <div key={index}>
            <strong>{item.nombre}</strong> — Cantidad: {item.cantidad} — Total: ${item.total.toFixed(2)}
          </div>
        ))}
        <hr />
        <p><strong>Total:</strong> ${ticket.total.toFixed(2)}</p>
        <p><strong>Pago:</strong> ${ticket.pago.toFixed(2)}</p>
        <p><strong>Cambio:</strong> ${ticket.cambio.toFixed(2)}</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}
