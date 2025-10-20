import { Link } from "react-router-dom";

export default function Inventario() {
  return (
    <div className="pv-shell">
      {/* ENCABEZADO */}
      <header className="pv-header">
        <div className="pv-brand">SupMis</div>
        <Link to="/inventario" className="btn ventas-btn">
          Inventario
        </Link>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="pv-main">
        {/* Tabla */}
        <section className="pv-table">
          <div className="pv-head">
            <span>ID</span>
            <span>Artículos</span>
            <span>Cantidad</span>
            <span>Total</span>
          </div>
          <div className="pv-rows">
            {/* Aquí luego aparecerán los productos */}
          </div>
        </section>

        {/* Panel lateral con botones */}
        <aside className="pv-side">
          <button className="pv-card">Cobrar</button>
          <button className="pv-card purple">Buscar producto</button>
          <button className="pv-card red">Eliminar</button>
        </aside>
      </main>

      {/* BARRA INFERIOR */}
      <footer className="pv-bottom">
        <div>
          <strong>Cambio (M.N):</strong> —
        </div>
        <div style={{ textAlign: "center" }}>
          <strong>Por pagar (M.N): $0.00</strong>
        </div>
        <Link to="/" className="pv-exit">
          Salir
        </Link>
      </footer>
    </div>
  );
}

