// src/components/PopupCarrito.jsx
import React from "react";
import { Link } from "react-router-dom";

function PopupCarrito({ producto, onClose }) {
  return (
    <div id="popup-carrito" className="popup-oculto" style={{ display: "flex" }}>
      <div className="popup-contenido">
        <img
          id="popup-imagen"
          src={`/img/${producto.imagen.replace("img/", "")}`}
          alt={producto.nombre}
        />
        <h4 id="popup-nombre">{producto.nombre}</h4>
        <p id="popup-precio">${Number(producto.precio).toLocaleString("es-CL")} CLP</p>
        <p>¿Qué deseas hacer?</p>
        <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
          <button className="btn btn-outline-primary" onClick={onClose}>Seguir comprando</button>
          <Link to="/carrito" className="btn btn-success" onClick={onClose}>Ir al carrito</Link>
        </div>
      </div>
    </div>
  );
}

export default PopupCarrito;