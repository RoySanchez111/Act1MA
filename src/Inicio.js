// src/Inicio.js
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import usuariosData from "./usuarios.json"; // Importa el JSON de usuarios
import "./App.css";

function Inicio() {
  const [formData, setFormData] = useState({ usuario: "", contraseña: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.usuario || !formData.contraseña) {
      alert("Por favor, complete ambos campos.");
      return;
    }

    // Buscar usuario en usuarios.json
    const usuario = usuariosData.find(
      (u) => u.usuario === formData.usuario && u.contraseña === formData.contraseña
    );

    if (!usuario) {
      alert("Usuario o contraseña incorrectos.");
      return;
    }

    // Guardar usuario en localStorage
    localStorage.setItem("usuario", JSON.stringify(usuario));

    // Redirigir según el rol
    if (usuario.rol === "Vendedor") {
      navigate("src/InventarioVista.js");
    } else if (usuario.rol === "Administrador") {
      navigate("/inventario");
    }
  };

  return (
    <div className="Inicio-container">
      <h1 className="titulo-Inicio">SupMis</h1>
      <h2 className="punto-venta-inicio">Punto de Venta</h2>
      <form className="form-Inicio" onSubmit={handleSubmit}>
        <div className="form-grid-Inicio">
          <div className="form-group-Inicio">
            <label>Usuario:</label>
            <input
              type="text"
              name="usuario"
              placeholder="Vendedor / Administrador"
              value={formData.usuario}
              onChange={handleChange}
            />
          </div>
          <div className="form-group-Inicio">
            <label>Contraseña:</label>
            <input
              type="password"
              name="contraseña"
              placeholder="Contraseña"
              value={formData.contraseña}
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="submit" className="btn iniciar-btn">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}

export default Inicio;